(function () {

    'use strict';


    define([
        'jquery',
        './models/Message',
        './signalr-client',
        './signalr-server'
    ], main);

    function main (
        $,
        MessageModel,
        ChatClient,
        ChatServer
    ) {

        return Chat;

        function Chat() {

            $.connection.hub.start();

            var tbUserName = $('#tbUserName');
            var btnDoneUserName = $('#btnDoneUserName');
            var tbChatInput = $('#tbChatInput');
            var btnSendMessage = $('#btnSendMessage');
            var messagesReceived = $('#messagesReceived');
            var userList = $(".user-list .users");
            var ATTR_NAME_DISABLED = "disabled";

            tbChatInput.attr(ATTR_NAME_DISABLED, true);
            btnSendMessage.attr(ATTR_NAME_DISABLED, true);

            btnDoneUserName.click(function () {
                if (tbUserName.val().trim()) {
                    tbUserName.attr(ATTR_NAME_DISABLED, true);
                    tbChatInput.attr(ATTR_NAME_DISABLED, false);
                    btnSendMessage.attr(ATTR_NAME_DISABLED, false);
                    $(this).attr(ATTR_NAME_DISABLED, true);

                    ChatServer.registerUser(tbUserName.val().trim());
                } else {
                    alert("You must enter a user name to begin chat.");
                }
            });

            btnSendMessage.click(function () {
                if (tbChatInput.val().trim()) {
                    var message = MessageModel.create({
                        UserName: tbUserName.val().trim(),
                        Content: tbChatInput.val()
                    });

                    ChatServer.sendChatMessage(message);
                }
            });

            ChatClient.initializeClient({
                messagesReceived: messagesReceived,
                userList: userList,
                tbChatInput: tbChatInput
            });

        }

    }

})();