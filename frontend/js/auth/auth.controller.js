class AuthCtrl {
  constructor(User, $state) {
    'ngInject';

    this._User = User;
    this._$state = $state;
  }

  register () {
    this.isSubmitting = true;
    this._User.attemptAuth('register', this.formData).then(
      () => {
        this.isSubmitting = false;
        this._$state.go('app.home');
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    );

  }

  login () {
    this.isSubmitting = true;
    this._User.attemptAuth('login', this.formData).then(
      () => {
        this.isSubmitting = false;
        this._$state.go('app.home');
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.error.message;
      }
    );

  }


}


export default AuthCtrl;
