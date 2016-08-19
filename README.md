# Veery Notification SDK development guide

### How to
## Initiate module

    var configOptions =
    {

        URL:"http://127.0.0.1:8089",
        Callbacks:
        {
            onDisconnected:onDisconnected,
            onMessageReceived:onMessageReceived,
            onAgentFound:onAgentFound,
            onAgentConnected:onAgentConnected,
            onAgentDisconnected:onAgentDisconnected,
            onClientdetailsRecieved:onClientdetailsRecieved,
            onAgentRejected:onAgentRejected,
            onConferenceCreate:onConferenceCreate,
            onConferenceDestroy:onConferenceDestroy,
            onConferenceMemberJoined:onConferenceMemberJoined,
            onConferenceMemberLeft:onConferenceMemberLeft,
            ConferenceMemberStatus:ConferenceMemberStatus,
        },
        jwt:token
    };

#### URL :-
Destination URL of desired Notification Server
#### Callbacks :-
These properties are custom properties and working as event catchers. Those methods should be initiated in client's end.
Developer can add customized properties to catch various events returning from server.

Ex:-

       function  onAgentFound(data)
          {
               // Do something here
          };
        function  onAgentConnected(data)
          {
                // Do something here
          };

#### token :-
 Security token valid with JWT

#### Initiate function
     ClientConfiguration(configOptions, token);
