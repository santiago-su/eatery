import angular from 'angular';
import UserService from './user.service';
import JwtService from './jwt.service';
import Geolocation from './geolocation.service';
import Restaurants from './restaurants.service';

let servicesModule = angular.module('app.services', []);

servicesModule.service('User', UserService);
servicesModule.service('JWT', JwtService);
servicesModule.service('Geolocation', Geolocation);
servicesModule.service('Restaurants', Restaurants);

export default servicesModule;
