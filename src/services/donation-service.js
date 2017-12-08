import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import {TotalUpdate, LoginStatus} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import AsyncHttpClient from './async-http-client';

@inject(Fixtures, EventAggregator, AsyncHttpClient)
export default class DonationService {

  donations = [];
  methods = [];
  candidates = [];
  users = [];
  total = 0;

  constructor(data, ea, ac) {
    this.methods = data.methods;
    this.ea = ea;
    this.ac = ac;
    //this.getDonations();
    this.getCandidates();
    //this.getUsers();
  }

  isAuthenticated() {
    return this.ac.isAuthenticated();
  }

  donate(amount, method, candidate) {
    const donation = {
      amount: amount,
      method: method,
      candidate: candidate
    };
    this.ac.post('/api/candidates/' + candidate._id + '/donations', donation).then(res => {
      const returnedDonation = res.content;
      this.donations.push(returnedDonation);
      console.log(amount + ' donated to ' + candidate.firstName + ' ' + candidate.lastName + ': ' + method);

      this.total = this.total + parseInt(amount, 10);
      console.log('Total so far ' + this.total);
      this.ea.publish(new TotalUpdate(this.total));
    });
  }

  // we are calling two new methods from constructor
  // these will retrieve the candidates and users list from donation-web
  getCandidates() {
    this.ac.get('/api/candidates').then(res => {
      this.candidates = res.content;
    });
  }

  getUsers() {
    this.ac.get('/api/users').then(res => {
      this.users = res.content;
    });
  }

  getDonations() {
    this.ac.get('/api/donations').then(res => {
      this.donations = res.content;
    });
  }

  addCandidate(firstName, lastName, office) {
    const candidate = {
      firstName: firstName,
      lastName: lastName,
      office: office
    };
    this.ac.post('/api/candidates', candidate).then(res => {
      this.candidates.push(res.content);
    });
  }

  register(firstName, lastName, email, password) {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    this.ac.post('/api/users', newUser).then(res => {
      this.getUsers();
    });
  }

  login(email, password) {
    const user = {
      email: email,
      password: password
    };
    this.ac.authenticate('/api/users/authenticate', user);
  }

  logout() {
    const status = {
      success: false,
      message: ''
    };
    this.ac.clearAuthentication();
    this.ea.publish(new LoginStatus(status));
  }
}
