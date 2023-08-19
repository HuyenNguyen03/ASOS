var indexCart = 0;
var app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/dsSP", {
            templateUrl: "Category.html",
            controller: "myCtrlCategory"
        })
        .when("/cart", {
            templateUrl: "cart.html",
            controller: "myCtrlCategory"
        })
        .when("/sign_join", {
            templateUrl: "join.html",
            controller: "myCtrlCategory"
        })
        .when("/chitiet/:ct", {
            templateUrl: "Product details.html",
            controller: "myCtrlCategory"
        })
        .otherwise({
            templateUrl: "contenthome.html",
            controller: "myCtrlCategory"
        });
})
// app.controller("myCtrlCategory", function ($scope, $http) {
//     $scope.products = [];
//     $http.get("js/Category.json").then(function (response) {
//         $scope.products = response.data;
//     }, function (response) {
//         alert("lỗi");
//     });

// });
app.controller("myCtrlCategory", function ($scope, $rootScope, $routeParams, $http) {
    $scope.products = [];
    $http.get("js/Category.json").then(function (response) {
        $scope.products = response.data;
    }, function (response) {
        alert("lỗi");
    });
    // $scope.sp = 'describe';
    $scope.orderByMe = function(sp) {
        $scope.myOrderBy = sp;
    }
    $scope.addCart = function (p) {
        if (typeof $rootScope.cart == 'undefined') {
            $rootScope.cart = [];
        };
        $scope.countCart = $rootScope.cart.length;
        if ($rootScope.cart.filter(i => i.id == p.id).length == 0) {
            $rootScope.cart.push(p);
            $rootScope.cart[$scope.countCart].quantity = 1;
        }

    }
    $rootScope.sumMoney = 0;
    if (typeof $rootScope.cart != 'undefined') {
        for (var i = 0; i < $rootScope.cart.length; i++) {
            $rootScope.sumMoney = $rootScope.sumMoney + $rootScope.cart[i].quantity * $rootScope.cart[i].price;
        }
    }
    $scope.addClick = function (index) {
        $rootScope.cart[index].quantity = $rootScope.cart[index].quantity + 1;
        if (typeof $rootScope.cart != 'undefined') {
            $rootScope.sumMoney = 0;
            for (var i = 0; i < $rootScope.cart.length; i++) {
                $rootScope.sumMoney = $rootScope.sumMoney + $rootScope.cart[i].quantity * $rootScope.cart[i].price;
            }
        }
    }
    $scope.subClick = function (index) {

        //         if($rootScope.cart[index].quantity>1){ 
        //             $rootScope.cart[index].quantity= $rootScope.cart[index].quantity-1;
        //         }

        //     $rootScope.cart[index].quantity= $rootScope.cart[index].quantity+1;
        //     if(typeof $rootScope.cart!='undefined'){
        //         $rootScope.sumMoney=0;
        //         for(var i=0; i<$rootScope.cart.length;i++){
        //         $rootScope.sumMoney=$rootScope.sumMoney+$rootScope.cart[i].quantity*$rootScope.cart[i].Price;
        //      }
        // }
        $rootScope.cart[index].quantity = $rootScope.cart[index].quantity - 1;
        if (typeof $rootScope.cart != 'undefined') {
            $rootScope.sumMoney = 0;
            for (var i = 0; i < $rootScope.cart.length; i++) {
                $rootScope.sumMoney = $rootScope.sumMoney + $rootScope.cart[i].quantity * $rootScope.cart[i].price;
            }
        }
    }
    $scope.delProduct=function(index){
        $rootScope.cart.splice(index,1);
        if(typeof $rootScope.cart!='undefined'){
            $rootScope.sumMoney=0;
            for(var i=0; i<$rootScope.cart.length;i++){
            $rootScope.sumMoney=$rootScope.sumMoney+$rootScope.cart[i].quantity*$rootScope.cart[i].price;
         }
    }
    }
    $scope.index = $routeParams.ct;

});
