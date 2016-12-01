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
    //TODO: In css auslagern
    if ($('#airplay-button').hasClass("music-btn-active")) {
        $('#airplay-button').removeClass("music-btn-active");
        $('#airplay-enabled-tag').text('(disabled)');
    }
    else {
        $('#airplay-button').addClass("music-btn-active");
        $('#airplay-enabled-tag').text('(enabled)');
    }
}
//Decides & Switches the current state
function switchOnOff(e) {
    var currentState = e.getAttribute('plugactive');
    var myid = e.id;
    executePythonFunction(myid);
}

//Executes the Python function using an ajax handler
function executePythonFunction(myid) {
    var  myjson = {};
    myjson['myid'] = myid;
    var currentElement = document.getElementById(myid);
    $(currentElement).find('i').animate({
        opacity: 0,
        top:'9px'
    },100,function(){
        $(this).css('top','-9px');
    });
    currentElement.disabled = true;
    $.ajax({
        url: '/foo',
        data: JSON.stringify(myjson),
        contentType: 'application/json;charset=UTF-8',
        type: 'POST',
        success: function(response){
            currentElement.disabled = false;
            currentElement.setAttribute('plugactive',JSON.parse(response)['state']);
            $(currentElement).find('i').animate({
                opacity: 1,
                top: '0px'
            },100)
        },
        error: function(error) {
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