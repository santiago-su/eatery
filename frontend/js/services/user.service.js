export default class User {
  constructor(JWT, AppConstants, $http, $state, $q) {
    'ngInject';

    this._JWT = JWT;
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$state = $state;
    this._$q = $q;

    this.current = null;
  }

  attemptAuth(type, credentials) {
    return this._$http({
      url: `${this._AppConstants.api}/${type}`,
      method: 'POST',
      data: {
        user: credentials
      }
    }).then(
      (res) => {
        this._JWT.save(res.data.token);
        this.current = res.data.email;
        return res;
      }
    );
  }

  logout() {
    this.current = null;
    this._JWT.destroy();
    this._$state.go(this._$state.$current, null, { reload: true });
  }

  verifyAuth() {
    let deferred = this._$q.defer();

    if (!this._JWT.get()) {
      deferred.resolve(false);
      return deferred.promise;
    }

    if (this.current) {
      deferred.resolve(true);

    } else {
      this._$http({
        url: `${this._AppConstants.api}/user`,
        method: 'GET'
      }).then(
        (res) => {
          this.current = res.data.email;
          deferred.resolve(true);
        },
        () => {
          this._JWT.destroy();
          deferred.resolve(false);
        }
      );
    }

    return deferred.promise;
  }

  ensureAuthIs(bool) {
    let deferred = this._$q.defer();

    this.verifyAuth().then((authValid) => {
      if (authValid !== bool) {
        this._$state.go('app.home');
        deferred.resolve(false);
      } else {
        deferred.resolve(true);
      }
    });

    return deferred.promise;
  }

}
