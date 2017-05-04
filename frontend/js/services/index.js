import angular from 'angular';
import Geolocation from './geolocation.service';
import Restaurants from './restaurants.service';

let servicesModule = angular.module('app.services', []);

servicesModule.service('Geolocation', Geolocation);
servicesModule.service('Restaurants', Restaurants);

export default servicesModule;
