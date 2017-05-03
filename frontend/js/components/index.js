import angular from 'angular';
import StartBtn from './buttons/start-btn.component';

let componentsModule = angular.module('app.components', []);

componentsModule.component('startBtn', StartBtn);


export default componentsModule;
