import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
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
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  formGroup : FormGroup
  progress = false
  error = false
  hide = true;
  constructor(private userService : UserService, private formBuilder: FormBuilder, private authService: AuthService,
              private tokenStorage: TokenStorageService,private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required,Validators.email]),
      pwd: new FormControl('', Validators.required),
    });
    if (this.tokenStorage.getToken()) {
      this.authService.roles = this.tokenStorage.getRoles();
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
    if(!this.enable()){
      this.progress = true
      this.error=false
      this.authService.login(this.formGroup.value).subscribe(
        data => {
          console.log(data)
          this.tokenStorage.saveRoles(data.roles)
          this.tokenStorage.saveToken(data.accessToken)
          this.authService.getUserInfos(data.email).then(user => {
            this.tokenStorage.saveUser(user)
             window.location.href = 'journal/home'
          }, error => {

          })
          // this.router.navigateByUrl('home')
        },
        err => {
          this.progress = false
          this.error = true
        }
      );
    }
  }

  showProgressBar() {
    return this.progress
  }
}
