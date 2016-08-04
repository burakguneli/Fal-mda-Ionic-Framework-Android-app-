// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function($cordovaGoogleAnalytics) {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    var admobid = {};
        // select the right Ad Id according to platform
      if( /(android)/i.test(navigator.userAgent) ) { 
          admobid = { // for Android
            banner: 'ca-app-pub-8927374835696568/2190108330',
          };
      }
      else {
        admobid = { // for Windows Phone
          banner: 'ca-app-pub-8927374835696568/2190108330',
        };
      }

    if(window.AdMob) AdMob.createBanner({
      adId:admobid.banner, 
      position:AdMob.AD_POSITION.BOTTOM_CENTER,
      "adSize" : AdMob.AD_SIZE.BANNER, 
      autoShow:true
    });

    $cordovaGoogleAnalytics.debugMode();
    $cordovaGoogleAnalytics.startTrackerWithId('UA-73539335-2');
    ionic.Platform.fullScreen();

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats/:id',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'detail'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})

.controller("liste", ["$scope", "$http", function($scope, $http){

  $scope.search = function() {

    var config = {
      headers : {
      'Content-Type': 'application/json'
      }
    }

    var data = {
      "data" : $scope.query
    }

    $http.get("http://falimda.com/app/ara.php", data, config)
    .success(function(data, status, headers, config){
      $scope.result = data; 
    })
    .error(function(data, status, headers, config) {
      $scope.result = data || "Request failed" + status;
    });

  };
}])

.controller("detail", ["$scope", "$http", "$stateParams", function($scope, $http, $stateParams){

  var config = {
    headers : {
    'Content-Type': 'application/json'
    }
  }

  $http.get("http://falimda.com/app/detay.php?id=" + $stateParams.id, config)
  .success(function(response){
    $scope.data = response[0];
    $scope.description = (response[0].description);
    $scope.name = (response[0].name);
  })

  .error(function(response, status, headers) {
      $scope.data = response || "Request failed" + status;
  })

  var admobid = {};
        // select the right Ad Id according to platform
        if( /(android)/i.test(navigator.userAgent) ) { 
            admobid = { // for Android
                interstitial: 'ca-app-pub-8927374835696568/5196313538'
            };
        } else {
            admobid = { // for Windows Phone
                interstitial: 'ca-app-pub-8927374835696568/5196313538'
            };
        }

    if(window.AdMob) AdMob.prepareInterstitial({
            adId:admobid.interstitial,
            isTesting:false,
            autoShow:true
          });

}])

.directive('hideTabs', function($rootScope) {
  return {
      restrict: 'A',
      link: function($scope, $el) {
          $rootScope.hideTabs = 'tabs-item-hide';
          $scope.$on('$destroy', function() {
              $rootScope.hideTabs = '';
          });
      }
  };
});