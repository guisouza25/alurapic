import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertsComponents } from './alerts.component';


@NgModule({
	declarations: [
		AlertsComponents
	],
	exports: [
		AlertsComponents
	],//para que fique acessível no modulo que está importando. Vazio quando ninguem de fora vai usar nenhum declaration
	imports : [
		CommonModule
	]
})
export class AlertsModule {
}