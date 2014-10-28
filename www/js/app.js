
angular.module('os.mobile', ['ionic', 'os.services', 'os.controllers'])

.config(function($stateProvider, $urlRouterProvider, $httpProvider, ApiUrlsProvider) {
  $stateProvider
    .state('login', {
      url: "/",
      templateUrl: "templates/login.html",
      controller: 'LoginCtrl'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignupCtrl'
    })

    .state('home_landing', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    });

  $urlRouterProvider.otherwise('/');

  $httpProvider.responseInterceptors.push('httpRespInterceptor');

  //ApiUrlsProvider.hostname = "localhost";
  ApiUrlsProvider.hostname = "10.0.2.2";
  ApiUrlsProvider.port = 9933;
  ApiUrlsProvider.secure = false;
  ApiUrlsProvider.urls = {
    'sessions': '/rest/ng/sessions' 
  };
})

.factory('httpRespInterceptor', function($q, $injector, $window) {
  return function(reqQ) {
    return reqQ.then(
      function(result) { return result; },

      function(result) {
        if (result.status == 401) {
          $window.localStorage['osAuthToken'] = '';
          $injector.get('$state').go('login'); // using injector to get rid of circular dependencies
        }

        $q.reject(result);
      }
    );
  };
})

.run(function($ionicPlatform, $rootScope, $window, ApiInitService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    if ($window.localStorage['osAuthToken']) {
      $rootScope.loggedIn = true;
    }

    ApiInitService.initialize();
  });
});

