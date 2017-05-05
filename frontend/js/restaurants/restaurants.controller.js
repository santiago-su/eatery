class RestaurantsCtrl {
  constructor(Restaurants, $state) {
    'ngInject';

    this.restaurants = Restaurants;
    this._$state = $state;

  }

  postReview() {
    this.isSubmitting = true;
    this.restaurants.postReview(this.formData, this.restaurants.restaurant.id).then(
      (res) => {
        this.isSubmitting = false;
        this._$state.reload();
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    );
  }
}

export default RestaurantsCtrl;
