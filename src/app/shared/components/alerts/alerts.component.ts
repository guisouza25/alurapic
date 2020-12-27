import { Component, Input } from '@angular/core';

@Component({
	selector: 'ap-alerts',
	templateUrl: './alerts.component.html'	
})
export class AlertsComponents {

	@Input() type = '';
	@Input() alertText = '';
	@Input() class = ''
}