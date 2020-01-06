var openfinLauncher = require('hadouken-js-adapter');
var portfinder = require('portfinder');
var express = require('express');
var path = require('path');
var app = express();
var target;
var serverPort;

app.use(express.static(__dirname + '/public'));

portfinder.getPortPromise().then((port) => {
    serverPort = port;
    target = "http://localhost:" + port;
    app.listen(port, () =>{ 
        console.log("Server started at: " + target);
        openfinLauncher.launch({manifestUrl: target + "/app.json?manifest=" + encodeURI(JSON.stringify(buildManifest()))});
    });
    console.log("Port: " + serverPort)
    
}).catch((err) => {
    console.log("Unable to discover a free port: " + err);
    console.log("-- Exiting --");
});

// Express Routes
app.get('/app.json', (req, res) => {
    var manifest = JSON.parse(req.query.manifest);
    console.log("Serving Manifest:");
    console.log(manifest)
    res.send(manifest);
});

app.get('/index.html', (req, res) => {
    index = path.resolve("./public/app/index.html");
    res.sendFile(index);
});

app.get('/child.html', (req, res) => {
    index = path.resolve("./public/app/child.html");
    res.sendFile(index);
});


app.get('/favicon.ico', (req, res) => {
    icon = path.resolve("./public/app/favicon.ico");
    res.sendFile(icon );
});

app.get('/minimize.svg', (req, res) => {
    icon = path.resolve("./public/app/shared/images/minimize.svg");
    res.sendFile(icon);
});

app.get('/close-x.svg', (req, res) => {
    icon = path.resolve("./public/app/shared/images/close-x.svg");
    res.sendFile(icon);
});

app.get('/maximize.svg', (req, res) => {
    icon = path.resolve("./public/app/shared/images/maximize.svg");
    res.sendFile(icon);
});

app.get('/restore.svg', (req, res) => {
    icon = path.resolve("./public/app/shared/images/restore.svg");
    res.sendFile(icon);
});

function buildManifest(){
    var manifest = require("./public/app/config/app.json");
    manifest.startup_app.applicationIcon = target + "/favicon";
    manifest.startup_app.url = target + "/index.html";
    manifest.shortcut.icon = target + "/favicon";
    manifest.startup_app.preloadScripts = [{url: target + "/preload.js"}];
    manifest.startup_app.customData = serverPort;
    manifest.shortcut.icon = target = "/favicon"
    return JSON.stringify(manifest);
};