import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {
  constructor(public authentificationService: AuthentificationService) {
  }

  public login(authForm: NgForm){
    if(authForm.valid){
      this.authentificationService.login(authForm.value.username, authForm.value.password);
    }
  }

  ngOnInit() {
  }
}
