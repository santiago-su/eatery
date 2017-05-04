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
          (err) => $state.go('app.map')
        );
      }
    }
  });

}

export default RestaurantsConfig;
