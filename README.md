
# Node.js getting started application
The Bluemix Getting Started for Node.js uses this sample application to provide you with a sample workflow for working with any Node.js app on Bluemix; you set up a development environment, deploy an app locally and on Bluemix, and integrate a Bluemix database service in your app.

The Node.JS app uses Express Framework and Cloudant noSQL DB service to add information to a database and then return information from a database to the UI.

<p align="center">
  <img src="https://raw.githubusercontent.com/IBM-Bluemix/get-started-java/master/docs/GettingStarted.gif" width="300" alt="Gif of the sample app contains a title that says, Welcome, a prompt asking the user to enter their name, and a list of the database contents which are the names Joe, Jane, and Bob. The user enters the name, Mary and the screen refreshes to display, Hello, Mary, I've added you to the database. The database contents listed are now Mary, Joe, Jane, and Bob.">
</p>

The following steps are the general procedure to set up and deploy your app. See more detailed instructions in the [Getting started guide for Node.js](https://console.bluemix.net/docs/runtimes/nodejs/getting-started.html#getting-started-with-node-js-on-bluemix).

## Before you begin

You'll need a [Bluemix account](https://console.ng.bluemix.net/registration/), [Git](https://git-scm.com/downloads) [Cloud Foundry CLI](https://github.com/cloudfoundry/cli#downloads) and [Node](https://nodejs.org/en/)

## 1. Clone the sample app

## 2. Run the app locally

1. Install the dependencies listed in the [package.json](https://docs.npmjs.com/files/package.json) file to run the app locally.  

2. Run the app.

3. View your app at: http://localhost:3000

## 3. Prepare the app for deployment

To deploy to Bluemix, it can be helpful to set up a manifest.yml file. You can find a sample in the repo that you cloned.

## 4. Deploy the app

Use the Cloud Foundry CLI to deploy apps.

1. Choose your API endpoint
   ```
   cf api <API-endpoint>
   ```

2. Login to your Bluemix account

  ```
  cf login
  ```

3. From within the *nodejs-helloworld* directory push your app to Bluemix
  ```
  cf push
  ```

This can take a minute. If there is an error in the deployment process you can use the command `cf logs <Your-App-Name> --recent` to troubleshoot.


View your app at the URL listed in the output of the push command, for example, *myUrl.mybluemix.net*.  

## 5. Add a database

1. Log in to Bluemix in your Browser. Select your application and click on `Connect new` under `Connections`.
2. Select `Cloudant NoSQL DB` and Create the service.
3. Select `Restage` when prompted. Bluemix will restart your application and provide the database credentials to your application using the `VCAP_SERVICES` environment variable. This environment variable is only available to the application when it is running on Bluemix.

## 6. Use the database

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

2. Back in the Bluemix UI, select your **App > Connections > Cloudant > View Credentials**

3. Copy and paste just the `url` from the credentials to the `url` field of the `vcap-local.json` file.

4. Run your application locally.
  ```
  npm start  
  ```

  View your app at: http://localhost:3000. Any names you enter into the app are added to the database.

  Tip: Use [nodemon](https://nodemon.io/) to automatically restart the application when you update code.

5. Make any changes you want and re-deploy to Bluemix!
  ```
  cf push
  ```
