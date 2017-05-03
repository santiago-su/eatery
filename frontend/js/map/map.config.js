function MapConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.map', {
    url: '/map',
    controller: 'MapCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'map/map.html',
    resolve: {
      geoLocation: (Geolocation) => Geolocation.getCurrentPosition()
    }
  });

}

export default MapConfig;
