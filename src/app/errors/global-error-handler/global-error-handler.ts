import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, InjectionToken, Injector, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import * as StackTrace from 'stacktrace-js'
import { environment } from '../../../environments/environment'
/*
para poder fazer injeção de dependenência
sem provided pois já está provido no errors module
*/
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	
	constructor(private injector: Injector) {}

	handleError(error: any): void {
		
		//injeção de dependência por demanda
		const location = this.injector.get(ActivatedRoute as Type<ActivatedRoute>)
		const userService = this.injector.get(UserService as Type<UserService>)
		const router = this.injector.get(Router as Type<Router>)

		const url = location instanceof PathLocationStrategy ? location.path() : ''

		const message = error.message ? error.message : error.toString() 

		if(environment.production) router.navigate(['/error']);

		StackTrace
			.fromError(error)
			.then(stackFrames => {
				const stackAsString = stackFrames
					.map(frame => frame.toString())
					.join('\n')
				

				//enviar para o back-end
				console.log(
					{
						message: message, 
						url: url, 
						userName: userService.getUserName(), 
						stack: stackAsString
					})
			})
	}

}