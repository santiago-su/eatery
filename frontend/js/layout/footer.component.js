class AppFooterCtrl {
  constructor() {
    'ngInject';
    this.appName = 'Eatery';

    this.date = new Date();
  }
}

let AppFooter = {
  controller: AppFooterCtrl,
  templateUrl: 'layout/footer.html'
};

export default AppFooter;
