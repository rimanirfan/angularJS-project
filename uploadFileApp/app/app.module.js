let multer = require('multer')
let app       = angular.module('uploadFileApp', [])

app.directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link    : function(scope, element, attrs) {
            let model       = $parse(attrs.fileModel)
            let modelSetter = model.assign

            element.bind('change', function(){
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0])
                })
            })
        }
    }
}])

app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl) {
        let fd        = new FormData()
        fd.append('file', file)

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers         : {'Content-type': undefined}
        })
        .succes(function(){
            console.log("success")
        })
        .error(function(){
            console.log("error")
        })
    }
}])

app.controller('UploadFileController', ['$scope', 'fileUpload', function ($scope, fileUpload) { 
    $scope.upload = function() {
        let file = $scope.myFile

        console.log('file is ')
        console.log(file)
        let uploadUrl = "/multer"
        fileUpload.uploadFileToUrl(file, uploadUrl)
    }
}])

//Node js server route
let d       = new Date()
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename   : function (req, file, cb) { 
        cb(null, file.originalName+ '-' + d.now()+'.jpg')
    }
})

let upload = multer({ storage: storage })
multer.post('/multer', upload.single('file'))