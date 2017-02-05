var device_list = [];

//On Document Load
$(document).ready(function () {
    $(document).on('click', '.plug-list-item', function (e) {
        switchOnOff(jQuery(this).find('button')[0]);
    });
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
    console.log(e)
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
        top:'20px'
    },'fast',function(){
        $(this).css('top','-20px');
    });
    currentElement.disabled = true;
    $.ajax({
        url: '/switch',
        data: JSON.stringify(myjson),
        contentType: 'application/json;charset=UTF-8',
        type: 'POST',
        success: function(response){
            //console.log(response);
            currentElement.disabled = false;
            var newState = JSON.parse(response)['info']['new_state'];
            console.log(newState)
            $(currentElement).find('i').animate(
            { opacity: 1, top: '0px'},{
                duration: 'fast',
                start:function(){
                    //TODO: DISABLE MULTIPLE ASSIGNMENTS
                    currentElement.setAttribute('plugactive',newState)
                }
            });
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