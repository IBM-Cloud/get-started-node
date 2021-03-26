# IBM Cloud Node.js Application Deployment Options

## Overview

In 2021 we [announced a change](http://ibm.biz/cf-buildpack-node-change) to the deployment of Node applications in IBM Cloud Foundry. This README supports that announcement with some details behind the mechanics of deploying and using various types of Node.js buildpacks and Node.js runtime versions.


## Technical Details

In IBM Cloud Foundry, the Node.js buildpack types have different names:  "sdk-for-nodejs" for the IBM Node.js buildpack and "nodejs_buildpack" for the Open Source Node.js buildpack.

You can see these using the command `ibmcloud cf buildpacks | grep -i node`

Two buildpack related details can optionally be specified when deploying Node applications:

* a type of the buildpack to use (listed above) - this can be specified on the CLI
* a specific version of the Node.js engine - this can only be specified in the package.json file

## Deployment Examples

It is possible to deploy with specific buildpack information in several ways.

### Deploying a specific buildpack type

#### CLI Deployment
This specifies a specific Node.js buildpack that is already installed on the Cloud Foundry server.

```
> ibmcloud cf push -b sdk-for-nodejs
```
### Git URL with a branch or tag
If you still need older versions of the Open Source Node.js buildpack, you can specify them on your deployment command line, even after Phase 2 is complete.  
Find the Node.js buildpack release that contains the runtime version you need in the Node.js buidpack [release notes](https://github.com/cloudfoundry/nodejs-buildpack/releases) and specify the release on the cf push.  

You will need to know the exact runtime version you want, and what version of Open Source Node.js buildpack has that Node version. 

Example: You want Node version 8.16.0 that exists in Node buildpack v1.6.56  - so the Git link for that would be https://github.com/cloudfoundry/nodejs-buildpack.git#v1.6.56.
Specify the version of the Node.js buildpack on the command line and the version in the runtime in your package.json file, and you're set to deploy and build.

Example
```
> ibmcloud push -b https://github.com/cloudfoundry/nodejs-buildpack.git#v1.6.56 
```
## Deployment Use Cases

You may need to make adjustments depending on how you deploy your Node.js applications in IBM Cloud Foundry, and they may be different in each phase.

### Use Case #1: Your application doesn't specify Node version type

Method: The application specifies no buildpack version type or Node version \
Change: No change needed \

### Use Case #2: Your application specifies the IBM Node buildpack specifically

Method: The application specifies the node version type (listed above) \
Change: \
&nbsp;&nbsp;&nbsp;&nbsp; Phase 1: You can continue to specify the IBM buildpack "sdk-for-nodejs" \
&nbsp;&nbsp;&nbsp;&nbsp; Phase 2: You can no longer specify the IBM buildpack, but the other methods of deployment and specifying specific Node.js versions are availalbe to you. \

### Use Case #3: Your application specifies the specific Node version 

Condition: If your package.json file specifies a specific version, especially as that version starts to age \

Example in package.json
```
"engines": {
  "node":  "8.16.0"
}
```
Change: Those older Node.js versions will no longer be auto-downloaded once the default switch to Open Source Node.js buildpack \
 &nbsp;&nbsp;&nbsp;&nbsp; Phase 1: You can continue to specify the IBM buildpack "sdk-for-nodejs" in your deployment CLI \
 &nbsp;&nbsp;&nbsp;&nbsp; Phase 2: You can no longer specify the IBM buildpack - you can specify an older Node version if you really need to, but you'll need to use the [Git URL with a branch or tag](#Git-URL-with-a-branch-or-tag) method. \

