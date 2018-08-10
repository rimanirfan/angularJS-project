let app       = angular.module("prayerApp", [])
let d         = new Date()
app.controller("PrayerTimesController", function($http, $scope){
    $scope.latitude       = ''
    $scope.longitude      = ''
    $scope.timings        = []
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            $scope.$apply(function(){
                $scope.latitude  = position.coords.latitude
                $scope.longitude = position.coords.longitude
            })
            console.log(position)
            $http({
                url     : "http://api.aladhan.com/v1/calendar",
                method  : "GET",
                params  : {latitude: $scope.latitude, longitude: $scope.longitude, month:d.getUTCMonth()+1, year:d.getFullYear()}
            }).then(function(response) {
                response.data.data.forEach((element, index) => {
                    let data = {
                        date    : element.date.readable,
                        fajr    : element.timings.Fajr,
                        dhuhr   : element.timings.Dhuhr,
                        asr     : element.timings.Asr,
                        maghrib : element.timings.Maghrib,
                        isha    : element.timings.Isha
                    }
                    $scope.timings.push(data)
                });
                console.log(response.data.data)
            })
        })
    }
})