import {Injectable} from '@angular/core';
import {HttpClientService} from '../httpclient/httpclient.service';
import {UserModel} from '../../model/UserModel';
import {DefaultResponse} from '../../model/DefaultResponse';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private httpClientService: HttpClientService;

  constructor(httpClientService: HttpClientService,private router:Router) {
    this.httpClientService = httpClientService;
  }

  authenticate(email: String, password: String) {
    const req = this.httpClientService.userLogin(email, password);
    let loginResponse = false;
    req.subscribe((defaultResponse: DefaultResponse) => {
        console.log(defaultResponse);
      if (defaultResponse.response!==null) {
        sessionStorage.setItem('email', defaultResponse.response.data[0].user_email);
        sessionStorage.setItem('token',defaultResponse.response.token)
        loginResponse= true;
        console.log('added to sessionStorage  '+sessionStorage.getItem('token'));
        console.log('added to sessionStorage  '+sessionStorage.getItem('email'));
        this.router.navigate(["/authenticated"]);
      }else {
        alert('Password or email is incorrect try agian');
      }
    });
    return loginResponse;
  }

  registerUser(username: String, email: String, password: String) {
    console.log("auth-registerUser invoked");
    const user = new UserModel();
    user.user_password = password;
    user.user_email = email;
    user.user_name = username;
    let response = this.httpClientService.createUser(user);
    response.subscribe((resp:DefaultResponse)=>{
        console.log(resp);
        if(resp.error!==undefined){
          alert(resp.error);
        }else{
          alert("user registered successfully");
          this.router.navigate(["/auth/login"])
        }
    });
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('email');
    console.log(user !== null);
    return (user !== null);
  }

  setUserLogout() {
    if (this.isUserLoggedIn()) {
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('token');
    } else {
      alert('cannot find user');
    }
  }
}
