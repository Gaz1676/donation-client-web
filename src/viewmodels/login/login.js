import {inject} from 'aurelia-framework';
import DonationService from '../../services/donation-service';

@inject(DonationService)
export class Login {

  email = 'marge@simpson.com';
  password = 'secret';

  constructor(ds) {
    this.donationService = ds;
    this.prompt = '';
  }

  login(e) {
    console.log(`Trying to log in ${this.email}`);
    this.donationService.login(this.email, this.password);
  }
}
