import json
import os
import subprocess
inputfile = './conf.json'

# HARDWARE CHANGES


# END OF HARDWARE CHANGES
def getPlugs():
	_return = []
	with open(inputfile) as f:
		data = json.load(f)
		for plug in data['plugs']:
			_return.append(plug)
	return _return

# change a state of a fix id
def changeState(myid, new_state):
	_return = None
	with open(inputfile) as f:
		data = json.load(f)
		newPlugs = []
		for plug in data['plugs']:
			if(plug['myid'] == myid):
				if new_state is None:
					plug['state'] = not plug['state']
					_return = plug['state']
				else:
					plug['state'] = new_state
					_return = new_state
			newPlugs.append(plug)
		data['plugs'] = newPlugs

	with open(inputfile, 'w') as f:
		json.dump(data, f, indent=4)
	return _return


# function for calling a python function
def getSteckdoseFormatted(myid):
	_return = "python steckdose.py "
	with open(inputfile) as f:
		data = json.load(f)
		for plug in data['plugs']:
			if(plug['myid'] == myid):
				_return += str(plug['id'])
				_return += " "
				_my_new_state = plug['state']
				if(_my_new_state):
					_return += "1"
				else:
					_return += "0"

				_return += " "
				_return += str(plug['key'])
				return _return
	return None

# REST API FUNCTIONS
# get all the plugs in a json format
def apiAllPlugs():
	return json.dumps({'plugs': getPlugs()});

# get a plug with a key. example: apiPlugByKey(11111) returns all plugins with key 11111
def apiPlugByKey(key):
	plugs = getPlugs();
	foundPlug = [plug for plug in plugs if plug['key'] == key];
	_returnPlug = json.dumps({'info':{'plugs': [plug for plug in plugs if plug['key'] == key]}})
	return _returnPlug

# standard api error - at the moment 404 error
def apiError():
	#todo: overthink
	return json.dumps({"error" : {"status": 404, "message" : "Not found"}})

# change a lamp state to and an id an optional new_state
def apiChangeState(id, new_state):
	if id.isdigit() == False:
		return json.dumps({"error": {"message": "Not a number"}})
	myid = int(id)
	_state = None
	_state = changeState(int(id),new_state)
	if _state is None:
		return apiError()
	_subprocess = getSteckdoseFormatted(myid)
	#success function with a callback function for terminal
	return json.dumps({'info': {'new_state' : _state},'callback' : _subprocess})
