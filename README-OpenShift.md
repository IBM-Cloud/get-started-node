# Deploy to Red Hat OpenShift on IBM Cloud

Follow these instructions to deploy this application to Red Hat OpenShift and connect it with a Cloudant database.

## Download

```shell
git clone https://github.com/IBM-Cloud/get-started-node
cd get-started-node
```

## Build Docker Image

1. Find your container registry **namespace** by running `ibmcloud cr namespaces`. If you don't have any, create one using `ibmcloud cr namespace-add <name>`

2. Identify your **Container Registry** by running `ibmcloud cr info` (Ex: registry.ng.bluemix.net)

3. Build and tag (`-t`)the docker image by running the command below replacing REGISTRY and NAMESPACE with he appropriate values.

   ```shell
   docker build . -t <REGISTRY>/<NAMESPACE>/myapp:v1.1.0
   ```

   Example: `docker build . -t registry.ng.bluemix.net/mynamespace/myapp:v1.1.0`

4. Push the docker image to your Container Registry on IBM Cloud

   ```shell
   docker push <REGISTRY>/<NAMESPACE>/myapp:v1.1.0
   ```

## Deploy

### Create an OpenShift cluster

1. [Creating a VPC cluster](https://cloud.ibm.com/docs/openshift?topic=openshift-getting-started#vpc-gen2-gs).
2. Follow the instructions in [Installing the OpenShift CLI](https://cloud.ibm.com/docs/openshift?topic=openshift-openshift-cli) to set up your `oc` CLI.

### Create a Cloudant Database

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

### Create the deployment

1. Replace `<REGISTRY>` and `<NAMESPACE>` with the appropriate values in `kubernetes/deployment.yaml`
2. Create a deployment:
  
  ```shell
  oc create -f kubernetes/deployment.yaml
  ```

3. Expose the service using an External IP and Loadbalancer:

  ```shell
  oc expose deployment get-started-node --type LoadBalancer --port 8080 --target-port 8080
  ```

### Access the application

1. Verify **STATUS** of pod is `RUNNING`

```shell
oc get pods -l app=get-started-node
```

2. Identify your LoadBalancer Ingress IP using `oc get service get-started-node`
3. Access your application at `http://<EXTERNAL-IP>:8080/`

## Clean Up

```shell
oc delete deployment,service -l app=get-started-node
oc delete secret cloudant
```
