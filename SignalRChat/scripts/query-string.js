(function () {

    'use strict';


    define([
        "jquery"
    ], main);

    function main(
        $
    ) {

        return  {
            set: set,
            remove: remove,
            get: get
        };


        function set(key, value) {
            $.connection.hub.qs = $.connection.hub.qs || {};

            $.connection.hub.qs[key] = value;
        }

        function remove(key) {
            delete $.connection.hub[key];
        }

        function get(key) {
            return $.connection.hub.qs[key];
        }

    }

})();