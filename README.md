# Raspberry Smart Home
## Hardware
* Raspberry Pi with configured SSH
* 433 MHz Sender Module

Using [this guide](https://chriskrz.selfhost.bz/index.php/433mhz-schalt-steckdosen-fernsteuern/), install the Raspberry Pi Module.

## Setup

Configure the [configuration](./source/conf.json). You should give every entry in "plugs" a unique id, a name, the key that your Remote Plugs are setup with (doesn't work yet) and an ID. Also, you can setup the steckdose.py using [this guide](https://chriskrz.selfhost.bz/index.php/433mhz-schalt-steckdosen-fernsteuern/).

## Installation

### Development Environment
Clone this Repository. Install the node_modules using the command ```npm install```. To deploy the Software to your Pi, setup the [gulpfile](./source/gulpfile.js) to match your Raspberry Pi Hostname / IP Adress. Type the command ```gulp deploy --staging``` to deploy to the Raspberry Pi.

### Raspberry Pi
Install the Flask Server using the command ```pip install Flask```. Detailed Installation Guide on Flask can be found [here](http://flask.pocoo.org/docs/0.12/installation/). Navigate to the source folder on your Raspberry Pi via SSH. Type the command ```sudo python app.py``` to start the Application. Now you can navigate to your raspberry Pi IP on the Browser.

## Credits
The Software uses the Script [elropi.py](http://pastebin.com/aRipYrZ6) from HeikoHeiko.
