import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  invalidCredentials: boolean = false;
  invalidCredentialsSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.invalidCredentialsSubscription = this.authService.invalidUserEmitter
      .subscribe(
        (isInvalid) => {
          this.invalidCredentials = isInvalid;
        }
      )
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
  }

  ngOnDestroy() {
    this.invalidCredentialsSubscription.unsubscribe();
  }

}
