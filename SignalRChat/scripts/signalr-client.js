(function () {

    'use strict';

    
    define([
        "jquery",
        "./string",
        "./resources",
        "./signalr-server"
    ], main);

    function main (
        $,
        string,
        resources,
        ChatServer
    ) {

        var chatHub = $.connection.chatHub.client;
        
        return {
            initializeClient: initializeClient
        };

        function initializeClient(controls) {

            chatHub.emitChatMessage = function (message) {
                var messageHtml = resources.strings.msgHtml;
                var formattedHtml = string.format(messageHtml, message.SendTime, message.UserName, message.Content);
                controls.messagesReceived.append(formattedHtml);
                controls.tbChatInput.val("").focus();
            };

            chatHub.emitRegisterUser = function (user) {
                var existingUser = controls.userList.find(string.format("[data-unique-id='{0}']", user.uniqueId));
                if (!existingUser.length) {
                    var userHtml = resources.strings.userHtml;
                    var formattedHtml = string.format(userHtml, user.userName, user.uniqueId);
                    controls.userList.append(formattedHtml);
                }
            };

            chatHub.emitUserDisconnect = function(uniqueId) {
                var user = controls.userList.find(string.format("[data-unique-id='{0}']", uniqueId));
                user.remove();
            };

            chatHub.updateRegistration = function() {
                ChatServer.indicatePresence(controls.tbUserName.val().trim());
            };

        }

    }

})();
