$(document).ready(function(){
	//Insert the right ID's
	for(var i = 0; i < 5; i++){
		var to_insert = '<tr><td class="align-middle-table" id="device"><span id="item_' + i + '"></span></td><td class="align-middle-table"><div class="btn-group on-off-button-group" id="buttongroup_+' + i + '" role="onoffswitch"><button type="button" class="btn btn-default btn-switch">O</button><button type="button" class="btn btn-primary btn-switch">I</button></div></td></tr><!--for-schleife ende-->'
		$('#insert_here').append(to_insert);
	}
	for(var i = 0; i < 5; i++){
		$('#item_' + i).text('Lampe ' + (i+1));
	}
});
