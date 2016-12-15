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
            registerUser: registerUser,
            queryUsers: queryUsers,
            indicatePresence: indicatePresence
        };

        function registerUser(userName) {
            return chatHub.registerUser(userName);
        }

        function sendChatMessage(messageModel) {
            return chatHub.chatMessage(messageModel);
        }

        function queryUsers() {
            return chatHub.queryUsers();
        }

        function indicatePresence(userName) {
            return chatHub.indicatePresence(userName);
        }

    }

})();