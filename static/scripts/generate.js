var device_list = [];
$(document).ready(function () {
    //Configure Devices
    configureDevices();
    $(document).on('click', '.my-navbar li', function (e) {
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('#airplay-button').click(function () {
        switchAirplay();
    });
    $(window).resize(function () {
        location.href = window.location.hash;
    });
});

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
//ADDS A DEVICE WITH A CURRENT STATE
function addDevice(name, id, state) {
    device_list.push({
        name, id, state
    });
    console.log(device_list);
}

function configureDevices() {
    readJSON();
}

function insertDevices() {
    //Insert the right ID's
    for (var i = 0; i < device_list.length; i++) {
        var to_insert = '<tr id="row_' + i + '"><td class="align-middle-table"><span id="item_' + i + '"></span></td><td class="align-middle-table"><div class="btn-group on-off-button-group" id="buttongroup_' + i + '" role="onoffswitch"><button type="button" class="btn btn-primary btn-with-icon btn-toggle" id="button_on_' + i + '"><i class="material-icons md-32 material-icons-animation" id="icon_button_' + i + '"></i></button></div></td></tr><!--for-schleife ende-->'
        $('#insert_here').append(to_insert);
        $('#item_' + i).text(device_list[i].name);
        $('#button_on_' + i).on("click", {
            current_id: i
        }, switchOnOff);
        //Setting first button icon
        initButtonIcon(i, device_list[i].state);
    }
}

function readJSON() {
    //start ajax request
    $.ajax({
        url: "../static/configuration/conf.json"
        , //force to handle it as text
        dataType: "text"
        , success: function (data) {
            //data downloaded so we call parseJSON function 
            //and pass downloaded data
            var json = $.parseJSON(data);
            //now json variable contains data in json format
            //let's display a few items
            for (var i = 0; i < json.name.length; i++) {
                console.log(json.name[i]);
                addDevice(json.name[i], json.id[i], json.state[i]);
            }
            insertDevices();
        }
    });
}

function turnOff(event) {
    var id = event.data.current_id;
    executePythonFunction("turnOff", event);
    setButtonIcon(id, false);
}

function turnOn(event) {
    var id = event.data.current_id;
    executePythonFunction("turnOn", event);
    setButtonIcon(id, true);
}

function setButtonIcon(id, on) {
    animateButtonChange(id, on);
    //$("#icon_button_"+id).text(text);
}

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

function switchState(id) {
    device_list[id].state = !device_list[id].state
}

function switchOnOff(event) {
    var id = event.data.current_id;
    device_list[id].state ? turnOff(event) : turnOn(event);
    switchState(id);
}

function executePythonFunction(functionName, args) {
    $.ajax({
        url: "../static/scripts/python/test_script.py"
        , success: function (response) {
            console.log(response);
        }
    });
    console.log("EXECUTED PYTHON SCRIPT " + functionName + " WITH ARGS " + args);
}