/**
 * Created by Pawan on 3/21/2016.
 */

var socketObj ={};
var socket;
var ClientID;
var io = require('socket.io-client');
var httpReq = require('request');
var util = require('util');

function ConfigClient (clientID,serverIp,serverPort,onDisconnected,onMessage,onBroadcastMessage,onPublishMessage)
{
    console.log("HIt");
    ClientID=clientID;
    var serverLoc= "http://"+serverIp+":"+serverPort;
    socket = io(serverLoc, { query: "myid="+clientID , 'forceNew': true, reconnect: false });

    socketObj.onDisconnected = onDisconnected;
    socketObj.onMessage = onMessage;
    socketObj.onBroadcastMessage = onBroadcastMessage;
    socketObj.onPublishMessage = onPublishMessage;


    socket.on('disconnect', function(reason)
    {
        socketObj.onDisconnected(reason);
    });

    socket.on('message', function(reason)
    {
        socketObj.onMessage(reason);
    });

    socket.on('broadcast', function(data){
        socketObj.onBroadcastMessage(data);
        //socket.disconnect();
    });

    socket.on('publish', function(data){
        socketObj.onPublishMessage(data);
        //socket.disconnect();
    });


    /*socketObj.onDisconnect=onDisconnect;
     socketObj.onMessage=onMessage;
     socketObj.onBroadcast=onBroadcast;
     socketObj.onPublish=onPublish;
     socketObj.onReply=onReply;


     socket.on('disconnect', function(reason)
     {
     //socketObj.onDisconnect(reason);
     if(reason != "io server disconnect")
     {
     console.log("Disconnecting "+reason +" Reconnecting");

     //socket = io(IP, { query: "myid="+clentID });
     //socket.connect();
     }
     else
     {
     console.log("Disconnect request from server.Disconnecting "+reason );
     //socket = io(IP, { query: "myid="+clentID });
     //socket.connect();
     }

     //
     });

     socket.on('message', function(data){
     //socket.disconnect();


     var rep="";
     var TopicKey=data.TopicKey;
     var Message=data.Message;
     var MsgObj="";
     var count=0;


     console.log('new message recieved from '+socket.id);
     console.log("Message "+Message);
     console.log('Message received Send Your reply : ');
     //socketObj.onMessage(data);



     });
     socket.on('broadcast', function(data){
     console.log(data);
     //socketObj.onBroadcast(data);
     //socket.disconnect();
     });
     socket.on('publish', function(data){
     console.log(data);
     //socketObj.onPublish(data);
     //socket.disconnect();
     });
     */

}

function SendReply(Message,topicKey)
{
    var msgObj={Message:Message,Tkey:topicKey};
    socket.emit('reply',msgObj);
};

function  SubscribeToEvent (queryObj,filterData,rangeData,callbackURL,callback)
{
    var msgObj= SubscribeDataObjectCreator(queryObj,filterData,rangeData,callbackURL);
    //socket.emit('subscribe',msgObj);
    var ServerIP="127.0.0.1:8080";
    var httpUrl = util.format('http://%s/DVP/API/%s/NotificationService/Notification/Subscribe/%s', ServerIP,"6.0",ClientID);
    var options = {
        url : httpUrl,
        method : 'POST',
        json : msgObj

    };

    httpReq(options, function (error, response, body)
    {
        if (!error && response.statusCode == 200)
        {
            console.log("no errrs in request 200 ok");
            //callback(undefined,response.statusCode);
            callback(undefined,response.statusCode);

        }
        else
        {
            console.log("errrs in request  "+error);
            callback(error,undefined);
            //callback(error,undefined);

        }
    });



};

function GetQueryData (callback)
{

}

function SubscribeDataObjectCreator (quaryObj,filterData,rangeData,callbackURL)
{
    var subObj =
    {
        Query : {
            QueryId:quaryObj.id,
            Query:quaryObj.Query,
            FilterBy:filterData,
            RangeBy:rangeData
        },
        RefId : "",
        CallbackURL:callbackURL
    };

    return subObj;
}

module.exports.ConfigClient = ConfigClient;
module.exports.SendReply = SendReply;
module.exports.SubscribeToEvent = SubscribeToEvent;