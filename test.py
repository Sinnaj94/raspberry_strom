import time
import subprocess
on = False
while True:
    if on:
        subprocess.Popen("python steckdose.py 2 0", shell=True)
        on=False
    else:
        subprocess.Popen("python steckdose.py 2 1", shell=True)
        on=True
    time.sleep(60)
