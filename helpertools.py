import json

def getJSON(file):
	_return = ''
	with open(file) as myfile:
		_return=json.load(myfile)
	return _return

def getPlugs():
	jsontest = getJSON('static/configuration/conf.json')
	_return = []
	for plug in jsontest['plugs']:
		_return.append(plug)
	print _return
	return _return


getPlugs();