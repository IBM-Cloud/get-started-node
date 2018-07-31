# Node.js getting started applicatio
The Getting Started tutorial for Node.js uses this sample application to provide you with a sample workflow for working with any Node.js app on IBM Cloud or in IBM Cloud Private; you set up a development environment, deploy an app locally and on the cloud, and then integrate a IBM Cloud database service in your app.

The Node.js app uses [Express Framework](https://expressjs.com) and [Cloudant noSQL DB service](https://console.bluemix.net/catalog/services/cloudant-nosql-db) or the [MongoDB Service](http://mongodb.github.io/node-mongodb-native/) to add information to a database and then return information from a database to the UI. To learn more about how the app connects to Cloudant, see the [Cloudant library for Node.js](https://www.npmjs.com/package/cloudant).

<p align="center">
  <img src="https://raw.githubusercontent.com/IBM-Bluemix/get-started-java/master/docs/GettingStarted.gif" width="300" alt="Gif of the sample app contains a title that says, Welcome, a prompt asking the user to enter their name, and a list of the database contents which are the names Joe, Jane, and Bob. The user enters the name, Mary and the screen refreshes to display, Hello, Mary, I've added you to the database. The database contents listed are now Mary, Joe, Jane, and Bob.">
</p>

The following steps are the general procedure to set up and deploy your app to IBM Cloud. See more detailed instructions in the [Getting started tutorial for Node.js](https://console.bluemix.net/docs/runtimes/nodejs/getting-started.html#getting-started-with-node-js-on-bluemix).

The starter application for IBM Cloud Private guides you through a similar process. However, instead of hosting both your service and application in the same cloud environment, you use a user-provided service. This guide shows you how to deploy your application to IBM Cloud Private and bind it to a Cloudant Database in IBM Cloud. For the complete procedure, see [Working with user-provided services and the Node.js starter app](https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0/cloud_foundry/buildpacks/buildpacks_using_nodejsapp.html).

## Before you begin

You'll need a [IBM Cloud account](https://console.ng.bluemix.net/registration/), [Git](https://git-scm.com/downloads), [Cloud Foundry CLI](https://github.com/cloudfoundry/cli#downloads), and [Node](https://nodejs.org/en/) installed. If you use [IBM Cloud Private](https://www.ibm.com/cloud-computing/products/ibm-cloud-private/), you need access to the [IBM Cloud Private Cloud Foundry](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0/cloud_foundry/overview.html) environment.

## Connecting to a MongoDB Database

You'll need access to a MongoDB instance. The below steps outline how to do this:

1. Sign in to your Bluemix Console, and select the 'Create Resource' button in the top right of the page.
2. Type 'MongoDB' in the search field and select 'Compose for MongoDB' under the 'Data & Analytics' section.
3. Check that the name/region/organization/space/pricing fields are accurate.
4. Select the 'Create' button in the bottom left of the page.
5. Return to the IBM Cloud dashboard and select the newly created service.
6. In the sidebar on the left side of the page, select 'Service Credentials'
7. Select the 'New Credential' button, and then the 'Add' button in the page that appears.

To prepare the application for use in a local environment, use the below steps. Otherwise, skip the steps to move on to deploying the application to IBM Cloud:

1. Make a copy the 'vcap-local.MongoDBexample.json' file (in the application root directory) as 'vcap-local.json' in the same directory.
2. Copy the contents of the 'uri' field in the credentials generated from earlier into the field (replacing "MONGODB_DATABASE_URI").
3. Run the application using 'npm install', followed by 'npm start'.

Before deploying the application, make sure that it builds successfully by running `npm install` and `npm start` from the root directory of the project (where this README document is located). If no errors are shown, run `cf push` to deploy the application. Once the deployment process completes, run `cf bind-service GetStartedNode [SERVICE_NAME]`, where [SERVICE_NAME] is the name of your MongoDB service. Finally, run `cf restage GetStartedNode`. Once this finishes, you can access the application using the URL provided in the output from the 'cf push' command from earlier.

## Additional Notes on Changes

The application may work with either Cloudant or MongoDB. However, if both services are available, **the application will default to MongoDB**.

When deployed on IBM Cloud, this application **does** require bound MongoDB services to have some permutation of 'mongodb' in the name. User-provided services (as created with the cf utility) are also acceptable.
