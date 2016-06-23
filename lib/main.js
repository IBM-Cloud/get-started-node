var port, Q, Server, appEnv, cfEnv, couchDB, express, getCloudant, http, ports, todoDB, tx, DatabaseURL, DatabaseName;
http = require("http");
Q = require("q");
ports = require("ports");
express = require("express");
cfEnv = require("cfenv");
couchDB = require("./couch-db");
tx = require("./tx");
todoDB = null;
port = process.env.VCAP_APP_PORT || 8080;
DatabaseName = "todo-couch-db";
localDB = "http://127.0.0.1:5984";



appEnv = cfEnv.getAppEnv({

});

process.on("exit", function(status) {
  return log("process exiting with Error status  " + status);
});

exports.start = function(options) {
  var couchURL;
  if (options.db === "cloudant") {
    couchURL = getCloudant();
    return couchDB.init(couchURL).fail(function(err) {

      return logError(err);
    }).then(function(todoDB_) {
      var server;
      todoDB = todoDB_;
      server = new Server(options);
      return server.start();
    }).done();
  }
};

getCloudant = function()
{
  var endsInSlash, length, url;


  //< This is only needed for when running the app locally, if app is running then it will take the URL database details and when pushed to Bluemix then it will take VCAP below>
  DatabaseURL = "< Add your Cloudant database URL >";


  // ===== START ===== VCAP - For when pushing the code to Bluemix - Note here we are not hard coding any database credentials. This is best practice for when pushing apps to Bluemix
  url = appEnv.getServiceURL(DatabaseName,
      {
        pathname: "database",
        auth: ["username", "password"]
      });
  // ===== FINISH =====




  url = url || DatabaseURL;
  //url = url || localDB;
  length = url.length - 1;
  endsInSlash = url.indexOf('/', length);
  if (endsInSlash === -1) {
    url = url + '/';
  }
  url = url + 'todo-couch-db';
  return url;
};


Server = (function()
{
  function Server(options) {
    if (options == null) {
      options = {};
    }
    if (options.port == null) {
      options.port = appEnv.port;
    }
    if (options.verbose == null) {
      options.verbose = false;
    }
    this.port = options.port, this.verbose = options.verbose;
  }

  Server.prototype.start = function() {
    var app, deferred;
    deferred = Q.defer();
    app = express();
    app.use(express["static"]("views"));
    app.use(express.json());


    app.use(function(req, res, next) {
      req.tx = tx.tx(req, res, todoDB);
      return next();
    });
    app.get("/api/todos", (function(_this) {
      return function(req, res) {
        return req.tx.search();
      };
    })(this));
    app.post("/api/todos", (function(_this) {
      return function(req, res) {
        return req.tx.create();
      };
    })(this));
    app.get("/api/todos/:id", (function(_this) {
      return function(req, res) {
        return req.tx.read();
      };
    })(this));
    app.put("/api/todos/:id", (function(_this) {
      return function(req, res) {
        return req.tx.update();
      };
    })(this));
    app["delete"]("/api/todos/:id", (function(_this) {
      return function(req, res) {
        return req.tx["delete"]();
      };
    })(this));

    app.listen(port, appEnv.bind, (function(_this) {
      return function() {

        // print a message when the server starts listening
        console.log("To view your app, open this link in your browser: http://localhost:" + port);
        return deferred.resolve(_this);
      };
    })(this));

    return deferred.promise;
  };

  return Server;

})();