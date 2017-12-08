import { inject, Aurelia } from 'aurelia-framework';

@inject(Aurelia)
export class Home {

  constructor(au) {
    this.aurelia = au;
  }

  configureRouter(config, router) {
    config.map([
      { route: ['', 'home'], name: 'donate', moduleId: 'viewmodels/donate/donate', nav: true, title: 'Donate' },
      { route: 'report', name: 'report', moduleId: 'viewmodels/report/report', nav: true, title: 'Report' },
      { route: 'candidates', name: 'candidates', moduleId: 'viewmodels/candidates/candidates', nav: true, title: 'Candidates' },
      { route: 'stats', name: 'stats', moduleId: 'viewmodels/stats/stats', nav: true, title: 'Stats' },
      { route: 'dashboard', name: 'dashboard', moduleId: 'viewmodels/dashboard/dashboard', nav: true, title: 'Dashboard' },
      { route: 'logout', name: 'logout', moduleId: 'viewmodels/logout/logout', nav: true, title: 'Logout' }
    ]);
    this.router = router;

    config.mapUnknownRoutes(instruction => {
      return 'home';
    });
  }
}
