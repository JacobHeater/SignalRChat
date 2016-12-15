(function () {

    'use strict';

    define(function () {
        return {
            format: format
        };
    });

    function format() {
        if (arguments.length > 0) {
            var string = arguments[0];

            if (typeof string === 'string') {
                for (var i = 1; i < arguments.length; i++) {
                    string = string.replace(new RegExp("\\{" + (i - 1) + "\\}", "g"), arguments[i]);
                }
            }

            return string;
        }
        return "";
    }

})();