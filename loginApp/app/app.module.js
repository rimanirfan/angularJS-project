let app = angular.module('loginApp', [
    'ngRoute'
])

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'login.html'
    })
    .when('/dashboard', {
        resolve: {
            "check": function ($location, $rootScope) {
                if(!$rootScope.loggedIn) {
                    $location.path('/')
                }
            }
        },
        templateUrl: 'dashboard.html'
    })
    .otherwise({
        redirectTo: '/'
    })
})

app.controller("LoginAppController", function($scope, $location, $rootScope) {
    $scope.submit = function() {

        let uname    = $scope.username
        let password = $scope.username

        if($scope.username == 'admin' && $scope.password == 'admin') {
            $rootScope.loggedIn = true
            $location.path('/dashboard')
        } else {
            alert('Wrong username or password')
        }
    }
})