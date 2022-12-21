import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../../model/UserModel';
import {DefaultResponse} from '../../model/DefaultResponse';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  constructor(
    private httpclient: HttpClient
  ) {
  }

  /*
  * Get All users
  * */
  getUser() {

    console.log('getEmployees invoked');
    return this.httpclient.get<UserModel[]>('http://localhost:8080/api/user',this.getHeaders());
  }

  /*
  * Delete user by Id
  * */
  public deleteUser(user: UserModel) {
    return this.httpclient.delete<UserModel>('http://localhost:3000/api/user' + '/' + user.user_id,this.getHeaders());
  }

  /*
  * Create User by using user model
  * */
  public createUser(user: UserModel) {
    console.log("httpclient-createUser invoked")
    return this.httpclient.post<DefaultResponse>('http://localhost:3000/api/auth/register', user);
  }

  /*
  * Validate user with email and password
  * */
  public userLogin(email, password) {
    let user = new UserModel();
    user.user_email=email;
    user.user_password=password;
    return this.httpclient.post<DefaultResponse>('http://localhost:3000/api/auth/login',user);
  }

  getHeaders() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'X-Access-Token': sessionStorage.getItem('token')
    });
    return { headers: headers };
  }

}
