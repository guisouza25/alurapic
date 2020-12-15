import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Photo } from '../../photo/photo';

@Component({
	selector: 'ap-photos',
	templateUrl: './photos.component.html',
	styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges {

	@Input() photos: Photo[] = []

	rows = []

	constructor() {}

	//recebe as mudancas do inbound properties deste componente. Quando a requisição de 
	//fotos é concluida a lista é atualizada. Com o ngInit o metodo groupColumns aqui é 
	//chamado apenas 1 vez, na inicialização do componente, antes da requisicao ficar pronta
	ngOnChanges(changes: SimpleChanges) {
		if(changes.photos) { //se houve mudanca na propriedade photos
			this.rows = this.groupColumns(this.photos)
		}
	}

	groupColumns(photos: Photo[]) {
		const newRows = []

		for(let index = 0; index < photos.length; index +=3) {
			newRows.push(photos.slice(index, index + 3))
		}

		return newRows
	}

	
}	
