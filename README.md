# Get Started with Node on Bluemix
## Deploy a Node.js app
[View the guide on Bluemix here](https://new-console.ng.bluemix.net/get-started/)

### 1. Introduction
In this guide you'll take a sample to-do app and deploy it in 10 minutes.

To complete this guide you'll need a [Bluemix account](https://console.ng.bluemix.net/registration/) and a few other things. Use these commands to check if you are properly set up. Note that your version(s) may not match exactly, but that isn't a problem.

[Node.js](https://nodejs.org/en/download/)
```
$ node -v
node -v5.10.1
```

[npm](https://www.npmjs.com/package/download)
```
$ npm -v
npm -v3.8.6
```

[Git](https://git-scm.com/downloads)
```
$ git --version
git version 2.7.4  
```

[Cloud Foundry CLI](https://github.com/cloudfoundry/cli#downloads)
```
$ cf -v
cf version 6.13.0-e68ce0f-2015-10-15T22:53:29+00:00
```

### 2. Clone the sample app

Now you're ready to start working with the app. Clone the repo and change the directory to where the sample app lives.
```
git clone https://github.com/IBM-Bluemix/get-started-node
cd get-started-node
```


### 3. Run the app locally (optional)

In order to run the app you have to install the dependencies listed in the package.json file. Cloud Foundry uses the Node.js buildpack to read the dependencies from the package.json file.

Install dependencies
```
npm install
```
Run the app
```
node server.js
```

You should see "To view your app open this link in your browser: http://localhost:8080"


### 4. Prepare the app for deployment

To deploy to Bluemix, you have to setup a manifest.yml file in the root directory.

You can [download one here](https://new-console.ng.bluemix.net/get-started/docs/manifest.yml) or create one using the example below
```
applications:
- path: .
  memory: 256M
  instances: 1
  name: your-appname-here
  host: your-appname-here
```

Change both the `name` and `host` to a single unique name of your choice. Note that the `host` will be used in your public url, ie. http://your-appname-here.mybluemix.net. If you have already created an app from the Bluemix UI but haven't pushed your code to it, you can use the same name here.

The sample app is set to run locally on port 8080. When deploying to Bluemix, the port will be assigned by Cloud Foundry via a look up of the `PORT` environment variable.

In the root directory, update line 5 of `server.js` to look up the environment variable
```
var port = process.env.VCAP_APP_PORT || 8080;
```


### 5. Deploy the app
You can use the Cloud Foundry CLI to deploy apps.

To start, login your Bluemix account
```
cf login
```

Make sure you're still in the correct directory
```
cd get-started-node
```

Choose your API endpoint:
```
https://api.ng.bluemix.net # United States
https://api.eu-gb.bluemix.net # United Kingdom
https://api.au-syd.bluemix.net # Sydney
```

Push your node app to Bluemix
```
cf push
```

This may take a minute. If there is an error in the deployment process you can use the command `cf logs <Your-App-Name> --recent` to troubleshoot.

If successful you should see the following:
```
OK
requested state: started
instance: 1/1
usage: 256M x 1 instances
Urls: get-started-node.mybluemix.net
Last uploaded: Thu Jun 23 16:10:17 UTC 2016
Stack: cflinuxfs2
Buildpack: SDK for Node.js(™) (ibm-node.js-0.12.14, buildpack-v3.5-20160609-1608)
State     since              cpu     memory       disk        details
Running   2016-06-23 10:11:26 AM  0.0%  81.2M of 256M    82.7M of 1G
```

**Your application is now deployed!**

privacy notice
--------------------------------------------------------------------------------

This web application includes code to track deployments to [IBM Bluemix](https://www.bluemix.net/) and other Cloud Foundry platforms. The following information is sent to a [Deployment Tracker](https://github.com/cloudant-labs/deployment-tracker) service on each deployment:

* Application Name (`application_name`)
* Space ID (`space_id`)
* Application Version (`application_version`)
* Application URIs (`application_uris`)

This data is collected from the `VCAP_APPLICATION` environment variable in IBM Bluemix and other Cloud Foundry platforms. This data is used by IBM to track metrics around deployments of sample applications to IBM Bluemix to measure the usefulness of our examples, so that we can continuously improve the content we offer to you. Only deployments of sample applications that include code to ping the Deployment Tracker service will be tracked.

### disabling deployment tracking

Deployment tracking can be disabled by removing the `require("cf-deployment-tracker-client").track();` line from the end of the `server.js` file.

![Bluemix Deployments](https://deployment-tracker.mybluemix.net/stats/ea5c26737acbd97372e61ce1515e1b77/badge.svg)
