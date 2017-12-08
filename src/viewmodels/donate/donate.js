import {inject} from 'aurelia-framework';
import DonationService from '../../services/donation-service';

@inject(DonationService)
export class Donate {

  amount = 0;

  methods = [];
  selectedMethod = '';

  candidates = [];
  selectedCandidate = '';

  constructor(ds) {
    this.donationService = ds;
    this.methods = ds.methods;
    this.selectedMethod = this.methods[0];
    this.candidates = ds.candidates;
    this.selectedCandidate = this.candidates[0];
  }

  makeDonation() {
    this.donationService.donate(this.amount, this.selectedMethod, this.selectedCandidate);
  }
}
