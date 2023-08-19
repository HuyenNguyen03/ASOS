var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http) {
    $scope.products = [];
    $http.get("js/test.json").then(function (response) {
        $scope.Emp = response.data;
    }, function (response) {
        alert("lỗi");
    });

});