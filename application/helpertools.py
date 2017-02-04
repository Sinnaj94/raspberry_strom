import json
import os
import subprocess
inputfile = 'conf.json'

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
def changeState(myid):
	_return = None
	with open(inputfile) as f:
		data = json.load(f)
		newPlugs = []
		for plug in data['plugs']:
			if(plug['myid'] == myid):
				plug['state'] = not plug['state']
				_return = plug['state']
			newPlugs.append(plug)
		data['plugs'] = newPlugs

	with open(inputfile, 'w') as f:
		json.dump(data, f, indent=4)
	print _return
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
				if(plug['state']):
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
	if not foundPlug:
		return apiError();
	_returnPlug = json.dumps({'plugs': [plug for plug in plugs if plug['key'] == key]})
	return _returnPlug

def apiError():
	#overthink
	return json.dumps({"error" : {"status": 404, "message" : "Not found"}})

def apiChangeState(id):
	
	if id.isdigit() == False:
		return json.dumps({"error": {"message": "Not a number"}})
	newState = None
	newState = changeState(int(id))
	if newState is None:
		return apiError()
	return json.dumps({'new_state': newState})
