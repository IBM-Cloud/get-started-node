# IBM Cloud Node.js Application Deployment Options

## Overview

In 2021 we [announced a change](http://ibm.biz/cf-buildpack-node-change) to the deployment of Node.js applications in IBM Cloud Foundry. This README supports that announcement with some details behind the mechanics of deploying and using various types of Node.js buildpacks and Node.js runtime versions.

## Technical Details

In IBM Cloud Foundry, the Node.js buildpacks have different names: "sdk-for-nodejs" for the IBM Node.js buildpack and "nodejs_buildpack" for the Open Source Node.js buildpack.

You can see these using the command `ibmcloud cf buildpacks | grep -i node`

Two buildpack related details can optionally be specified when deploying Node.js applications:

* a which Node.js buildpack to use (listed above) - this can be specified on the CLI or manifest.yml file.  
* a specific version of the Node.js engine - this can only be specified in the package.json file

## Deployment Examples

It is possible to deploy with specific buildpack information in several ways:

### Deploying a specific buildpack

#### CLI Deployment
This specifies a specific Node.js buildpack that is already installed on the Cloud Foundry server.

This for example will deploy using the IBM Node.js buildback, even if not the default option.
```
> ibmcloud cf push -b sdk-for-nodejs
```
### Git URL with a branch or tag
If you still need older versions of the Open Source Node.js buildpack, you can specify them on your deployment command line, even after Phase 2 is complete.  
Find the Node.js buildpack release that contains the runtime version you need in the Node.js buidpack [release notes](https://github.com/cloudfoundry/nodejs-buildpack/releases) and specify the release on the cf push.  

You will need to know the exact runtime version you want, and what version of Open Source Node.js buildpack has that Node version. 

Example: You want Node version 8.16.0 that exists in Node buildpack v1.6.56  - so the Git link for that would be https://github.com/cloudfoundry/nodejs-buildpack.git#v1.6.56.
Specify the version of the Node.js buildpack on the command line and the version in the runtime in your package.json file, and you're set to deploy and build.

Example
```
> ibmcloud cf push -b https://github.com/cloudfoundry/nodejs-buildpack.git#v1.6.56 
```
```
applications:
- buildpacks:
    - https://github.com/cloudfoundry/nodejs-buildpack.git#v1.6.56 
```
## Deployment Use Cases

You may need to make adjustments depending on how you deploy your Node.js applications in IBM Cloud Foundry, and they may be different in each phase.

### Use Case #1: Your application doesn't specify Node.js version or buildpack

**Method**: The application specifies no buildpack version or Node.js version \
**Change**: No change needed and your application is deployed using the default Node.js buildpack.

### Use Case #2: Your application specifies the IBM Node buildpack

**Method**: The application specifies the IBM Node.js buildpack (listed above) \
**Change**: \
&nbsp;&nbsp;&nbsp;&nbsp; * Phase 1: You can continue to specify the IBM buildpack "sdk-for-nodejs" \
&nbsp;&nbsp;&nbsp;&nbsp; * Phase 2: You can no longer specify the IBM buildpack, but the other methods of deployment and specifying specific Node.js versions are availalbe to you.

### Use Case #3: Your application specifies the Node.js version 

**Method**: If your package.json file specifies a specific Node.js version, especially as that version starts to age, you can force that version for your deployment.

Example in package.json
```
"engines": {
  "node":  "8.16.0"
}
```
**Change**: Those older Node.js versions will no longer be auto-downloaded once the default switch to Open Source Node.js buildpack \
 &nbsp;&nbsp;&nbsp;&nbsp; * Phase 1: You can continue to specify the IBM buildpack "sdk-for-nodejs" in your deployment CLI \
 &nbsp;&nbsp;&nbsp;&nbsp; * Phase 2: You can no longer specify the IBM buildpack - you can specify an older Node version if you really need to, but you'll need to use the [Git URL with a branch or tag](#Git-URL-with-a-branch-or-tag) method. 
