var device_list =[];
$(document).ready(function(){
	//Configure Devices
	configureDevices();
	//Insert the right ID's
	for(var i = 0; i < device_list.length; i++){
		var to_insert = '<tr id="row_'+i+'"><td class="align-middle-table" id="device"><span id="item_' + i + '"></span></td><td class="align-middle-table"><div class="btn-group on-off-button-group" id="buttongroup_' + i + '" role="onoffswitch"><button type="button" class="btn btn-primary" id="button_on_'+i+'"><i class="material-icons" id="icon_button_'+i+'"></i></button></div></td></tr><!--for-schleife ende-->'
		$('#insert_here').append(to_insert);
		$('#item_' + i).text(device_list[i].name);
		$('#button_on_'+i).on("click", {
			current_id: i
		},switchOnOff);
		//Setting first button icon
		initButtonIcon(i,device_list[i].state);
	}
});
//ADDS A DEVICE WITH A CURRENT STATE
function addDevice(name,id,state){
	device_list.push({name,id,state});
}
function configureDevices(){
	addDevice("PC",1,false);
	addDevice("Raspberry",2,false);
	addDevice("TV",3,false);
	addDevice("ABC",3,true);
}
function turnOff(event){
	var id=event.data.current_id;
	executePythonFunction("turnOff",event);
	setButtonIcon(id,false);
}
function turnOn(event){
	var id=event.data.current_id;
	executePythonFunction("turnOn",event);
	setButtonIcon(id,true);
}
function setButtonIcon(id,on){

	animateButtonChange(id,on);
	//$("#icon_button_"+id).text(text);
}
function initButtonIcon(id,on){
	var text;
	on ? text = "brightness_7":text = "brightness_3";
	var id_name = "#icon_button_"+id;
	$(id_name).text(text);
}
function animateButtonChange(id,on){
	var id_name = "#icon_button_"+id;
	$(id_name).animate({
		opacity:0
	},200,function(){
		initButtonIcon(id,on);
	})
	$(id_name).animate({
		opacity:1
	},200)

}
function switchState(id){
	device_list[id].state = !device_list[id].state 
}
function switchOnOff(event){
	var id = event.data.current_id;
	device_list[id].state ? turnOff(event) : turnOn(event);
	switchState(id);
}
function executePythonFunction(functionName,args){
	$.ajax({
		url: "scripts/python/test_script.py",
		success: function(response){
			console.log(response);
		}
	});
	console.log("EXECUTED PYTHON SCRIPT "+ functionName + " WITH ARGS " + args);
}