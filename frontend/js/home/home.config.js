function HomeConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.home', {
    url: '/',
    controller: 'HomeCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'home/home.html',
    // resolve: {
    //   geolocation: (Geolocation) => Geolocation.getCurrentPosition()
    // },
    title: 'Home'
  });

}

export default HomeConfig;
