
import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/plataform-detector/platform-detector.service';
import { UserDto } from 'src/app/core/user/userdto';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

@Injectable({providedIn: 'root'})
@Component({
	selector: 'ap-signup',
	templateUrl: './signup.component.html',
	providers: [ UserNotTakenValidatorService ]
})
export class SignUpComponent implements OnInit {

	signupForm: FormGroup;
	
	@ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

	constructor(
		private formBuilder: FormBuilder,
		private userNotTakenValidatorService: UserNotTakenValidatorService,
		private signUpService: SignUpService,
		private router: Router,
		private plataformDetectorService: PlatformDetectorService
	) {}

	ngOnInit(): void {

		this.plataformDetectorService.isPlatformBrowser() &&
		this.emailInput.nativeElement.focus()

		this.userNotTakenValidatorService.checkUserNameTaken()

		this.signupForm = this.formBuilder.group({
			email: ['', 
				[	
					Validators.required,
					Validators.email
				]
			],
			fullName: ['', 
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(40)
				]
			],
			userName: ['',
				[
					Validators.required,
					Validators.minLength(2),
					lowerCaseValidator.lowerCase(),
					Validators.maxLength(30)
				],
				this.userNotTakenValidatorService.checkUserNameTaken(),
				
			],
			password: ['',
				[
					Validators.required,
					Validators.minLength(8),
					Validators.maxLength(14)
				]
			]
		})
	}

	signup() {
		const newUser: NewUser = this.signupForm.getRawValue()

		const newUserDto: UserDto = {
			name: newUser.userName,
			fullName: newUser.fullName,
			email: newUser.email,
			password: newUser.password
		}

		this.signUpService
			.signup(newUserDto)
			.subscribe(() => {
				this.router.navigate(['']),
				err => console.log(err)
			});
	}
}