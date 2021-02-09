import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/plataform-detector/platform-detector.service';




@Component({
	selector: 'ap-login', //opcional pois sera utilizado apenas pelo sistema de rotas
	templateUrl: './login.component.html',
	styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

	fromUrl: string
	loginForm: FormGroup;

	//ElementRef wrapper do elemento do dom
	@ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private plataformDetectorService: PlatformDetectorService,
		private activatedRoute: ActivatedRoute
		) {}

	ngOnInit(): void {

		this.activatedRoute.queryParams.subscribe(params => {
			this.fromUrl = params['fromUrl'] //propriedade criada dinamicamente poderia ser (params.fromUrl)
		})

		this.loginForm = this.formBuilder.group({
			userName: ['', Validators.required],
			password: ['', Validators.required]
		})

		this.plataformDetectorService.isPlatformBrowser() && 
		this.userNameInput.nativeElement.focus();
	}

	login() {
		const userName = this.loginForm.get('userName').value;
		const password = this.loginForm.get('password').value;
		
		this.authService
			.authenticate(userName, password)
			.subscribe(
				() =>  {
					if(this.fromUrl) {
						this.router.navigateByUrl(this.fromUrl)
					} else {
						this.router.navigate(['user', userName])
					}
				},
				err => {
					this.loginForm.reset()
					this.plataformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
					console.log(err)
				} 	
			);

	}
}