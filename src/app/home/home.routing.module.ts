import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../core/auth/login.guard';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';

const routes: Routes = [
	{ 
		path: '',
		component: HomeComponent,
		canActivate: [LoginGuard],
		children: [
			{
				path: '',
				component: LoginComponent,
				data: {
					title: 'Login'
				}
			},
			{
				path: 'signup',
				component: SignUpComponent,
				data: {
					title: 'Signup'
				}
			}
		]
	},
]

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule //RouterModule vai ficar visivel a quem importar AppRoutingModule
	]
})
export class HomeRoutingModule {

}