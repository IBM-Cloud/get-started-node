# IBM Cloud Node.js Application Deployment Options

## Overview

In 2021 we [announced a change](http://ibm.biz/cf-buildpack-node-change) to the deployment of Node.js applications in IBM Cloud Foundry. This README supports that announcement with some details behind the mechanics of deploying and using various types of Node.js buildpacks and Node.js engine versions.

## Technical Details

To assist in understanding how to change between Node.js buildpacks, it's important to understand the concepts of **buildpack version** (which specific type and version of buildpack to use) and **Node.js engine version** (which version of the Node.js engine that will be used by your application when it runs). 

You can start by using the command `ibmcloud cf buildpacks | grep -i node` to see which installed buildpacks are available to you in the IBM Cloud Foundry service. Note that it's also possible to even use a buildpack that's not installed and that will be covered later. 

During phase 1 of the change, the list of the Node.js buildpacks may show some with the name "sdk-for-nodejs" (these are the IBM Node.js buildpacks) and some with the name "nodejs_buildpack" (these are the Open Source Node.js buildpacks). Once phase 2 is reached, the "sdk-for-nodejs" name will become the Open Source Node.js buildpack as well, but this legacy name (previously IBM) will be retained for backward compatibility.


## How to control which buildpack is used and which Node.js engine version is used

When deploying your application, you need to use a buildpack that provides the Node.js engine version that your application can use. Therefore it's important to know how to control which buildpack is used, and how to specify which Node.js engine version we well. The very simplest case, that is sufficient for many users, is just to allow this to happen automatically with the latest versions installed into the IBM Cloud Foundry service. If your application is more sensitive to specific Node.js engine version though, you may wish to override this. Below is an explanation on the different options:

### Using the automatic default

If you do not choose to specify which buildpack you want, the system will use a default one. Note that the default is the first one in the list of the buildpacks command output. In this case the default buildpack will also choose a default Node.js engine version to run your application with. 

To use this approach, simply avoid using any of the manual overrides that are detailed below in the other options.

### Deploying with a specific buildpack

In some cases you may not want to use the default buildpack. Typically this is when you want the extra control on what is used. Below are multiple ways you can accomplish this. Note that this might be useful to users who are migrating between the IBM and Open Source buildpacks and need to control what happens, and we have more information about such scenarios further in this document.

#### Specify the buildpack name as part of the push command
This specifies a specific Node.js buildpack that is already installed on the Cloud Foundry server and that is shown in the output of the buildpacks command. You simply use the -b parameter on the push command. This for example will deploy using the sdk-for-nodejs buildpack, even if not the default option.
```
> ibmcloud cf push -b sdk-for-nodejs
```
#### Specify the buildpack URL as part of the push command (Git URL with a branch or tag)
You can also choose to deploy a buildpack version that is not installed into the system (is not in the output of the buildpacks command). This is done by specifying a URL to the buildpack version that you want to use. So if you are not yet ready to migrate to a newer buildpack, or you are having problems doing so, then you can use this approach to choose an older version for backward compatibility. 

Example: You want to use Open Source Node.js buildpack version v1.6.56 so the push command would be:
```
> ibmcloud cf push -b https://github.com/cloudfoundry/nodejs-buildpack.git#v1.6.56 
```

#### Specify the buildpack name or URL within the manifest file

As an alternative to using the push command line, you can instead specify the buildpack by name or URL inside the manifest file instead as described in [App Manifest Attribute Reference] (https://docs.cloudfoundry.org/devguide/deploy-apps/manifest-attributes.html#buildpack).


## Migration scenarios

As phase 1 and phase 2 of the migration from IBM to Open Source Node.js buildpacks processed, you may need to make adjustments depending on how you deploy your Node.js applications in IBM Cloud Foundry, and they may be different in each phase. The above information provided general information on how you can accomplish control on what Node.js buildpacks are used, and which Node.js engines they in turn support. Below is some information on how you can use that knowledge to tackle some migration scenarios.

### Use Case #1: Your application doesn't specify Node.js version or buildpack

Method: The application specifies no buildpack version or Node.js version \
Change: No change is typically needed since you are using the automatic default approach, and your application will continue to deploy using the default Node.js buildpack. The only exception to this is if your application for some reason stopped working as the default version changes over time, in which case you would typically update the application to be compatible with the newer versions.

### Use Case #2: Your application specifies the IBM Node buildpack name but no Node.js engine version

Method: The application specifies the IBM Node.js buildpack "sdk-for-nodejs" \
Change: \
&nbsp;&nbsp;&nbsp;&nbsp; Phase 1: You can continue to specify the IBM buildpack "sdk-for-nodejs" but you will be getting the IBM version still \
&nbsp;&nbsp;&nbsp;&nbsp; Phase 2: You can continue to specify this name but it will now point to the Open Source Node.js buildpack instead. We will retain the naming support simply for this backward compatibility scenario.

### Use Case #3: Your application specifies the Node.js engine version 

Method: If your package.json file specifies a specific Node.js version, you may encounter changes as the phase 1 and phase 2 migration from IBM to Open Source Node.js buildpack proceeds.

Example in package.json
```
"engines": {
  "node":  "8.16.0"
}
```
Change: The IBM Node.js buildpack has a feature to automatically download older Node.js engine versions. The Open Source Node.js buildpack does not do this and instead requires you to use and older version of the buildpack if you want older Node.js engine support. Therefore as we switch from the IBM Node.js buildpack to the Open Source Node.js buildpack in phase 1 and phase 2, you may have to change your deployment technique to match because those older Node.js engine versions will no longer be auto-downloaded \
 &nbsp;&nbsp;&nbsp;&nbsp; Phase 1: The simplest option is that you can continue to use the IBM buildpack "sdk-for-nodejs" in your deployment by using one of the specific buildpack techniques that we described earlier. For example you could update your push command to use "-b sdk-for-nodejs". However please note this is just a quick temporary solution that will only succeed during phase 1. It's recommended that you instead tackle the phase 2 approach as soon as possible \
 &nbsp;&nbsp;&nbsp;&nbsp; Phase 2: In phase 2, the IBM buildpack will no longer be available. In this case you must start using the new approach of using a specific version of the Open Source buildpack that provides your specific Node.js engine. This is easily done though as this example shows:

Example: Your application specifies Node.js engine version 8.16.0 in the package.json, which is older than the installed Open Source Node.js buildpack provdes. Therefore you need to specify an older version of the Open Source Node.js buildpack manually, to get the older 8.16.0 engine support.
 
In this case you need to find the exact version of Open Source Node.js buildpack that does provide the Node.js 8.16.0 engine version, and then specify it manually as a Git URL during your push command (or in manifest file if you prefer to use manifest files). You can do this by finding the Node.js buildpack release that provides the Node.js engine version by looking at the [release notes](https://github.com/cloudfoundry/nodejs-buildpack/releases).

Studying those release notes reveals that Node.js engine version 8.16.0 was provided in Open Source Node.js buildpack v1.6.56  - so the Git link for that would be https://github.com/cloudfoundry/nodejs-buildpack.git#v1.6.56.
Simply add that version of the Node.js buildpack on the command line (and keep the Node.js 8.16.0 engine version in your package.json file) and you're set to deploy and build.

Example push command:
```
> ibmcloud cf push -b https://github.com/cloudfoundry/nodejs-buildpack.git#v1.6.56 
```
with package.json:
```
"engines": {
  "node":  "8.16.0"
}
```
