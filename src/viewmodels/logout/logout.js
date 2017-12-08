import DonationService from '../../services/donation-service';
import {inject} from 'aurelia-framework';

@inject(DonationService)
export class Logout {

  constructor(donationService) {
    this.donationService = donationService;
  }

  logout() {
    console.log('logging out');
    this.donationService.logout();
  }
}
