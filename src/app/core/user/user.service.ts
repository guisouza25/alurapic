import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from '../token/token.service';
import { User } from './User';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class UserService {

	//problema ao recarregar a pagina
	//quando o header component é renderizado a emissao do user no subject ja passou
	//entao eu uso o BehaviorSubject. Ele emite um valor logo ni início. Se não houver 
	//subscribe ele guarda esse valor(null). Quando tem um subscribe tem acesso ao ultimo
	//valor emitido. Entao quando o header e carregado tem acesso ao user
	private userSubject = new BehaviorSubject<User>(null);
	private user: User;
	private userName: string;

    constructor(
		private tokenService: TokenService,
		private router: Router) {

		this.tokenService.hasToken() &&
		this.decodeAndNotify()
	}

	 decodeAndNotify() {
		 const token = this.tokenService.getToken();
		 const user = jwt_decode(token).user as User;
		 this.user = user
		 this.userName = user.name
		 this.userSubject.next(user)
	 }
	 
    setToken(token: string) {
		this.tokenService.setToken(token);
		this.decodeAndNotify();
    }

	getUserAsObservable() {
		return this.userSubject
	}

	logout() {
		this.tokenService.removeToken();
		this.userSubject.next(null)
	}

	tokenExpires() {
		this.logout()
		this.router.navigate([''])
	}

	isLogged() {
		return this.tokenService.hasToken();
	}

	getUser(): User {
		return this.user
	}

	getUserName(): string {
		return this.userName
	}
}	
