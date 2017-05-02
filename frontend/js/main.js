import angular from 'angular';

import 'angular-material/angular-material.css';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';
import appConfig  from './config/app.config';

import 'angular-ui-router';
import './config/app.templates';
import '../globals.scss';

import './layout';
import './home';

const requires = [
  angularMaterial,
  angularAnimate,
  'ui.router',
  'templates',
  'app.layout',
  'app.home'
];

window.app = angular.module('app', requires);

angular.module('app').config(appConfig);

angular.bootstrap(document, ['app'], {
  strictDi: false
});
