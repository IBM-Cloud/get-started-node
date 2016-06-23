# STEP 1 DEPLOY NODE STARTER APP


To follow along this guide you’ll need a [Bluemix account](https://console.ng.bluemix.net/registration/) and have [Node.js and npm](https://nodejs.org/en/download/) and [git](https://git-scm.com/downloads) installed.

Let’s make sure you have node installed. Enter the following into your command line:

```
   $ node -v
```

Let’s check that you have git installed too:

```
   $ git --version
```


###Let's get started!


**1 Clone the sample app**

First up, let’s clone the sample app:
```
$ git clone https://github.com/Twanawebtech/Bluemix-Guide-Node
$ cd STEP1-NODE-STARTER
(The STEP1-NODE-STARTER folder has everything that you need to complete this part)
```


**2 Run the app locally**

In order to run the app we first have to install the dependencies listed in the package.json file
```
Install all the dependencies
$ npm install

Run the app
$ node server.js
```
You should now see your app by viewing this URL - http://localhost:8080


**3 Preparing our app for deployment**

In order to deploy to Bluemix you have to setup a manifest.yml file and package.json file. We’ve already added these files to our app for you.

package.json
allows Bluemix to identify your package dependencies with npm install when you push an app to Bluemix.

manifest.yml
gives Bluemix some basic information about your app, such as the name, how much memory to allocate and how many instances to create.

In order to deploy we’ll just have to make a few small changes to the manifest file.

Take a look at your manifest.yml file (located in the root directory) and you should see the following:

```
applications:
- path: .
  memory: 256M
  instances: 1
  name: bluemix-guide-part-01
  host: bluemix-guide-part-01
  disk_quota: 1024M
```
Change both the name and host to a single unique name of your choice. Note that this name will be used in your public url, ie. http://bluemix-guide-part-01.mybluemix.net/



**4 Deploying our app**

You will need to install the Cloud Foundry CLI which enables us to talk to Bluemix from within the command line.
Note: You may have to restart your terminal after installing.

```
Make sure you’re in the correct directory:
$ cd STEP1-NODE-STARTER

Login into Bluemix:
$ cf login

Choose your API endpoint:
US - $ https://api.ng.bluemix.net
UK - $ https://api.eu-gb.bluemix.net
Sydney - $ api.au-syd.bluemix.net


Select an Org and a Space to deploy to:
  Select an org (or press enter to skip)
 1. username@email.com
$ Org> 1
$ Targeted org username@email.com

Think of Orgs and Spaces as ways to organize your apps



Push your node app to Bluemix
$ cf push <app name>
Remember: this is the name you entered in your manifest.yml file

```


What you should see after running the `$ cf push `

```
OK
requested state: started
instance: 1/1
usage: 256M x 1 instances
Urls: bluemix-guide-app-demo-01.mybluemix.net
Last uploaded: Mon Apr 4 16:10:17 UTC 2016
Stack: cflinuxfs2              .
Buildpack: SDK for Node.js(™) (node.js-0.12.13, buildpack-v3.2-20160315-1257)                 .
State     since              cpu     memory       disk        details
Running   2016-04-04 05:11:26 PM  0.0%  58M of 256M    79.3M of 1G
```

**Your application is now deployed!** Go to http://<Your-App-Name>.mybluemix.net/ to see your app live on Bluemix.


If there is an error in the deployment process you can use the command ` $ cf logs < Your-App-Name > --recent to troubleshoot. `


Now that you know how to deploy a Node.js app, let’s add a Cloudant Database to our app so we can save our To-Do tasks.


**Next: [Add Cloudant Database >>](https://github.com/Twanawebtech/Bluemix-Guide-Node/tree/master/STEP2-DATABASE)**






## Troubleshooting

  Here are some useful commands you can use. You will learn more when working with the Bluemix CLI.

  ```sh
    $ cf logs < Your-App-Name > --recent
    (View Recent Deployment logs)
  ```

  ```sh
  $ cf login
  (Login to Bluemix)
  ```
  ```sh
    $ cf apps
    (View current apps on targeted org/space)
  ```
  ```sh
   $ cf services
   (View services on targeted org/space)
  ```
  ```sh
   $ cf push < Your-App-Name >
   (Push your app to Bluemix)
  ```
  ```sh
   $ cf delete < Your-App-Name >
   (Delete App from Bluemix)
  ```
  ```sh
   $ cf restage < Your-App-Name >
   (Restage your app, command in which you need to use when binding services)
  ```
  ```sh
  $ cf env < Your-App-Name >
  (Displays application environment details, if services binned to your app such as a database then you can see your Database details as well using this command)
  ```

  [Click here to see more commands](https://console.ng.bluemix.net/docs/cli/reference/bluemix_cli/index.html)


