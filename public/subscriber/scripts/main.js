
function subscribe(){
    var iabUuid = document.getElementById("iabUuid").value;
    var iabTopic = document.getElementById("iabTopic").value;
    console.log('Subscribig to ' + iabUuid + ' and ' + iabTopic);
    fin.InterApplicationBus.subscribe({ uuid: iabUuid }, iabTopic, sub_msg => document.getElementById("iabMessage").innerHTML = sub_msg)
    .then(() => console.log('Subscribed to ' + iabTopic))
    .catch(err => console.log(err));
};

/*
    Generic Helper code
*/
document.addEventListener('DOMContentLoaded', () => {
    onMain();
});

function minimizeWindow(){
    var finWindow = fin.Window.getCurrentSync();
    finWindow.minimize().then(() => console.log('Window Minimized')).catch(err => console.log(err));
};

function restoreWindow(){
    var finWindow = fin.Window.getCurrentSync();
    finWindow.restore().then(() => console.log('Window Restored')).catch(err => console.log(err));
};

function maximizeWindow(){
    var finWindow = fin.Window.getCurrentSync();
    finWindow.maximize().then(() => console.log('Window Maximized')).catch(err => console.log(err));
};

function closeWindow(){
    var finWindow = fin.Window.getCurrentSync();
    finWindow.close().then(() => console.log('Window closed')).catch(err => console.log(err));
};

function openChildWindow(){
    var serverPort;
    fin.Window.getCurrentSync().getOptions()
    .then(opts => {
        serverPort = opts.customData;
        console.log("Server Port: " + serverPort);
        url = "http://localhost:" + serverPort +"/child.html"
        console.log(url);
        const winOption = {
            name:'child',
            defaultWidth: 300,
            defaultHeight: 300,
            saveWindowState : false,
            waitForPageLoad : false,
            opacity : .5,
            url: url,
            frame: false,
            autoShow: true
        };
    
        fin.Window.create(winOption).then(
            console.log("window created")
        );
    }).catch(err => console.log(err));
};

function onMain() {
    console.log("on main 1");
    fin.Window.getCurrentSync().getOptions().then(opts => {
        console.log("test");
        console.log(opts);
        serverPort = opts.customData;
        console.log("Server Port: " + serverPort);
        document.getElementById("title").innerHTML = "IAB Publisher (UUID: " + opts.uuid + ")";
    }).catch(err => console.log(err));
};

