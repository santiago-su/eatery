export default class Restaurants {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;

    this.allRest = null;
  }

  get() {
    return this._$http({
      url: `${this._AppConstants.api}/restaurant`,
      method: 'GET'
    }).then((res) => {
      this.allRest = res.data;
      return res.data;
    });
  }


}
