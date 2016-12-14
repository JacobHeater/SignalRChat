(function () {

    'use strict';

    define([
        'jquery'
    ], main);


    function main(
        $
    ) {

        var chatHub = $.connection.chatHub.server;

        return {
            sendChatMessage: sendChatMessage,
            registerUser: registerUser
        };

        function registerUser(userName) {
            chatHub.registerUser(userName);
        }

        function sendChatMessage(messageModel) {
            chatHub.chatMessage(messageModel);
        }

    }

})();