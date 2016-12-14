(function () {

    'use strict';

    
    define(function () {

        function Message() {

        }

        Message.create = function (message) {
            if (message !== null && typeof message === 'object') {
                return Object.assign(new this(), message);
            }
            return new this();
        };

        Message.prototype.UserName = "";
        Message.prototype.Content = "";
        Message.prototype.SendTime = null;

        
        return Message;

    });

})();