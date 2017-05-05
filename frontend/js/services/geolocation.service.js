// Based on https://github.com/ninjatronic/ngGeolocation

export default class Geolocation {
  constructor($rootScope, $q, $window) {
    'ngInject';

    this._$rootScope = $rootScope;
    this._$q = $q;
    this._$window = $window;
    this._position = undefined;
  }

  supported() {
    return 'geolocation' in this._$window.navigator;
  }

  getCurrentPosition() {
    let deferred = this._$q.defer();
    let rootScope = this._$rootScope;
    let win = this._$window;
    if (this.supported()) {
      this._$window.navigator.geolocation.getCurrentPosition(
        function(_position) {
          rootScope.$apply(function() {
            // Save location in local storage
            deferred.promise.then((pos) => {
              win.localStorage['latitude'] = pos.coords.latitude;
              win.localStorage['longitude'] = pos.coords.longitude;
            });
            deferred.resolve(_position);
          });
        },
        function(error) {
          rootScope.$apply(function() {
            deferred.reject({error: error});
          });
        }
      );
    } else {
      deferred.reject({error: {
        code: 2,
        message: 'This web browser does not support HTML5 Geolocation'
      }});
    }
    //
    return deferred.promise;
  }

  watchPosition(options) {
    if(this.supported()) {

      if(!this.watchId) {
        this.watchId = this._$window.navigator.geolocation.watchPosition(
          function(_position) {
            this._$rootScope.$apply(function() {
              this._position = _position;
            });
          },
          function(error) {
            this._$rootScope.$apply(function() {
              this._position = {error: error};
            });
          }, options);
      }
    } else {
      this._position = {
        error: {
          code: 2,
          message: 'This web browser does not support HTML5 Geolocation'
        }
      };
    }
  }

  clearWatch() {
    if(this.watchId) {
      this._$window.navigator.geolocation.clearWatch(this.watchId);
      delete this.watchId;
    }
  }

}
