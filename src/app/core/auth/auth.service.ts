import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';

const API = 'http://localhost:3000'

//uma unica instancia para a aplicação. nao pertence a um módulo
@Injectable({providedIn: 'root'}) 
export class AuthService {

  constructor(
		private http: HttpClient,
		private userService: UserService
	) {}

  authenticate(userName: string, password: string) {
	  return this.http
		  .post(
				API + '/user/login',
				{ name: userName, password: password },
				{ observe: 'response' } //ter acesso a tudo da resposta, inclusive cabecalho
			)
		  .pipe(tap(response => { //executado antes do subscribe
				const token = response.headers.get('bearer-token')
				this.userService.setToken(token)
		  }))
  }
}
