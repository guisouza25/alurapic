import { Component, Input } from "@angular/core";

@Component({
	selector: 'ap-photo',
	templateUrl: 'photo.component.html'
})
export class PhotoComponent {
	//a string passada em <ap-photo description> vem aqui, vai ser o valor
	//da propriedade. O data biding com [] vai procurar a propriedade
	@Input() description = ''; 
  	@Input() url = ''
}