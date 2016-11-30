from flask import Flask, request
import subprocess
import helpertools
from flask import render_template
app = Flask(__name__)

@app.route("/")
def main():
    _plugs = helpertools.getPlugs()
    return render_template('index.html',plugs = _plugs)

@app.route('/foo', methods=['GET','POST'])
def foo(x=None, y=None):
    a = request.json['id']
    b = request.json['state']
    #TODO: rework
    subprocess.Popen("python steckdose.py "+ str(a) + " " + str(b), shell=True)
    msg = "SWITCH WAS SUCCESFUL (ID: " + str(a) + " STATE:" + str(b) + ")"
    return msg
    pass

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)
