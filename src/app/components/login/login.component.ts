import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  faUser = faUser;
  constructor(private router: Router) { }

  ngOnInit() {}

  login(){
    //alert('Hola');
    this.router.navigate(['/home']);
  }

}
