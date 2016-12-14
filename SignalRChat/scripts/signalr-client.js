(function () {

    'use strict';

    
    define([
        "jquery"
    ], main);

    function main (
        $
    ) {

        var chatHub = $.connection.chatHub.client;
        
        return {
            initializeClient: initializeClient
        };

        function initializeClient(controls) {

            chatHub.emitChatMessage = function (message) {
                controls.messagesReceived.append("<div>" + message.Content + "</div>");
                controls.tbChatInput.val("");
            };

            chatHub.emitRegisterUser = function (userName) {
                controls.userList.append("<div>" + userName + "</div>");
            };

        }

    }

})();
