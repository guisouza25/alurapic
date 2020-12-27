
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/core/user/userdto';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';


@Component({
	selector: 'ap-signup',
	templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit {

	signupForm: FormGroup;
	signupSuccess = false;
	alertText = '';
	type = '';

	constructor(
		private formBuilder: FormBuilder,
		private userNotTakenValidatorService: UserNotTakenValidatorService,
		private signUpService: SignUpService,
		private router: Router,
	) {}

	ngOnInit(): void {

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
					lowerCaseValidator.lowercase(),
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

				this.alertText = 'SignUp successfully, please login.'
				this.type = 'success';
				this.signupSuccess = true

				setTimeout(() => { this.router.navigate(['']) }, 3000),

				err => console.log(err)
			});
	}
}