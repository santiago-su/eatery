class StartBtnCtrl {
  constructor(Geolocation) {
    'ngInject';

    this._Geolocation = Geolocation;
  }

  geolocation() {
    this._Geolocation.getCurrentPosition();
  }
}

let StartBtn= {
  bindings: {
    location: '='
  },
  controller: StartBtnCtrl,
  templateUrl: 'components/buttons/start-btn.html'
};

export default StartBtn;
