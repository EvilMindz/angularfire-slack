angular.module('angularfireSlackApp')
.factory('Auth', ['$firebaseAuth', function($firebaseAuth){

  //var ref = firebase;
	var auth = $firebaseAuth(); //ref

  return auth;
	
}]);
