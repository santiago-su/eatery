import angular from 'angular';
import AppHeader from './header.component';
import AppFooter from './footer.component';
import './layout.scss';

let layoutModule = angular.module('app.layout', []);

layoutModule.component('appHeader', AppHeader);
layoutModule.component('appFooter', AppFooter);

export default layoutModule;
