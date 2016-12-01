import json
import os
inputfile = 'conf.json'

def getPlugs():
	_return = []
	with open(inputfile) as f:
		data = json.load(f)
		for plug in data['plugs']:
			_return.append(plug)
	return _return

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

