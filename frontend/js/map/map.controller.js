export default class MapCtrl {
  constructor($window, $scope, NgMap, $http, AppConstants) {
    'ngInject';

    this._window = $window;
    this._latitude = this._window.localStorage['latitude'];
    this._longitude = this._window.localStorage['longitude'];
    this._googleMapsCenter = { lat: Number(this._latitude), lng: Number(this._longitude)};
    this._map = NgMap;
    this._$http = $http;
    this._AppConstants = AppConstants;
    this.request = {
      location: this._googleMapsCenter,
      radius: '500',
      type: 'restaurant'
    };

    // Get Map empty component and start interaction
    this._map.getMap().then((map) => {
      let $http = this._$http;
      let constants = this._AppConstants;

      // Create google maps marker function
      function createMarker(place) {
        let infoWindow = new google.maps.InfoWindow();
        let marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.setContent(place.name);
          infoWindow.open(map, this);
        });
      }

      // Start the service
      let service = new google.maps.places.PlacesService(map);
      map.setCenter(this._googleMapsCenter);

      service.nearbySearch(this.request, function(results, status) {
        $http({
          url: `${constants.api}/restaurant`,
          method: 'POST',
          data: results
        }).then((res) => {
          console.log(res)
        });

        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      });

      // Trigger resize on map when an event happens to avoid gray map
      google.maps.event.trigger(map, 'resize');
    }).catch((error) => {
      console.log(error);
    });
  }


}
