// renders list of donations

import {inject} from 'aurelia-framework';
import DonationService from '../../services/donation-service';

@inject(DonationService)
export class Report {

  donations = [];

  constructor(ds) {
    this.donationService = ds;
    this.donations = this.donationService.donations;
  }
}
