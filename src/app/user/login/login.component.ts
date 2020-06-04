import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../controller/service/user.service';
import {User} from '../../controller/model/user.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../controller/service/auth.service';
import {TokenStorageService} from '../../controller/service/token-storage.service';
import {Router} from '@angular/router';
import {SubmissionService} from '../../controller/service/submission.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup : FormGroup
  confirm = false
  form: any = {}
  progress = false

  constructor(private userService : UserService, private formBuilder: FormBuilder, private authService: AuthService,
              private tokenStorage: TokenStorageService,private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required,Validators.email]),
      pwd: new FormControl('', Validators.required),
    });
    if (this.tokenStorage.getToken()) {
      this.authService.roles = this.tokenStorage.getUser().roles;
    }
  }
  public enable(): boolean {
    return this.pwd.hasError('required') || this.email.hasError('required')
      || this.email.hasError('email');
  }
  get email(){
    return this.formGroup.get('email');
  }
  get pwd(){
    return this.formGroup.get('pwd');
  }
  public get user() : User{
    return this.userService.user;
  }

  login() {
    this.progress = true
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveRoles(data.roles)
        this.authService.getUserInfos(data.email)
        this.tokenStorage.saveToken(data.accessToken)
        window.location.href = 'home'
        // this.router.navigateByUrl('home')
      },
      err => {
        console.log(err.error.message);
        this.progress = false
      }
    );
  }

  showProgressBar() {
    return this.progress
  }
}
