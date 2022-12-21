import { Component, OnInit } from "@angular/core";
import {AuthenticationService} from '../../../components/service/authentication/authentication.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {
  private authservice:AuthenticationService;
  constructor(authservice:AuthenticationService) {
    this.authservice=authservice;
  }

  ngOnInit(): void {}

  public registerUser(username:String,email:String,password:String){
    console.log("registerUser invoked");
    this.authservice.registerUser(username,email,password)
  }
}
