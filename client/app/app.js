// create main angular module, connect to other modules and router. This is a basic set up as your application grows you can refactor as you wish.
angular.module('OneStop',["ui.router",'OneStop.Auth'])
// make your route configurations using uiRouter, the config func takes in a callback with two parameter $stateProvider, $urlRouterProvider. the parameter are objects. read what methods they have.
.config(function($stateProvider, $urlRouterProvider){
// $urlRouterProvider make dericts your urls
	$urlRouterProvider.otherwise('/home');
// 	$stateProvider has a state property so you can set your state options, it takes two paramater a name of the state it can be banana and object. The object takes a url property and the url as a value. A templateUrl propety with the path to the static file.
	$stateProvider
	// the state will go on the html that you want route the user.

	.state('home', {
		url: '/home',
		templateUrl: 'app/home/home.html',
		resolve: {
			userService: function($http){
				return $http.get('/home');
			}
		},
		controller: function($scope, userService, $location){
				
		},
		controllerAs: 'HomeController'
	})





	.state('login', {
		url: '/login',
		templateUrl: 'app/login/login.html',
		resolve: {
			userService: function($http){
				return $http.get('/login');
			}
		},
		controller: function($scope, userService, $location){
				$scope.testing = userService.data;
				
				console.log("data in login state", $scope.testing )
				$scope.username = '';
				$scope.password = '';
				$scope.submit = function(username, password){
					console.log('username==', username, "password==", password)
					if ($scope.testing[0].username === username && $scope.testing[0].password === password) {
						console.log("location in if", $location)
						$location.path('/home')
					}
					$scope.username = '';
					$scope.password = '';

				}
		},
		controllerAs: 'LoginCtrl'
	})

	.state('signup', {
		url: '/signup',
		templateUrl: 'app/login/signup.html',
		resolve: {
			userService: function($http){
				return $http.get('/signup');
			}
		},
		controller: function($scope, userService){
				$scope.testing = userService.data;
				$scope.username = '';
				$scope.password = '';
				$scope.email = '';
				$scope.submit = function(username, email, password){
					console.log('username==', username,'email===', email, "password==", password)
					$scope.username = '';
					$scope.password = '';
					$scope.email = '';
				}
		},
		controllerAs: 'LoginCtrl'
	})
	.state('business1', {
		url: '/business1',
		templateUrl: 'app/business/business1.html',
		resolve: {
			userService: function($http){
				// return $http.get('/business1');
			}
		},
		controller: function($scope, userService){
				// $scope.testing = userService.data;
		},
		controllerAs: 'HomeController'
	})
	

})

.run(function($rootScope, $location){
	$rootScope.log = function(){
		console.log('location',$location)
		$location.path('/login')	
	}

	$rootScope.signup = function(){
		console.log('signup bruh')
		$location.path('/signup')
	}
	// console.log('we out her running', $location)
})
// the controller will tak
