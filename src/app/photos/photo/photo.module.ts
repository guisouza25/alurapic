import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PhotoComponent } from './photo.component';

@NgModule({
	declarations: [
		PhotoComponent
	],
	exports: [
		PhotoComponent
	],//para que fique acessível no modulo que está importando. Vazio quando ninguem de fora vai usar nenhum declaration
	imports : [
		CommonModule,
		HttpClientModule
	]
})
export class PhotoModule {
}