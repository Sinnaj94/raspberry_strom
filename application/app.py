from flask import Flask, request
import subprocess
import helpertools
import json
from flask import render_template
application = Flask(__name__)
apiPath = '/api/v1.0'

@application.route("/")
def main():
    _plugs = helpertools.getPlugs()
    return render_template('index.html',plugs = _plugs)

@application.route('/switch', methods=['GET','POST'])
def switch(x=None, y=None):
    myid = request.json['myid']
    _return = changeState(myid)
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

@application.route('%s/switch/<string:id>'%apiPath, methods=['GET'])
def returnSwitch(id):
    return changeState(id)

def changeState(id):
    _return = helpertools.apiChangeState(id)
    runFunction(_return)
    return _return


# REST API END -----
# SWITCH FUNCTIONS
def runFunction(myobject):
    _dict = json.loads(myobject)
    #check if it has an error
    if not 'callback' in _dict:
        return None
    _subprocess = _dict["callback"]
    subprocess.Popen(_subprocess, shell=True)

if __name__ == "__main__":
    application.run(host='0.0.0.0', port=80, debug=True)
