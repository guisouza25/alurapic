import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardUser } from './core/auth/auth.guard.user';
import { AuthGuardLogin } from './core/auth/auth.guard.login';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { LoginComponent } from './home/login/login.component';

import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { SignUpComponent } from './home/signup/signup.component';

const routes: Routes = [
	{ 
		path: '', 
		component: LoginComponent,
		canActivate: [AuthGuardLogin]
	},
	{ 
		path: 'signup', 
		component: SignUpComponent,
	},
	{ 
		path: 'user/:userName',
		component: PhotoListComponent,
		resolve: {
			photos: PhotoListResolver
		}
	},
	{ path: 'p/add', component: PhotoFormComponent },
	{ path: '**', component: NotFoundComponent }
]

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule //RouterModule vai ficar visivel a quem importar AppRoutingModule
	]
})
export class AppRoutingModule {

}