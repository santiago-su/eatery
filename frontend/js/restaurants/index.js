import angular from 'angular';
import RestaurantsConfig from './restaurants.config';
import RestaurantsCtrl from './restaurants.controller';

let restaurantsModule = angular.module('app.restaurants', []);

restaurantsModule.config(RestaurantsConfig);
restaurantsModule.controller('RestaurantsCtrl', RestaurantsCtrl);

export default restaurantsModule;
