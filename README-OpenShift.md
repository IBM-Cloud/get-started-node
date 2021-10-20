# Deploy to Red Hat OpenShift on IBM Cloud

Follow these instructions to deploy this application to Red Hat OpenShift and connect it with a Cloudant database.

## Create an OpenShift cluster

1. If you don't have one already, [create an OpenShift cluster on the IBM Cloud](https://cloud.ibm.com/docs/openshift?topic=openshift-getting-started#vpc-gen2-gs).
2. Follow the instructions in [Installing the OpenShift CLI](https://cloud.ibm.com/docs/openshift?topic=openshift-openshift-cli) to set up your `oc` CLI.
3. Choose (and if necessary create) a namespace for the application

## Create a Cloudant Database

1. Go to the [Catalog](https://console.bluemix.net/catalog/) and create a new [Cloudant](https://console.bluemix.net/catalog/services/cloudant-nosql-db) database instance.

2. Choose `IAM` for **Authentication**.

3. Create new credentials under **Service Credentials** and copy value of the **url** field.

4. Create a Kubernetes secret with your Cloudant credentials.

```shell
oc create secret generic cloudant --from-literal=url=<URL> --from-literal=iamApiKey=<IAM_API_KEY>
```

Example:

```shell
oc create secret generic cloudant --from-literal=url=https://xxxxx-yyyy-zzz-eeeee-ddddddd-bluemix.cloudantnosqldb.appdomain.cloud --from-literal=iamApiKey=xxxxxx-ddd-ppppppppppp
```

## Build and deploy the application direct from it's source in github

1. Build and deploy the application from source:
  
```shell
oc new-app https://github.com/IBM-Cloud/get-started-node --strategy=source --env PORT=8080
```

You should see both a build pod and then an application pod appear, which you can check using:

```shell
oc get pods
```

2. Once the application is running, you then need to patch the deployment to ensure that the cloudant secret is exposed to the application via environment variables:

```shell
oc patch deployment get-started-node --type "json" -p \
  '[{"op":"add","path":"/spec/template/spec/containers/0/env/-","value":{"name":"CLOUDANT_URL","valueFrom":{"secretKeyRef":{"key":"url","name":"cloudant","optional":true}}}},{"op":"add","path":"/spec/template/spec/containers/0/env/-","value":{"name":"CLOUDANT_IAM_API_KEY","valueFrom":{"secretKeyRef":{"key":"iamApiKey","name":"cloudant","optional":true}}}}]'
```

You should see the applicaiton pod re-start.

3. Expose a route to the application:

```shell
oc expose svc/get-started-node
```

## Access the application

1. Identify the route to the application `oc get route get-started-node`
2. Access your application via the HTTP URL given in the HOST/PORT column, which will be of the form `get-started-node-.....containers.appdomain.cloud`.

## Clean Up

If, and when, you want to remove the application:

```shell
oc delete deployment,route,service,buildconfig,imagestream -l app=get-started-node
oc delete secret cloudant
```
