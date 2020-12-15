import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';

@NgModule({
	declarations: [
		CardComponent
	],
	exports: [
		CardComponent
	],//para que fique acessível no modulo que está importando. Vazio quando ninguem de fora vai usar nenhum declaration
	imports : [
		CommonModule
	]
})
export class CardModule {
}