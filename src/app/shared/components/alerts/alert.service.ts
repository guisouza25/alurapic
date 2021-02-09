import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Alert, AlertType } from './alert';

@Injectable({providedIn: 'root'})
export class AlertService {

	private alertSubject: BehaviorSubject<Alert> = new BehaviorSubject<Alert>(new Alert(AlertType.DANGER, 'ssss'));
	private keepAfterRouteChange = false;

	constructor(private router: Router) {
		this.router.events.subscribe(event => {

			if(event instanceof NavigationStart) {

				if(this.keepAfterRouteChange) {
					this.keepAfterRouteChange = false;
				} else {
					this.clear()
				}
			}
		});
	}


	success(message: string, keepAfterRouteChange: boolean = false) {
		this.alert(AlertType.SUCCESS, message, keepAfterRouteChange)
	}

	warning(message: string, keepAfterRouteChange: boolean = false) {
		this.alert(AlertType.WARNING, message, keepAfterRouteChange)
	}

	danger(message: string, keepAfterRouteChange: boolean = false) {
		this.alert(AlertType.DANGER, message, keepAfterRouteChange)
	}

	info(message: string, keepAfterRouteChange: boolean = false) {
		this.alert(AlertType.INFO, message, keepAfterRouteChange)
	}

	private alert(
		alertType: AlertType, 
		message: string, 
		keepAfterRouteChange: boolean) {

		this.keepAfterRouteChange = keepAfterRouteChange;

		this.alertSubject.next(new Alert(alertType, message))
	}

	getAlertSubject(): Observable<Alert> {
		return this.alertSubject.asObservable();
	}

	clear() {
		this.alertSubject.next(null)
	}

}