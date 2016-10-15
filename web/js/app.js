var myApp = angular.module('DemoApp', ['ngRoute']);

var cars = [
      {id: 1, year: 1997, registered: new Date(1999, 3, 15), make: 'Ford', model: 'E350', description: 'ac, abs, moon', price: 3000}
      , {id: 2, year: 1999, registered: new Date(1996, 3, 12), make: 'Chevy', model: 'Venture', description: 'None', price: 4900}
      , {id: 3, year: 2000, registered: new Date(1998, 12, 22), make: 'Chevy', model: 'Venture', description: '', price: 5000}
      , {id: 4, year: 1996, registered: new Date(2002, 3, 15), make: 'Jeep', model: 'Grand Cherokee', description: 'Air, moon roof, loaded', price: 4799}
    ];
myApp.controller('CarController', ['$scope', 'CarFactory', function ($scope, CarFactory) {
    

    
    $scope.cars = cars;
    $scope.title = "Cars Demo App";
    $scope.predicate = "year";
    $scope.reverse = false;
    $scope.nextId = 5;
    
    $scope.cars = CarFactory.getCars();
    
    $scope.deleteCar = function (id) {
        CarFactory.deleteCar(id);
    };
    
    

  }]);
  
  myApp.controller('EditController', ['$scope', '$routeParams', 'CarFactory', function ($scope, $routeParams, CarFactory){
       
        $scope.car = {};
       
        
        if (!$routeParams.id) {
            $scope.car.id = null;
            $scope.title = "Add a car";
        }
        else {
            $scope.car = CarFactory.getCars()[$routeParams.id - 1];
            $scope.title = "Edit a car";
        }

        $scope.editCar = function () {
            CarFactory.addEditCar($scope.car);
            alert("Success!");
        };
    }]);
  
  myApp.config(function ($routeProvider) {
               
               $routeProvider
                        .when('/cars', {
                            templateUrl: 'cars.html',
                            controller: 'CarController'
                        })
                        .when('/editCar/:id', {
                            templateUrl: "editCar.html",
                            controller: "EditController"
                        })
                        .when('/editCar', {
                            templateUrl: "editCar.html",
                            controller: "EditController"
                        })
                         .otherwise({
                                    redirectTo: "/home"
                        });
                        
  });
  
  myApp.factory('CarFactory', function () {
    
       
 
        var getCars = function () {return cars;};
        var deleteCar = function (id) {
            for (var i = 0; i < cars.length; i++) {
                if (cars[i].id === id) {
                    cars.splice(i, 1);
                    return;
                 }
                }
              };
              
    var addEditCar = function(newcar){
        if (newcar.id === null) {
             newcar.id = cars.length+1;
             cars.push(newcar);
        }
        else {
            for (var i = 0; i < cars.length; i++) {
                if (cars[i].id === newcar.id) {
                    cars[i] = newcar;
                    break;
                  }
                }
             }
          };
 
      return {
        getCars: getCars,
        deleteCar: deleteCar,
        addEditCar: addEditCar
        };


  });