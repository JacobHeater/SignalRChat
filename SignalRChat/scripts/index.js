(function () {

    'use strict';

    require.config({
        baseUrl: "scripts",
        paths: {
            jquery: "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.2/require.min.js"
        }
    });

    require([
        "./chat"
    ], main);


    function main(
        Chat 
    ) {
        Chat();
    }

})();