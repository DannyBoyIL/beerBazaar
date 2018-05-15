
var beerCache = {};

var beerApp = angular.module("beersModule", ["ngRoute"])
        .config(function ($routeProvider) {

            $routeProvider
                    .when("/home", {
                        templateUrl: "tpl/home.html",
                        controller: "homeController",
                        pageTitle: "Home page"
                    })
                    .when("/about", {
                        templateUrl: "tpl/about.html",
                        controller: "aboutController",
                        pageTitle: "About us"
                    })
                    .when("/contact", {
                        templateUrl: "tpl/contact.html",
                        controller: "contactController",
                        pageTitle: "Contact us"
                    })
                    .when("/shop", {
                        templateUrl: "tpl/shop.html",
                        controller: "shopController",
                        pageTitle: "Beershop"
                    })
                    .when("/location", {
                        templateUrl: "tpl/location.html",
                        controller: "locationController",
                        pageTitle: "Our locations"
                    })
                    .when("/beer/:beetID", {
                        templateUrl: "tpl/beer.html",
                        controller: "beerController"
                    })
                    .otherwise({redirectTo: '/home'});
        })
        .controller("mainController", function ($rootScope, $scope, $route) {

            $scope.setActive = function (event) {
                setLinks(event);
            };
        })
        .controller("homeController", function ($rootScope, $scope, $route) {

            $rootScope.title = $route.current.$$route.pageTitle;
        })
        .controller("aboutController", function ($rootScope, $scope, $route) {

            $rootScope.title = $route.current.$$route.pageTitle;
        })
        .controller("locationController", function ($rootScope, $scope, $route, $http) {

            $rootScope.title = $route.current.$$route.pageTitle;

            $http({
                method: "get",
                url: "js/location.json"
            }).then(function (response) {

                $scope.location = response.data.result;
                console.log($scope.location);
                $scope.map = getLocations($scope.location);

             /*   function getLocations(location) {
                    var map = document.querySelectorAll(".map");

                    for (i = 0; i < location.result.length; i++) {
                        map[i] = location.result[i].formatted_address;
                    }
                    console.log(location);
                } */

            });
        })
        .controller("shopController", function ($rootScope, $scope, $route, $http) {

            $rootScope.title = $route.current.$$route.pageTitle;

            $scope.sortBeers = "+beerName";

            $http({
                method: "get",
                url: "js/beers.json"
            }).then(function (response) {

                $scope.beers = beerCache = response.data;
                $scope.categories = getCategories($scope.beers);

            });

            $scope.filterCategories = function () {

                var data = [];

                for (var i = 0; i < $scope.categories.length; i++) {

                    for (var x = 0; x < beerCache.length; x++) {

                        if ($scope.categories[i] == beerCache[x].beerSCategory) {

                            if ($scope[ $scope.categories[i] ] === true) {

                                data.push(beerCache[x]);
                            }
                        }
                    }
                }

                $scope.beers = (data.length > 0) ? data : beerCache;

            };

            $scope.sortByPrice = function (by) {
                $scope.sortBeers = by;
                this.clearSortPrice();
                event.target.className = "press-active";
            };

            $scope.changeSort = function () {
                this.clearSortPrice();
            };

            $scope.clearSortPrice = function () {
                var links = document.querySelectorAll('#sort-price-links li a');
                for (var x = 0; x < links.length; x++) {
                    links[x].className = "";
                }
            };

        })
        .controller("contactController", function ($rootScope, $scope, $route) {

        })
        .controller("contactController", function ($rootScope, $scope, $route, $http, $routeParams) {
            
            $http({
                method: "get",
                url: 'js/beers.json'
            }).then(function(){});

        });

function setLinks(event) {
    var links = document.querySelectorAll(".menuBar li a");
    for (var x = 0; x < links.length; x++) {

        links[x].className = "";
    }

    angular.element(event.target).parent().addClass('active');
}

var getCategories = function (beers) {

    var categories = new Array();

    for (var x = 0; x < beers.length; x++) {

        if (categories.indexOf(beers[x].beerSCategory) == -1) {

            categories.push(beers[x].beerSCategory);

        }
    }
    return categories;
};

/* var getBeekDetails = function (beerID, allBeers){
    for( allBeers[x].beerID == beerID ){
        return ;
    }
}; */


