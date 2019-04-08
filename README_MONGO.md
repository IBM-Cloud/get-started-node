## Connecting to a MongoDB Database

You'll need access to a MongoDB instance. The below steps outline how to do this:

1. Sign in to your IBM Cloud Console, and select the 'Create Resource' button in the top right of the page.
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
