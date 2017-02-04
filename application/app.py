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

@application.route('/foo', methods=['GET','POST'])
def foo(x=None, y=None):
    myid = int(request.json['myid'])
    _state = helpertools.changeState(myid)
    _subprocess = helpertools.getSteckdoseFormatted(myid)
    subprocess.Popen(_subprocess, shell=True)
    
    return json.dumps({'state':_state, 'subprocess':_subprocess})
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

#TODO: Merge with other functions, because same capability.
@application.route('%s/switch/<string:id>'%apiPath, methods=['GET'])
def changeSwitch(id):
    myid = int(id)
    _state = helpertools.changeState(myid)
    _subprocess = helpertools.getSteckdoseFormatted(myid)
    subprocess.Popen(_subprocess, shell=True)
    
    return json.dumps({'state':_state, 'subprocess':_subprocess})
	#return helpertools.apiChangeState(id)

# REST API END -----
if __name__ == "__main__":
    application.run(host='0.0.0.0', port=80, debug=True)
