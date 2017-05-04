import angular from 'angular';
import './buttons/restaurant-btn.scss';
import StartBtn from './buttons/start-btn.component';
import RestaurantsBtn from './buttons/restaurants-btn.component';
import ShowAuthed from './show-authed.directive';

let componentsModule = angular.module('app.components', []);

componentsModule.component('startBtn', StartBtn);
componentsModule.component('restaurantsBtn', RestaurantsBtn);
componentsModule.directive('showAuthed', ShowAuthed);


export default componentsModule;
