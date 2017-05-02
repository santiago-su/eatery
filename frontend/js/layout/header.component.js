class AppHeaderCtrl {
  constructor() {
    'ngInject';

    this.appName = 'Eatery';
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: 'layout/header.html'
};

export default AppHeader;
