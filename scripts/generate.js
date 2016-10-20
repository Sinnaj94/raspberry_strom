var device_list =[];
$(document).ready(function(){
	//Configure Devices
	configureDevices();
	//Insert the right ID's
	for(var i = 0; i < device_list.length; i++){
		var to_insert = '<tr><td class="align-middle-table" id="device"><span id="item_' + i + '"></span></td><td class="align-middle-table"><div class="btn-group on-off-button-group" id="buttongroup_' + i + '" role="onoffswitch"><button type="button" class="btn btn-default btn-switch" id="button_off_'+i+'">O</button><button type="button" class="btn btn-primary btn-switch" id="button_on_'+i+'">I</button></div></td></tr><!--for-schleife ende-->'
		$('#insert_here').append(to_insert);
		$('#item_' + i).text(device_list[i].name);
		$('#button_on_'+i).on("click", {
			current_id: i
		},turnOn);
		$('#button_off_'+i).on("click", {
			current_id: i
		},turnOff);
	}
});
function addDevice(name,id){
	device_list.push({name,id});
}
function configureDevices(){
	addDevice("PC",1);
	addDevice("Raspberry",2);
	addDevice("TV",3);
}
function turnOff(event){
	executePythonFunction("turnOff",event.data.current_id);
}
function turnOn(event){
	executePythonFunction("turnOn",event.data.current_id);
}
function executePythonFunction(functionName,args){
	console.log("EXECUTED PYTHON SCRIPT "+ functionName + " WITH ARGS " + args);
	console.log(args);
}