import angular from 'angular';
import 'ngMap';
import MapCtrl from './map.controller';
import MapConfig from './map.config';

let mapModule = angular.module('app.map', ['ngMap']);

mapModule.config(MapConfig);
mapModule.controller('MapCtrl', MapCtrl);

export default mapModule;
