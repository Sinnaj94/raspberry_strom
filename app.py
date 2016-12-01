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
    #TODO: rework
    #subprocess.Popen("python steckdose.py "+ str(a) + " " + str(b), shell=True)
    _state = helpertools.changeState(myid)
    return json.dumps({'state':_state})
    pass

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)
