import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VmessageModule } from '../shared/components/vmessage/vmessage.module';
import { AlertsModule } from '../shared/components/alerts/alerts.module';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './signup/signup.component';

@NgModule({
	declarations: [
		LoginComponent,
		SignUpComponent
	],
	imports: [ //nao precisa pois nao vai ser usado no template de outro componente
		ReactiveFormsModule,
		CommonModule,
		VmessageModule,
		RouterModule,
		AlertsModule
	]
})
export class HomeModule {

}