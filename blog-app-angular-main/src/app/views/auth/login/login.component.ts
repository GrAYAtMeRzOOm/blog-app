import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../components/service/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public authenticationService: AuthenticationService;

  constructor(authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
  }

  ngOnInit(): void {
  }

  public userLogin(email: String, password: String) {
    let loggingStatus = this.authenticationService.authenticate(email, password);
  }
}
