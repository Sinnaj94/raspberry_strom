var device_list = [];

//On Document Load
$(document).ready(function () {
    //Configure Devices
    configureDevices();
    $(document).on('click', '.my-navbar li', function (e) {
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('#airplay-button').click(function () {
        switchAirplay();
    });
    //Scroll to window hash
    if(window.location.hash != '' && window.location.hash != undefined){
        jQuery('a[href$='+ '"' + window.location.hash + '"' + ']').trigger('click');
        jQuery(window.location.hash).get(0).scrollIntoView();
    }
    $(window).resize(function () {
        var _hash = window.location.hash;
        if(_hash != '' && _hash != undefined){
            jQuery(_hash).get(0).scrollIntoView();
        } 
    });
});



//Switches the Airplay Button
function switchAirplay() {
    if ($('#airplay-button').hasClass("music-btn-active")) {
        $('#airplay-button').removeClass("music-btn-active");
        $('#airplay-enabled-tag').text('(disabled)');
    }
    else {
        $('#airplay-button').addClass("music-btn-active");
        $('#airplay-enabled-tag').text('(enabled)');
    }
}

//Adds Device with a state, name and id
function addDevice(name, myid, state) {
    device_list.push({
        name, myid, state
    });
}

//Configures The DEVICES
function configureDevices() {
    readJSON();
}

//Inserts the Devices into the HTML
function insertDevices() {
    for (var i = 0; i < device_list.length; i++) {
        var to_insert = '<tr id="row_' + i + '"><td class="align-middle-table"><span id="item_' + i + '"></span></td><td class="align-middle-table"><div class="btn-group on-off-button-group" id="buttongroup_' + i + '" role="onoffswitch"><button type="button" class="btn btn-primary btn-with-icon btn-toggle" id="button_on_' + i + '"><i class="material-icons md-32 material-icons-animation" id="icon_button_' + i + '"></i></button></div></td></tr><!--for-schleife ende-->'
        $('#insert_here').append(to_insert);
        $('#item_' + i).text(device_list[i].name);
        $('#button_on_' + i).on("click", {
            current_id: i
        }, switchOnOff);
        initButtonIcon(i, device_list[i].state);
    }
}

//Reads out the JSON & Adds the devices
function readJSON() {
    //Using an AJAX Request
    $.ajax({
        url: "../static/configuration/conf.json"
        ,
        dataType: "text"
        , success: function (data) {
            var json = $.parseJSON(data);
            for (var i = 0; i < json.name.length; i++) {
                addDevice(json.name[i], json.myid[i], json.state[i]);
            }
            insertDevices();
        }
    });
}


//Sets the ButtonIcon
function setButtonIcon(id, on) {
    animateButtonChange(id, on);
}

//Initializes the Icon
function initButtonIcon(id, on) {
    var text;
    on ? text = "wb_sunny" : text = "brightness_3";
    var id_name = "#icon_button_" + id;
    $(id_name).text(text);
    var id_td = "#row_" + id;
    var color;
    on ? color = 'white' : color = 'lightgray';
    $(id_td).css('background-color', color);
}

//Animates the Button Change (Sun goes down, moon up or other way around)
function animateButtonChange(id, on) {
    var distance = '15px';
    var id_name = "#icon_button_" + id;
    var row_name = '#row_' + id;
    $(id_name).animate({
        top: distance
        , opacity: 0
    , }, 150, function () {
        initButtonIcon(id, on);
        $(id_name).css('top', '-' + distance);
    })
    $(id_name).animate({
        top: '0px'
        , opacity: 1
    , }, 150)
}


//Decides & Switches the current state
function switchOnOff(event) {
    var id = event.data.current_id;
    device_list[id].state ? switchOff(event) : switchOn(event);
    device_list[id].state = !device_list[id].state
}

//Function for switching off
function switchOff(event) {
    var id = event.data.current_id;
    var myid = device_list[id].myid;
    executePythonFunction(0, myid);
    setButtonIcon(id, false);
}

//Function for switching on
function switchOn(event) {
    var id = event.data.current_id;
    var myid = device_list[id].myid;
    executePythonFunction(1, myid);
    setButtonIcon(id, true);
}

//Executes the Python function using an ajax handler
function executePythonFunction(state, lampID) {
    var test = {};
    test['state'] = state;
    test['id'] = lampID;
    jsonify = JSON.stringify(test);
    $.ajax({
        url: '/foo',
        data: JSON.stringify(test),
        contentType: 'application/json;charset=UTF-8',
        type: 'POST',
        success: function(response){
            console.log(response);
        },
        error: function(error) {
            console.log(error);
        }
    });
}