let app = angular.module('redditApp', [])

app.component('reddit', {
    controller: function($scope) {
        // const self = this
        $scope.tab   = 1 
        $scope.posts = []

        $scope.setTab = function(selected) {
            $scope.tab = selected
        }

        $scope.isSet = function(tab) {
            return $scope.tab === tab
        }

        $scope.submitPost = function() {
            console.log('ok')
            let data = {
                title       : $scope.title,
                description : $scope.description,
                author      : $scope.author,
                imgUrl      : $scope.imgUrl,
                createdOn   : Date.now(),
                votes       : 0,
                comments    : []
            }
            console.log(data)
            $scope.posts.push(data)
            
        }
        console.log($scope.title)
        console.log($scope.posts)
    },
    templateUrl: 'reddit.html'
})