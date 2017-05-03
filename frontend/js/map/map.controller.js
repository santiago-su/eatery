export default class MapCtrl {
  constructor($window, $scope, NgMap) {
    'ngInject';

    this._window = $window;
    this._latitude = this._window.localStorage['latitude'];
    this._longitude = this._window.localStorage['longitude'];
    this._googleMapsCenter = { lat: Number(this._latitude), lng: Number(this._longitude)};
    this._map = NgMap;
    this.request = {
      location: this._googleMapsCenter,
      radius: '500',
      type: 'restaurant'
    };

    this._map.getMap().then((map) => {

      function createMarker(place) {
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }

      let service = new google.maps.places.PlacesService(map);
      map.setCenter(this._googleMapsCenter);

      service.nearbySearch(this.request, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      })

      google.maps.event.trigger(map, 'resize');
    }).catch((error) => {
      console.log(error);
    });
  }


}
