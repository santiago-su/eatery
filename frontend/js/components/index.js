import angular from 'angular';
import StartBtn from './buttons/start-btn.component';
import './buttons/restaurant-btn.scss';
import RestaurantsBtn from './buttons/restaurants-btn.component';

let componentsModule = angular.module('app.components', []);

componentsModule.component('startBtn', StartBtn);
componentsModule.component('restaurantsBtn', RestaurantsBtn);


export default componentsModule;
