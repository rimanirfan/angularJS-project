let app = angular.module("todoApp", [])

app.controller("TodoAppController", function($scope){
    $scope.todoList = []

    $scope.addTodo = function(){
        
        let todo = {
            id       : $scope.todoList.length + 1,
            name     : $scope.todo,
            priority : $scope.priority
        }

        $scope.todoList.push(todo)
        ClearModel() //this will reset all values to default
    }

    $scope.deleteTodo = function(todo){
        let index = $scope.todoList.indexOf(todo)

        $scope.todoList.splice(index,1)

    }

    $scope.BindSelectedData = function(todo) {
        $scope.id       = todo.id
        $scope.todo     = todo.name
        $scope.priority = todo.priority
    }

    $scope.updateTodo = function(todo){
        $.grep($scope.todoList, function(e){
            if(e.id == $scope.id) {
                e.name     = $scope.todo
                e.priority = $scope.priority
            }
            ClearModel() //this will reset all values to default
        })
    }

    function ClearModel(){
        $scope.id       = null
        $scope.todo     = null
        $scope.priority = null
    }
})