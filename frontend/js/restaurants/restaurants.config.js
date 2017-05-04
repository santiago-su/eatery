function RestaurantsConfig($stateProvider) {
  'ngInject';

  $stateProvider

  .state('app.restaurants', {
    url: '/restaurants',
    controller: 'RestaurantsCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'restaurants/restaurants.html',
    resolve: {
      restaurants: (Restaurants, $state) => {
        Restaurants.get().then(
          (restaurants) => restaurants,
          () => $state.go('app.map')
        );
      }
    }
  })

  .state('app.restaurant', {
    url: '/restaurant/:id',
    controller: 'RestaurantsCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'restaurants/show.html',
    resolve: {
      restaurant: (Restaurants, $state, $stateParams) => {
        Restaurants.getRestaurant($stateParams.id).then(
          (restaurant) => restaurant,
          () => $state.go('app.home')
        );
      }
    }
  });

}

export default RestaurantsConfig;
