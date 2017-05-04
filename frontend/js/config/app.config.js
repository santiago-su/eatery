import authInterceptor from './auth.interceptor';

function AppConfig($httpProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, $sceDelegateProvider) {
  'ngInject';

  $httpProvider.interceptors.push(authInterceptor);

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'layout/app-view.html',
    resolve: {
      auth: (User) => User.verifyAuth()
    }
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
