# IBM Cloud Kubernetes Serviceにデプロイする

このアプリケーションをKubernetesクラスターにデプロイし、Cloudantデータベースに接続するには、以下の指示に従ってください。

## ダウンロード

```bash
git clone https://github.com/IBM-Cloud/get-started-node
cd get-started-node
```

## Docker イメージのビルド

1. `ibmcloud cr 名前空間` を実行して、コンテナレジストリ名前空間を検索します。名前空間をリストする場合は `ibmcloud cr namespace-list` を実行してください。
名前空間が存在しない場合は、`ibmcloud cr namespace-add <name>`を使用して作成します。

2. `ibmcloud cr info` を実行して、**Container Registry** を特定します。

3. REGISTRYとNAMESPACEを適切な値に置き換えて、以下のコマンドを実行して、Dockerイメージを(`-t`)タグ付けしてビルドします。
   ```sh
   docker build . -t <REGISTRY>/<NAMESPACE>/myapp:v1.0.0
   ```
 例: `docker build . -t us.icr.io/mynamespace/myapp:v1.0.0`

4. DockerイメージをIBM Cloudのコンテナレジストリにプッシュします。

   ```sh
   docker push <REGISTRY>/<NAMESPACE>/myapp:v1.0.0
   ```

## IBM Cloudへのデプロイ

#### Kubernetesクラスタの作成

1. [IBM CloudでCloud Foundryクラスタを作成する (リンク先は英語)](https://console.bluemix.net/docs/containers/container_index.html#clusters)。
2. アクセスタブの指示に従って `kubectl` cliをセットアップします。

#### Cloudant Database の作成

1. IBM Cloudダッシュボード画面の [カタログ](https://cloud.ibm.com/catalog) にアクセスして、 [Cloudant](https://cloud.ibm.com/catalog/services/cloudant) を新しく作成します。

2. **Available authentication methods(利用可能な認証方法)** にて `Use both legacy credentials and IAM (従来の認証情報とIAMの両方を使用する)` を**選択**する。

3. **サービス資格情報**から**新規資格情報**を選択して作成し、urlフィールドの値をコピーします。

4. Cloudant資格情報を使用してKubernetesシークレットを作成します。

```bash
kubectl create secret generic cloudant --from-literal=url=<URL>
```
例:
```bash
kubectl create secret generic cloudant --from-literal=url=https://username:passw0rdf@username-bluemix.cloudant.com
```

#### デプロイ情報を作成する

1. `<REGISTRY>` と `<NAMESPACE>` を `kubernetes/deployment.yaml` の適切な値に置き換えます
2. デプロイ情報を作成します:
  ```shell
  kubectl create -f kubernetes/deployment.yaml
  ```
- **有料 Cluster**: 外部IPとロードバランサーを使用してサービスを公開します。
  ```
  kubectl expose deployment get-started-node --type LoadBalancer --port 8080 --target-port 8080
  ```

- **無料 Cluster**: Worker IPとNodePortを使用します。
  ```bash
  kubectl expose deployment get-started-node --type NodePort --port 8080 --target-port 8080
  ```

### アプリケーションへのアクセス

ポッドの **ステータス** が`実行中`であることを確認します。

```shell
kubectl get pods -l app=get-started-node
```

**標準 (有料) Cluster:**

1. `kubectl get service get-started-node` を使用してLoadBalancer Ingress IPを特定します。
2. `http://<EXTERNAL-IP>:8080/` にアクセスします。

**無料 Cluster:**

1. `ibmcloud cs workers YOUR_CLUSTER_NAME` を使用してWorker Public IPを特定します。
2. `kubectl describe service get-started-node` を使用してNode Portを識別します。
3. `http://<WORKER-PUBLIC-IP>:<NODE-PORT>/` でアプリケーションにアクセスします。

## クリーンアップ
```bash
kubectl delete deployment,service -l app=get-started-node
kubectl delete secret cloudant
```
