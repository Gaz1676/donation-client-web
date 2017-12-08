import {inject} from 'aurelia-framework';
import DonationService from '../../services/donation-service';

@inject(DonationService)
export class Candidate {

  firstName = '';
  lastName = '';
  office = '';

  constructor(ds) {
    this.donationService = ds;
  }

  addCandidate() {
    this.donationService.addCandidate(this.firstName, this.lastName, this.office);
  }
}
