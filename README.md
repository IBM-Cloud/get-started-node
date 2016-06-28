## Get Started with Node on Bluemix
#### Deploying a Node app


### 1. Introduction
In this guide you will take a sample to-do app and deploy it in 10 minutes. To get started you need to have a [Bluemix account](https://console.ng.bluemix.net/registration/).

Let’s make sure you have everything you'll need installed. Note that your version(s) may not match exactly, but that isn't a problem.

To follow along this guide you’ll need a [Bluemix account](https://console.ng.bluemix.net/registration/) and have [Node.js and npm](https://nodejs.org/en/download/) and [git](https://git-scm.com/downloads) installed.

[Node.js](https://nodejs.org/en/download/)
```
node -v
node -v5.10.1
```

[npm](https://www.npmjs.com/package/download)
```
npm -v
npm -v3.8.6
```

[Git](https://git-scm.com/downloads)
```
git --version
git version 2.7.4  
```

[Cloud Foundry CLI](https://github.com/cloudfoundry/cli#downloads)
```
cf -v
cf version 6.13.0-e68ce0f-2015-10-15T22:53:29+00:00
```

### 2. Clone the sample app

First up, clone the repo and target the starter folder where the sample app lives.
```
git clone https://github.com/rossfenrick/Deploying-a-Node-app
cd Deploying-a-Node-app
```


### 3. Run the app locally (optional)

In order to run the app you have to install the dependencies listed in the package.json file
```
npm install
```
Run the app
```
node server.js
```
For Windows users
```
node.js server.js
```


You should now see your app by viewing this URL - http://localhost:8080


### 4. Preparing the app for deployment

In order to deploy to Bluemix you have to setup a manifest.yml file in the application's root directory.
You can [download one here](https://pages.github.ibm.com/rossfenrick/Getting-Started-Guides/docs/manifest.yml) or create one using the example below:
```
applications:
- path: .
  memory: 256M
  instances: 1
  name: your-appname-here
  host: your-appname-here
```

Change both the `name` and `host` to a single unique name of your choice. Note that the `name` will be used in your public url, ie. http://bluemix-guide-part-01.mybluemix.net/.

The sample app is set to run locally on port 8080. When pushing to Bluemix ​the assigned port will be provided via a default environment variable. In the root directory, update line 5 of `server.js` to the following:
```
var port = process.env.VCAP_APP_PORT || 8080;
```


### 5. Deploying the app
To push an app you can use the Cloud Foundry CLI. Log in to your Bluemix account
```
cf login
```

Make sure you're still in the correct directory
```
cd Deploying-a-Node-app
```

Choose your API endpoint:
```
https://api.ng.bluemix.net # United States
https://api.eu-gb.bluemix.net # United Kingdom
https://api.au-syd.bluemix.net # Sydney
```

Push the node app to Bluemix
```
cf push
```

This may take a minute. If there is an error in the deployment process you can use the command `cf logs Your-App-Name --recent` to troubleshoot.

If successful you should see the following:
```
OK
requested state: started
instance: 1/1
usage: 256M x 1 instances
Urls: deploying-a-node-app.mybluemix.net
Last uploaded: Thu Jun 23 16:10:17 UTC 2016
Stack: cflinuxfs2
Buildpack: SDK for Node.js(™) (ibm-node.js-0.12.14, buildpack-v3.5-20160609-1608)
State     since              cpu     memory       disk        details
Running   2016-06-23 10:11:26 AM  0.0%  81.2M of 256M    82.7M of 1G
```

**Your application is now deployed!**
Go to http://your-app-name.mybluemix.net to see your app live on Bluemix.
