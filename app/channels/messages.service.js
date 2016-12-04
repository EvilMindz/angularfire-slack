angular.module('angularfireSlackApp')
.factory('Messages', ['$firebaseArray', function($firebaseArray){
	var channelMessagesRef = firebase.database().ref('channelMessages');
	var userMessagesRef = firebase.database().ref('userMessages');

	var Messages = {};
	
	Messages.forChannel = function(channelId){
		return $firebaseArray(channelMessagesRef.child(channelId));
	}

	Messages.forUsers = function(uid1, uid2){
		var path = uid1 < uid2 ? uid1 + '/' + uid2  : uid2 + '/' + uid1;

		return $firebaseArray(userMessagesRef.child(path));
	}


	return Messages;
}])