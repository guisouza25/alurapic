import { NgModule } from '@angular/core';
import { PhotoFormComponent } from './photo-form.component';


@NgModule({
	declarations: [
		PhotoFormComponent
	],
	exports: [
		
	],//para que fique acessível no modulo que está importando. Vazio quando ninguem de fora vai usar nenhum declaration
	imports: [
	]
})
export class PhotoFormModule {
}