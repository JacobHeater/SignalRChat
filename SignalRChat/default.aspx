<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="SignalRChat._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>SignalR Chat Example</title>
    <meta charset="utf-8" />
    <link href="styles/index.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
    <div>

        <div class="user-list">
            <div class="users"></div>
        </div>
    
        <div class="chat-main">

            <div class="user-name-container">
                <input type="text" id="tbUserName" placeholder="Enter user name" />
                <input type="button" id="btnDoneUserName" value="Done" />
            </div>

            <div class="messaging-container">
                <div class="message-input-container">
                    <textarea id="tbChatInput" placeholder="Enter your chat message"></textarea>
                    <br />
                    <input type="button" id="btnSendMessage" value="Send" />
                </div>

                <div class="message-receive-container">
                    <div id="messagesReceived"></div>
                </div>
            </div>

        </div>

    </div>
    </form>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.2/require.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="<%= ResolveClientUrl("~/scripts/jquery.signalR-2.2.1.min.js") %>"></script>
    <script src="<%= ResolveClientUrl("~/signalr/hubs") %>"></script>
    <script src="<%= ResolveClientUrl("~/scripts/index.js") %>"></script>
</body>
</html>
