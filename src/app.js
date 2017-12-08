import {inject, Aurelia} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import DonationService from './services/donation-service';
import {LoginStatus} from './services/messages';

@inject(DonationService, Aurelia, EventAggregator)
export class App {
  constructor(ds, au, ea) {
    this.au = au;
    this.ds = ds;
    ea.subscribe(LoginStatus, msg => {
      this.router.navigate('/', { replace: true, trigger: false });
      this.router.reset();
      if (msg.status === true) {
        au.setRoot('home');
      } else {
        au.setRoot('app');
      }
    });
  }

  attached() {
    if (this.ds.isAuthenticated()) {
      this.au.setRoot('home').then(() => {
        this.router.navigateToRoute('dashboard');
      });
    }
  }

  configureRouter(config, router) {
    config.map([
      { route: ['', 'login'], name: 'login', moduleId: 'viewmodels/login/login', nav: true, title: 'Login' },
      { route: 'signup', name: 'signup', moduleId: 'viewmodels/signup/signup', nav: true, title: 'Signup' }
    ]);
    this.router = router;
  }
}
