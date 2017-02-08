---

copyright:
  years: 2017
lastupdated: "2017-02-06"

---

{:shortdesc: .shortdesc}
{:new_window: target="_blank"}
{:codeblock: .codeblock}
{:pre: .pre}
{:screen: .screen}
{:aside: .aside}


# Getting started with Node.js on Bluemix
To get started, we'll take you through a sample hello world app to help you set up a development environment and deploy to Bluemix.

## Prerequisites
{: #prereqs}

You'll need a [{{site.data.keyword.Bluemix}} account](https://console.ng.bluemix.net/registration/), [Git ![External link icon](../../icons/launch-glyph.svg "External link icon")](https://git-scm.com/downloads){: new_window} [Cloud Foundry CLI ![External link icon](../../icons/launch-glyph.svg "External link icon")](https://github.com/cloudfoundry/cli#downloads){: new_window} and [Node ![External link icon](../../icons/launch-glyph.svg "External link icon")](https://nodejs.org/en/){: new_window}

## 1. Clone the sample app
{: #clone}

Now you're ready to start working with the simple Node.js *hello world* app. Clone the repository and change to the directory to where the sample app is located.
  ```
  git clone https://github.com/IBM-Bluemix/nodejs-helloworld
  ```
  {: pre}

  ```
  cd nodejs-helloworld
  ```
  {: pre}

  Peruse the files in the *nodejs-helloworld* directory to familiarize yourself with the contents.

## 2. Run the app locally

Install the dependencies listed in the [package.json ![External link icon](../../icons/launch-glyph.svg "External link icon")](https://docs.npmjs.com/files/package.json) file to run the app locally.  
  ```
  npm install
  ```
  {: pre}

Run the app.
  ```
  npm start  
  ```
  {: pre}

View your app at: http://localhost:3000

## 3. Prepare the app for deployment
{: #prepare}

To deploy to {{site.data.keyword.Bluemix_notm}}, it can be helpful to set up a manifest.yml file. One is provided for you with the sample. Take a moment to look at it.

The manifest.yml includes basic information about your app, such as the name, how much memory to allocate for each instance and the route. In this manifest.yml **random-route: true** generates a random route for your app to prevent your route from colliding with others.  You can replace **random-route: true** with **host: myChosenHostName**, supplying a host name of your choice. [Learn more...](/docs/manageapps/depapps.html#appmanifest)
 ```
 applications:
 - name: nodejs-helloworkd
   random-route: true
   memory: 512M
 ```
 {: codeblock}

## 4. Deploy the app
{: #deploy}

You can use the Cloud Foundry CLI to deploy apps.

Choose your API endpoint
   ```
   cf api <API-endpoint>
   ```
   {: pre}

Replace the *API-endpoint* in the command with an API endpoint from the following list.
  ```
  https://api.ng.bluemix.net # US South
  https://api.eu-gb.bluemix.net # United Kingdom
  https://api.au-syd.bluemix.net # Sydney
  ```

Login to your {{site.data.keyword.Bluemix_notm}} account

  ```
  cf login
  ```
  {: pre}

From within the *nodejs-helloworld* directory push your app to {{site.data.keyword.Bluemix_notm}}
  ```
  cf push
  ```
  {: pre}

This can take a minute. If there is an error in the deployment process you can use the command `cf logs <Your-App-Name> --recent` to troubleshoot.

If successful you should see something similar to the following
  ```
  OK
  requested state: started
  instance: 1/1
  usage: 256M x 1 instances
  Urls: myUrl.mybluemix.net
  Last uploaded: Thu Jun 23 16:10:17 UTC 2016
  Stack: cflinuxfs2
  Buildpack: SDK for Node.js(™) (ibm-node.js-0.12.14, buildpack-v3.5-20160609-1608)
  State     since              cpu     memory       disk        details
  Running   2016-06-23 10:11:26 AM  0.0%  81.2M of 256M    82.7M of 1G
  ```
  {: screen}

  View your app at the URL listed in the output of the push command, for example, *myUrl.mybluemix.net*.  You can issue the
  ```
  cf apps
  ```
  {: pre}
  command to view your apps status and see the URL.

  Remember if you don't need your app live, stop it so you don't incur any unexpected charges.


## 5. Add a database
{: #adddatabase}

Next, we'll add a NoSQL database to this application and set up the application so that it can run locally and on Bluemix.

1. Log in to Bluemix in your Browser. Select your application and click on `Connect new` under `Connections`.
2. Select `Cloudant NoSQL DB` and Create the service.
3. Select `Restage` when prompted. Bluemix will restart your application and provide the database credentials to your application using the `VCAP_SERVICES` environment variable. This environment variable is only available to the application when it is running on Bluemix.

## 6. Use the database
{: #usedatabase}
We're now going to update your local code to point to this database. We'll create a json file that will store the credentials for the services the application will use. This file will get used ONLY when the application is running locally. When running in Bluemix, the credentials will be read from the VCAP_SERVICES environment variable.

1. Create a file called `vcap-local.json` in the `nodejs-helloworld` directory with the following content:
```
{
  "services": {
    "cloudantNoSQLDB": [
      {
        "credentials": {
          "url":"CLOUDANT_DATABASE_URL"
        },
        "label": "cloudantNoSQLDB"
      }
    ]
  }
}
```
{: pre}

2. Back in the Bluemix UI, select your App -> Connections -> Cloudant -> View Credentials

3. Copy and paste just the `url` from the credentials to the `url` field of the `vcap-local.json` file.

4. Run your application locally.
  ```
  npm start  
  ```
  {: pre}

  View your app at: http://localhost:3000. Any names you enter into the app will now get added to the database.

  Make any changes you want and re-deploy to Bluemix!
  ```
  cf push
  ```
  {: pre}
