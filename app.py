from flask import Flask
import subprocess
from flask import render_template
app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html')

@app.route('/foo', methods=['POST'])
def foo(x=None, y=None):
    subprocess.Popen("python steckdose.py 2 0", shell=True)
    return render_template('index.html')
    pass

if __name__ == "__main__":
    app.run()