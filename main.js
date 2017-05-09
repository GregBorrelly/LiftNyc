angular.module('nycLift').controller('mainCtrl', function ($scope) {

    $scope.myFilter = function (post) {
        var isMatch = false;

        if ($scope.inputText) {
            var parts = $scope.inputText.split(' ');

            parts.forEach(function (part) {
                if (new RegExp(part).test(post)) {
                    isMatch = true;
                }
            });
        } else {
            isMatch = true;
        }

        return isMatch;
    };


    function get(url) {
        return new Promise(function (succeed, fail) {
            var req = new XMLHttpRequest();
            req.open("GET", url, true);
            req.addEventListener("load", function () {

                if (req.status < 400)
                    succeed(JSON.parse(req.responseText));

                else
                    fail(new Error("Request FAiled: " + req.statusText));
            });
            req.addEventListener("error", function () {
                fail(new Error("Network error"));
            });
            req.send(null);
        });
    }


    $scope.initialize = function () {


        get('https://data.cityofnewyork.us/resource/ujkp-2x99.json').then(function (responseText) {

            $scope.$apply(function () {

                console.log(responseText.length);
                $scope.data = responseText;

            });


        });
    };


});