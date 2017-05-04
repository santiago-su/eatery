class RestaurantsBtnCtrl {
  constructor() {
    'ngInject';

  }
}

let RestaurantsBtn = {
  bindings: {
    location: '='
  },
  controller: RestaurantsBtnCtrl,
  templateUrl: 'components/buttons/restaurants-btn.html'
};

export default RestaurantsBtn;
