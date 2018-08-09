let app       = angular.module("prayerApp", [])
let d         = new Date()
app.controller("PrayerTimesController", function($http, $scope){
    $scope.latitude       = ''
    $scope.longitude      = ''
    $scope.dateList       = []
    $scope.fajrs          = []
    $scope.dhuhrs         = []
    $scope.asrs           = []
    $scope.maghribs       = []
    $scope.ishas          = []
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            $scope.$apply(function(){
                $scope.latitude  = position.coords.latitude
                $scope.longitude = position.coords.longitude
            })
            $http({
                url     : "http://api.aladhan.com/v1/calendar",
                method  : "GET",
                params  : {latitude: $scope.latitude, longitude: $scope.longitude, month:d.getUTCMonth()+1, year:d.getFullYear()}
            }).then(function(response) {
                response.data.data.forEach((element, index) => {
                    $scope.fajrs.push(element.timings.Fajr)
                    $scope.dhuhrs.push(element.timings.Dhuhr)
                    $scope.asrs.push(element.timings.Asr)
                    $scope.maghribs.push(element.timings.Maghrib)
                    $scope.ishas.push(element.timings.Isha)
                    $scope.dateList.push(response.data.data[index].date.readable)
                });
                $scope.prayerTime =  response
            })
        })
    }
})