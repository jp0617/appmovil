import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginform: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private Notes: NotesService
  ) {
    this.loginform = this.formBuilder.group({
      user: '',
      pass: '',
    });
  }

  ngOnInit() {}

  login = async () => {
    await this.Notes.auth(this.loginform.value).subscribe(
      (res: any) => {
        if (res != null) {
          environment.cc = res.id;
          this.router.navigate(['/home']);
        } else {
          alert('revisa tus credenciales');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
}
