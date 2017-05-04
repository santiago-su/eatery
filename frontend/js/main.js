import angular from 'angular';

import 'angular-material/angular-material.css';
import constants  from './config/app.constants';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';
import appConfig  from './config/app.config';

import 'angular-ui-router';
import './config/app.templates';
import '../globals.scss';

import './layout';
import './home';
import './services';
import './components';
import './map';
import './restaurants';

const requires = [
  angularMaterial,
  angularAnimate,
  'ui.router',
  'templates',
  'app.layout',
  'app.home',
  'app.services',
  'app.components',
  'app.map',
  'app.restaurants'
];

window.app = angular.module('app', requires);

angular.module('app').constant('AppConstants', constants);

angular.module('app').config(appConfig);

angular.bootstrap(document, ['app'], {
  strictDi: false
});
