import angular from 'angular';

import appConfig  from './config/app.config';
import 'angular-ui-router';
import './config/app.templates';
import '../globals.scss';

import './layout';
import './home';

const requires = ['ui.router', 'templates', 'app.layout', 'app.home'];

window.app = angular.module('app', requires);

angular.module('app').config(appConfig);

angular.bootstrap(document, ['app'], {
  strictDi: false
});
