import { Injectable } from '@angular/core';
import { SignUpService } from './signup.service';
import { AbstractControl } from '@angular/forms';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';

@Injectable()
export class UserNotTakenValidatorService {

    constructor(private signUpService: SignUpService) {}

    checkUserNameTaken() {

        return (control: AbstractControl) => {
			return control
					.valueChanges
					.pipe(debounceTime(300))
					//valor digitado capturado no switchMap. Pega a emissao do observable 
					//anterior e retorna a emissao do observable do checkUserNameTaken()
					//switck para o fluxo do checkUserNameTaken()	
					.pipe(switchMap(userName => 
					 	this.signUpService.checkUserNameTaken(userName)	
					))
					.pipe(map(isTaken => {
						return isTaken ? { usernametaken: true } : null
					}))
					//o sistema de validação assincrona do angular faz o subscribe
					//usa o first() para finlizar e pegar a emissao
					.pipe(first())

        }
    }
}	