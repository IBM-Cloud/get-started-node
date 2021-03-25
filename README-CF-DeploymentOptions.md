# Cloud Foundry Deployment Options

## Overview

In 2021 we [announced a change](http://ibm.biz/cf-buildpack-node-change) to the deployment of Node applications in IBM Cloud Foundry. This README supports that announcement with some details behind the mechanics of deploying using various types of node buildpacks and node runtime versions.


## Technical Details

In IBM Cloud Foundry, the Node.js buildpack version types have different names:  "sdk-for-nodejs" for the IBM buildpack and "nodejs_buildpack" for the Open Source buildpack.

You can see these using `ibmcloud cf buildpacks | grep -i node`.

Two buildpack related details can optionally be specified when deploying Node applications.

* a version type of the buildpack to use (listed above) - this can be specified on the CLI
* a specific version of the Node.js engine - this can only be specified in the package.json file

## Deployment Examples

It is possible to deploy with specific buildpack information in several ways.

### Deploying a specific buildpack type

#### CLI Deployment
```
> ibmcloud cf  push -b sdk-for-nodejs
```
#### Git URL with a branch or tag
If you still want older hard coded versions of the Open Source Node.js buildpack, you can specify them on your deployment command line, even after Phase 2 is complete.  
Find the node.js buildpack release that contains the runtime version you need in the Node.js buidpack [release notes](https://github.com/cloudfoundry/nodejs-buildpack/releases) and specify the release on the cf push.  

You will need to know the exact runtime version you want, and what version of Node buildpack has that Node version. You can research that in the Node-buildpack-releases and append the release number to the command. 
Example: You want Node version 8.16.0 that exists in Node buildpack v1.6.56  - so the pointer for that would be https://github.com/cloudfoundry/nodejs-buildpack.git#v1.6.56.
Specify the version of the Node.js buildpack on the command line and the version in the runtime in your package.json file, and you're set to deploy and build.

Example
```
> ibmcloud push -b https://github.com/cloudfoundry/nodejs-buildpack.git#v1.6.56 
```
## Deployment Use Cases

You may need to make adjustments depending on how you deploy your Node applications in IBM Cloud Foundry, and they may be different in each phase.

### Use Case #1: Your application doesn't specify Node version type

Method: The application specifies no buildpack version type or Node version \
Change: No change needed \
Result: It deploys with the default Node version type in the system 

### Use Case #2: Your application specifies in the IBM Node buildpack type specifically

Condition: The application specifies the node version type (listed above) \
Change: \
&nbsp;&nbsp;&nbsp;&nbsp; Phase 1: You can continue to specify the IBM version "sdk-for-nodejs" \
&nbsp;&nbsp;&nbsp;&nbsp; Phase 2: You can no longer specify the IBM version. \
Result: Your application deploys properly 

### Use Case #3: Your application specifies the specific Node version 

Condition: If your package.json file specifies a specific version, especially as that version starts to age \

Example: 
```
"engines": {
  "node":  "8.16.0"
}
```
Change: Those older versions will no longer be auto-downloaded once we switch over to the Open Source Node.js buildpack \
 &nbsp;&nbsp;&nbsp;&nbsp; Phase 1: You can continue to specify the IBM version "sdk-for-nodejs" in your deployment CLI \
 &nbsp;&nbsp;&nbsp;&nbsp; Phase 2: You can no longer specify the IBM version - you can specify an older Node version if you really need to, but you'll need to use the [Git URL with a branch or tag](#Git-URL-with-a-branch-or-tag) method. \
Result: Your application deploys properly 

## Deployment Changes

If you specify an older version of the Node buildpack, or an included sub-package depends on an older version, in Phase 2 you will have to have made the changes to support the new versions.
