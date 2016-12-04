angular.module('angularfireSlackApp')
.factory('Channels', ['$firebaseArray', function($firebaseArray){
	
	var ref = firebase.database().ref('channels');
	var Channels = $firebaseArray(ref);

	return Channels;
}])