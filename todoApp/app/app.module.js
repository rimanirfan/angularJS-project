let app = angular.module("todoApp", [
    "ngStorage"
])

app.controller("TodoAppController", function(
    $scope,
    $localStorage,
    $sessionStorage
){
    $scope.todoList = []
    let self        = this
    self.id         = 0
    $scope.addTodo = function(){
        
        let todo = {
            id       : ++self.id,
            name     : $scope.todo,
            priority : $scope.priority
        }

        $scope.todoList.push(todo)
        $localStorage.data = $scope.todoList
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

    $scope.showTodo = function() {
        if($localStorage.data) {
            $scope.todoList = $localStorage.data
        } else {
            return
        }
    }

    function ClearModel(){
        $scope.id       = null
        $scope.todo     = null
        $scope.priority = null
    }
})