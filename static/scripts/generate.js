var device_list = [];

//On Document Load
$(document).ready(function () {
    //Helper functions
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

//Sets the ButtonIcon
function setButtonIcon(id, on) {
    animateButtonChange(id, on);
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
    var self = this;
    console.log($(this));
    /*
    var id = event.data.current_id;
    device_list[id].state ? switchOff(event) : switchOn(event);
    device_list[id].state = !device_list[id].state*/
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

function changeColor(){
    var r = getColor('#range_red');
    var g = getColor('#range_green');
    var b = getColor('#range_blue');
    var newcolor = "rgb(" + r + "," + g + "," + b + ")";
    $('#color_preview').css('background-color', newcolor);
}

function getColor(id){ 

    return $(id).val();
}