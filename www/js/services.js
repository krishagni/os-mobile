
angular.module('os.services', [])
.provider('ApiUrls', function() {
  var that = this;

  this.hostname = "";
  this.port = "";
  this.secure = false;
  this.urls = {};

  this.$get = function() {
    return {
      hostname: that.hostname,
      port    : that.port,
      secure  : that.secure,
      urls    : that.urls,

      getUrl  : function(key) {
        var url = this.urls[key];
        var protocol = this.secure ? 'https://' : 'http://';
        return protocol + this.hostname + ":" + this.port + url;
      }
    };
  }
})

.factory('ApiInitService', function($window, $http) {
  return {
    initialize: function(token) {
      if (!token) {
        token = $window.localStorage['osAuthToken'];
        if (!token) {
          return;
        }

        token = JSON.parse(token);
      }

      $http.defaults.headers.common['X-OS-API-TOKEN'] = token;
    }
  };
})

.factory('AuthService', function($http, ApiUrls) {
  var url = function() {
    return ApiUrls.getUrl('sessions');
  };

  return {
    login: function(credentials) {
      return $http.post(url(), credentials).then(function(result) { return result.data; });
    },

    logout: function() {
      return $http.delete(url());
    }
    }
});
