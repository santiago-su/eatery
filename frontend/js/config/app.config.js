function AppConfig($stateProvider, $urlRouterProvider, $mdThemingProvider, $sceDelegateProvider) {
  'ngInject';

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'layout/app-view.html'
  });

  $urlRouterProvider.otherwise('/');

  $mdThemingProvider.theme('default').primaryPalette('orange').accentPalette('pink');
  $mdThemingProvider.alwaysWatchTheme(true);
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://maps.googleapis.com/maps/api/**'
  ]);
}

export default AppConfig;
