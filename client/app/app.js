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
		controller: function($scope, $http, $location){
				$scope.username = '';
				$scope.password = '';
				$scope.submit = function(username, password){
					console.log('username==', username, "password==", password)

					$scope.currentUser = {
						username: username,
						password: password
					};
					// make a post request
					$http({
						method: "POST",
						url: '/login',
						data: $scope.currentUser
					}).then(function(resp){
						console.log("resp++++++", resp);
						$location.path('/home')
					})
					.catch(function(error){
		        console.log(error)
		    	});
		    	//clear the inputs
					$scope.username = '';
					$scope.password = '';

				}
		},
		controllerAs: 'LoginCtrl'
	})

	.state('signup', {
		url: '/signup',
		templateUrl: 'app/login/signup.html',
		controller: function($scope, $http, $location){
				$scope.username = '';
				$scope.email = '';
				$scope.password = '';
				// create user and http requestf
				$scope.submit = function(usern, email, passwrd){
					$scope.newUser = {
						username: usern,
						password: passwrd,
						email: email
					}

					$http({
						method: 'POST',
						url: '/signup',
						contentType: 'application/json',
						data: $scope.newUser
					})
					.then(function(resp){
						console.log('this is resp++++',resp)
						$location.path('/home')
					})
					.catch(function(error){
		        console.log(error)
		    	});

					$scope.username = '';
					$scope.email = '';
					$scope.password = '';
				}
		},
		controllerAs: 'SignupCtrl'
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
		controllerAs: 'business1Ctrl'
	})
	.state('business2', {
		url: '/business2',
		templateUrl: 'app/business/business2.html',
		resolve: {
			userService: function($http){
				// return $http.get('/business2');
			}
		}, 
		controller: function($scope, userService){
			// whatever your controller will do.
		},
		controllerAs: 'business2Ctrl'
	})
	.state('business3',{
		url:'/business3',
		templateUrl: 'app/business/business3.html',
		resolve:{
			userService: function($http){
				// return $http.get('/business3')
			}
		},
		controller: function(){
			// whatever your controller will do
		},
		controllerAs: 'business3Ctrl'
	})
	.state('business4',{
		url:'/business4',
		templateUrl: 'app/business/business4.html',
		resolve:{
			userService: function($http){
				// return $http.get('/business3')
			}
		},
		controller: function(){
			// whatever your controller will do
		},
		controllerAs: 'business4Ctrl'
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
