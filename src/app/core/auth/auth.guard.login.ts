import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({providedIn: 'root'})
export class AuthGuardLogin implements CanActivate {


	constructor(
		private userService: UserService,
		private route: Router
		) {

	}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

		if(this.userService.isLogged()) {
			this.route.navigate(['user', this.userService.getUsername()])
			return false;
		}
		return true
	}
}