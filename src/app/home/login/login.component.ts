import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/plataform-detector/platform-detector.service';



@Component({
	selector: 'ap-login', //opcional pois sera utilizado apenas pelo sistema de rotas
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	loginFail = false;
	alertText = '';
	type = '';

	//ElementRef wrapper do elemento do dom
	@ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private plataformDetectorService: PlatformDetectorService
		) {}

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			userName: ['', Validators.required],
			password: ['', Validators.required]
		})
		this.userNameInput.nativeElement.focus()
	}

	login() {
		const userName = this.loginForm.get('userName').value;
		const password = this.loginForm.get('password').value;
		
		this.authService
			.authenticate(userName, password)
			.subscribe(
				() => this.router.navigate(['user', userName]),
				err => {
					this.loginForm.reset()
					this.plataformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
					this.alertText = 'Invalid login or username! Try again.'
					this.type = 'danger'
					this.loginFail = true;
					setTimeout(() =>{
						this.loginFail = false;
					}, 4000)
					console.log(err)
				} 	
			);

	}
}