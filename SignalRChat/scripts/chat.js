(function () {

    'use strict';


    define([
        'jquery',
        './models/Message',
        './signalr-client',
        './signalr-server',
        './query-string'
    ], main);

    function main(
        $,
        MessageModel,
        ChatClient,
        ChatServer,
        QueryString
    ) {

        return Chat;

        function Chat() {

            var KEY_CODE_ENTER = 13;
            var KEY_CODE_CTRL = 17;
            var uniqueId = Math.random().toString() + new Date().toJSON();

            QueryString.set("unique-id", uniqueId);

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

                    ChatServer.registerUser(tbUserName.val().trim(), false);
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
                tbChatInput: tbChatInput,
                tbUserName: tbUserName
            });

            tbUserName
                .keydown(function (e) {
                    if (e.which === KEY_CODE_ENTER) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        return false;
                    }
                })
                .keyup(function (e) {
                    if (e.which === KEY_CODE_ENTER) {
                        btnDoneUserName.click();
                        e.preventDefault();
                        return false;
                    }
                });


            var chatInputKeys = [];
            tbChatInput.keydown(function (e) {
                if (chatInputKeys.indexOf(e.which) === -1) {
                    chatInputKeys.push(e.which);
                }

                if (chatInputKeys.length === 2 && chatInputKeys.indexOf(KEY_CODE_ENTER) > -1 && chatInputKeys.indexOf(KEY_CODE_CTRL) > -1) {
                    btnSendMessage.click();
                }

            }).keyup(function (e) {
                var matchKeyIndex = chatInputKeys.indexOf(e.which);

                if (matchKeyIndex) {
                    chatInputKeys.splice(matchKeyIndex, 1);
                }
            }).on('blur focus', function () {
                chatInputKeys.length = 0;
            });

            $.connection.hub.start().then(function () {
                ChatServer.queryUsers();
            });

        }

    }

})();