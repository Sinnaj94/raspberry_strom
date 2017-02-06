from flask import Flask, request
import subprocess
import helpertools
import json
import time
from flask import render_template
application = Flask(__name__)
apiPath = '/api/v1.0'

# check if GPIO exists
def checkGPIO():
    package = 'RPi.GPIO'
    try:
        __import__(package)
        return True
    except ImportError:
        return False

onRaspberry = checkGPIO()

@application.route("/")
def main():
    myPlugs = helpertools.apiAllPlugs()
    _plugs = json.loads(myPlugs)['plugs']
    return render_template('index.html',plugs = [])

@application.route("/custom/<string:key>")
def custom(key):
    myPlugs = helpertools.apiPlugByKey(key)
    _plugs = json.loads(myPlugs)['info']['plugs']

    return render_template('index.html',plugs = _plugs)

@application.route('/switch', methods=['GET','POST'])
def switch():
    myid = request.json['myid']
    _return = changeState(myid, None)
    return _return
    pass

# REST API ---------
@application.errorhandler(404)
def not_found(error):
    return helpertools.apiError()
    
@application.route(apiPath,methods=['GET'])
def api():
	return "Rest Api"

@application.route('%s/plugs'%apiPath,methods=['GET'])
def returnAll():
	return helpertools.apiAllPlugs();

@application.route('%s/plugs/<string:key>'%apiPath,methods=['GET'])
def returnOne(key):
	return helpertools.apiPlugByKey(key)

@application.route('%s/switch/id/<string:id>'%apiPath, methods=['GET'])
def idSwitchNormal(id):    
    return changeState(id, None)

@application.route('%s/switch/id/<string:id>/<string:new_state>'%apiPath, methods=['GET'])
def idSwitchNew(id, new_state):
    _return = None
    if ',' in id:
        ids = id.split(',')
        return changeMultipleStates(ids, defineNewState(new_state))
    return changeState(id, defineNewState(new_state))


# REST API END -----
# SWITCH FUNCTIONS
def changeState(id, new_state):
    _return = helpertools.apiChangeState(id, new_state)
    runFunction(_return)
    return _return

def changeMultipleStates(ids, new_state):
    _return = []
    for id in ids:
        _return.append(json.loads(changeState(id, new_state)))
        time.sleep(.5)
    return json.dumps(_return)

def defineNewState(new_state):
    new_state = int(new_state)
    if new_state == 0:
        return False
    elif new_state == 1:
        return True
    return None



def runFunction(myobject):
    _dict = json.loads(myobject)
    #check if it has an error
    if not 'callback' in _dict:
        return None
    _subprocess = _dict["callback"]
    if onRaspberry:
        subprocess.Popen(_subprocess, shell=True)
    else:
        print(_subprocess)

if __name__ == "__main__":
    application.run(host='0.0.0.0', port=80, debug=True)
