export default class Restaurants {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;

    this.allRest = null;
    this.restaurant = null;
  }

  get() {
    return this._$http({
      url: `${this._AppConstants.api}/restaurants`,
      method: 'GET'
    }).then((res) => {
      this.allRest = res.data;
      return res.data;
    });
  }

  getRestaurant(id) {
    return this._$http({
      url: `${this._AppConstants.api}/restaurant`,
      params: { 'id': id },
      method: 'GET'
    }).then((res) => {
      this.restaurant = res.data;
      return res.data;
    });
  }

  postReview(formData, id) {
    return this._$http({
      url: `${this._AppConstants.api}/restaurant/review`,
      method: 'POST',
      data: {
        'restaurant': formData,
        'id': id
      }
    }).then((res) => {
      this.restaurant = res.data;
      return res.data;
    });

  }


}
