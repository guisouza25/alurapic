
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { PhotoModule } from './photo/photo.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotosListModule } from './photo-list/photo-list.module';

@NgModule({
	declarations: [
	
	],
	exports: [
		
	],//para que fique acessível no modulo que está importando. Vazio quando ninguem de fora vai usar nenhum declaration
	imports: [
		PhotoModule, 
		PhotoFormModule,
		PhotosListModule,
		CommonModule
	]
})
export class PhotosModule {
}