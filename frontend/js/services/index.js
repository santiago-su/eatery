import angular from 'angular';
import Geolocation from './geolocation.service';

let servicesModule = angular.module('app.services', []);

servicesModule.service('Geolocation', Geolocation);

export default servicesModule;
