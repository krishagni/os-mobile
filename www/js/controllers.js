
angular.module('os.controllers', ['os.services'])
.controller('LoginCtrl', function($scope, $http, $state, $rootScope, $window, ApiInitService, AuthService) {
  if ($window.localStorage['osAuthToken']) {
    $state.go('home_landing');
    return;
  }

  $rootScope.loggedIn = false;
  $scope.loginData = {};
  $scope.tryLogin = function() {
    AuthService.login($scope.loginData).then(
      function(authInfo) {
        if (!authInfo) {
          $scope.errorLogin = true;
          $window.localStorage['osAuthToken'] = '';
          return;
        }

        $scope.errorLogin = false;
        $window.localStorage['osAuthToken'] = authInfo.token;
        ApiInitService.initialize(authInfo.token);
        $rootScope.loggedIn = true;
        $rootScope.currentUser = authInfo;
        $state.go('home_landing');
      }
    );
  };
})

.controller('HomeCtrl', function($scope) {
  $scope.users = [
    {firstName: 'Sachin', lastName: 'Tendulkar', city: 'Mumbai'},
    {firstName: 'Rahul', lastName: 'Dravid', city: 'Bengaluru'},
    {firstName: 'Sourav', lastName: 'Ganguly', city: 'Kolkata'}
  ];
});

