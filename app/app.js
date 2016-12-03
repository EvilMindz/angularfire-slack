'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
  .module('angularfireSlackApp', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'home/home.html'
      })
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',        
        templateUrl: 'auth/login.html',
        resolve:{
          requireNoAuth: function($state, Auth){
            return Auth.$requireSignIn().then(function(auth){
              $state.go('home');
            }, function(error){
              return;
            })
          }
        }
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',        
        templateUrl: 'auth/register.html',
        resolve:{
          requireNoAuth: function($state, Auth){
            return Auth.$requireSignIn().then(function(auth){
              $state.go('home');
            }, function(error){
              return;
            })
          }
        }
      })
      .state('profile', {
        url:'/profile',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'users/profile.html',
        resolve:{
          auth: function($state, Auth){
            return Auth.$requireSignIn().catch(function(){
              $state.go('home');
            });
          },

          profile: function(Users, Auth){
            return Auth.$requireSignIn().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })
      ;

    $urlRouterProvider.otherwise('/');
  })  
  .config(function(){
    var config = {
      apiKey: "AIzaSyC1ubPjg3uMEFlTb5uQ-mfyVASzuPexlis",
      authDomain: "slackclonethinkster.firebaseapp.com",
      databaseURL: "https://slackclonethinkster.firebaseio.com",
      storageBucket: "slackclonethinkster.appspot.com",
      messagingSenderId: "505029615557"
    };
    firebase.initializeApp(config);
  });

