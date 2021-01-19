import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VmessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { ImmediateClickModule } from 'src/app/shared/directives/immediate-click/immediate-click.module';
import { PhotoModule } from '../photo/photo.module';
import { PhotoFormComponent } from './photo-form.component';


@NgModule({
	declarations: [
		PhotoFormComponent
	],
	exports: [
		
	],//para que fique acessível no modulo que está importando. Vazio quando ninguem de fora vai usar nenhum declaration
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		VmessageModule,
		RouterModule,
		PhotoModule,
		ImmediateClickModule
	]
})
export class PhotoFormModule {
}