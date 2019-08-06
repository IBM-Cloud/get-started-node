# Node.js アプリケーション入門
Node.jsの入門チュートリアルでは、このサンプルアプリケーションを使用して、IBM CloudまたはIBM Cloud PrivateでNode.jsアプリを操作するためのサンプルワークフローを提供します。開発環境をセットアップし、アプリをローカルおよびクラウドにデプロイしてから、アプリにIBM Cloudデータベースサービスを統合します。

Node.jsアプリは、[Expressフレームワーク](https://expressjs.com)と[Cloudant noSQL DBサービス](https://cloud.ibm.com/catalog/services/cloudant)または[MongoDBサービス](http://mongodb.github.io/node-mongodb-native/)を使用して、データベースに情報を追加し、データベースからUIに情報を返します。アプリがCloudantに接続する方法の詳細については、Node.jsの[Cloudantライブラリ](https://www.npmjs.com/package/@cloudant/cloudant)を参照してください。

<p align="center">
  <img src="https://raw.githubusercontent.com/IBM-Cloud/get-started-java/master/docs/GettingStarted.gif" width="300" alt="Gif of the sample app contains a title that says, Welcome, a prompt asking the user to enter their name, and a list of the database contents which are the names Joe, Jane, and Bob. The user enters the name, Mary and the screen refreshes to display, Hello, Mary, I've added you to the database. The database contents listed are now Mary, Joe, Jane, and Bob.">
</p>

## 始める前に
[IBM Cloudアカウント](https://cloud.ibm.com/registration/free)、[Git](https://git-scm.com/downloads)、[Cloud Foundry CLI](https://github.com/cloudfoundry/cli#downloads)、および[Node](https://nodejs.org/en/)がインストールされている必要があります。 [IBM Cloud Private](https://www.ibm.com/jp-ja/cloud/private)を使用している場合、[IBM Cloud Private Cloud Foundry](https://www.ibm.com/support/knowledgecenter/ja/SSBS6K_2.1.0/cloud_foundry/overview.html)にアクセスする必要があります。

## 操作説明書

**IBM Cloud Cloud Foundry**: [README-kubernetes.md](README-kubernetes.md)
日本語のチュートリアルは、 [Node.jsのWebアプリ公開からCloudant NoSQL DB接続まで](https://qiita.com/ayatokura/items/d4f5b048ac8585428faf)


**IBM Cloud Kubernetes Service**: [Getting started tutorial for Node.js](https://console.bluemix.net/docs/runtimes/nodejs/getting-started.html)  
日本語のREADMEは、[README-kubernetes_jp.md](README-kubernetes_jp.md)

**IBM Cloud Private**: IBM Cloud Privateのスターター・アプリケーションは、同様のプロセスをガイドします。ただし、同じクラウド環境でサービスとアプリケーションの両方をホストする代わりに、ユーザー提供のサービスを使用します。このガイドでは、アプリケーションをIBM Cloud Privateにデプロイし、それをIBM CloudのCloudantデータベースにバインドする方法を示します。[Working with user-provided services and the Node.js starter app](https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0/cloud_foundry/buildpacks/buildpacks_using_nodejsapp.html)を参照してください。