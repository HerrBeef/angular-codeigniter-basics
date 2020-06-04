import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Permission } from '../models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  public loggedin: boolean = false;
  public permissions: Permission[] = [];

  constructor(private http: HttpClient) {
    this.checklogin();
  }

  checklogin() {
    this.http.get('/api/authentification/checkloggedin', {withCredentials: true}).subscribe(data => {
      this.loggedin = (data as any).success;
      if(this.loggedin) {
        this.getpermissions();
      }
    });
  }

  login(email: string, password: string) {
    this.http.post('/api/authentification/login', { username: email, password: password }, { withCredentials: true }).subscribe(data => {
      this.loggedin = (data as any).success
      this.permissions = (data as any).permissions;
    });
  }

  logout() {
    this.http.get('/api/authentification/logout', { withCredentials: true }).subscribe(data => {
      this.loggedin = false
      this.permissions = [];
    });
  }

  getpermissions() {
    this.http.post('/api/authentification/getpermissions', { withCredentials: true }).subscribe(data => {
      this.permissions = (data as any).permissions;
    });
  }
}
