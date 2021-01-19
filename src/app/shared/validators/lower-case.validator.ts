import { AbstractControl } from '@angular/forms';

export class lowerCaseValidator {
	
	static lowerCase() {

		return(control: AbstractControl) => {
			//se possui conteudo e nao segue o padrão da expressao regular
			if(control.value.trim() && !(/^[a-z0-9_\-]+$/).test(control.value)) { 
				return {lowercase: true}
			}
			return null;
		}
	}

} 
