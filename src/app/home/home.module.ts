import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VmessageModule } from '../shared/components/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './signup/signup.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SignUpService } from './signup/signup.service';

@NgModule({
	declarations: [
		LoginComponent,
		SignUpComponent,
		HomeComponent
	],
	imports: [ //nao precisa pois nao vai ser usado no template de outro componente
		ReactiveFormsModule,
		CommonModule,
		VmessageModule,
		RouterModule,
		HomeRoutingModule
	],
	providers: [ SignUpService ]
})
export class HomeModule {

}