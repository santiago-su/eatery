function AppConfig($stateProvider, $urlRouterProvider, $mdThemingProvider) {
  'ngInject';

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'layout/app-view.html'
  });

  $urlRouterProvider.otherwise('/');

  $mdThemingProvider.theme('default').primaryPalette('orange').accentPalette('pink');
  $mdThemingProvider.alwaysWatchTheme(true);
}

export default AppConfig;
