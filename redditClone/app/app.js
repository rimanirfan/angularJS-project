let app = angular.module('redditApp', [
    "ngStorage",
    "angularMoment"
])

app.component('reddit', {
    controller: function(
        $scope,
        $localStorage,
        moment
    ) {
        // const self = this
        $scope.tab   = 1 
        $scope.posts = []

        let current = [
            {
                title       : 'Title 1',
                description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, pariatur.',
                author      : 'Me',
                imgUrl      : 'https://images.pexels.com/photos/1322185/pexels-photo-1322185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                createdOn   : Date.now(),
                votes       : 1,
                comments    : [
                    {
                        text: 'This is awesome' 
                    },
                    {
                        text: 'This is awesome' 
                    }
                ]
            },
            {
                title       : 'Title 2',
                description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, pariatur.',
                author      : 'Me',
                imgUrl      : 'https://images.pexels.com/photos/1322185/pexels-photo-1322185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                createdOn   : Date.now(),
                votes       : 6,
                comments    : [
                    {
                        text: 'This is awesome 2' 
                    }
                ]
            }
        ]

        $scope.posts = current
        
        $scope.setTab = function(selected) {
            $scope.tab = selected
        }
        
        $scope.isSet = function(tab) {
            return $scope.tab === tab
        }
        
        $scope.submitPost = function($event) {
            $event.preventDefault()
            let data = {
                title       : $scope.title,
                description : $scope.description,
                author      : $scope.author,
                imgUrl      : $scope.imgUrl,
                createdOn   : Date.now(),
                votes       : 0,
                comments    : []
            }

            $scope.posts.push(data)
            $localStorage.data = $scope.posts
            ClearModel()
            
        }

        $scope.upVote = function(post) {
            post.votes++
        }

        $scope.commentCheck = -1
        $scope.setShowComments = function(selected) {
            $scope.commentCheck = selected
        }

        $scope.commentOn = function(on) {
            return $scope.commentCheck === on
        }

        $scope.submitComment = function(post, $event, commentText) {
            let commentSection = post.comments
            let newComment = {
                text : commentText
            }
            $event.preventDefault()
            commentSection.push(newComment)
            ClearModel()
        }

        $scope.showPosts = function() {
            if($localStorage.data) {
                $scope.posts = $localStorage.data
            } else {
                return
            }
        }


        function ClearModel(){
            $scope.title       = null
            $scope.description = null
            $scope.author      = null
            $scope.imgUrl      = null
            // $scope.newComment  = null
        }
    },
    templateUrl: 'reddit.html'
})