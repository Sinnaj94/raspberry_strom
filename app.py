from flask import Flask, request
import subprocess
import helpertools
import json
from flask import render_template
app = Flask(__name__)

@app.route("/")
def main():
    _plugs = helpertools.getPlugs()
    return render_template('index.html',plugs = _plugs)

@app.route('/foo', methods=['GET','POST'])
def foo(x=None, y=None):
    myid = int(request.json['myid'])
    _state = helpertools.changeState(myid)
    _subprocess = helpertools.getSteckdoseFormatted(myid)
    #subprocess.Popen(_subprocess, shell=True)
    
    return json.dumps({'state':_state, 'subprocess':_subprocess})
    pass

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)
