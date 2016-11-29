import json

def getJSON(file):
	_return = ''
	with open(file) as myfile:
		_return=json.load(myfile)
	return _return

def iterateObjects():
	jsontest = getJSON('static/configuration/conf.json')
	for plug in jsontest['plugs']:
		print json.dumps(plug['name'])
		print json.dumps(plug['state'])
		print json.dumps(plug['id'])

iterateObjects();