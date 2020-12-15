import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';
import { debounce } from '../../helpers/decorators/debounce'

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

	title = 'alurapic';
	photos: Photo[] = [];
	filter = '';
	hasMore: boolean = true
	currentPage: number = 1
	userName: string = ''

	constructor(
		private activatedRoute: ActivatedRoute,
		private photoService: PhotoService
		) {} //constructor apenas para injeção de dependência
	
	//troquei pelo resolver que resolve os dados que o componente depende antes de o componente ser carregado
	//fiz isso para evitar que o 'Sorry, no photos found' apareca ao apertar f5
	ngOnInit() {
		//este data.photos é a propriedade photos que recebe o PhotoListResolver em 
		//app.routing para o path 'user/:userName'
		this.userName = this.activatedRoute.snapshot.params.userName
		this.photos = this.activatedRoute.snapshot.data.photos
		
		// //userName é o mesmo que está no path no modulo de rotas
		// const userName = this.activatedRoute.snapshot.params.userName
		// this.photoService
		// .getPhotosFromUser(userName)
		// .subscribe(photos => this.photos = photos)
	}		

	@debounce(300)
	load() {
		const t1 = performance.now()
		this.photoService
			.getPhotosFromUserPaginated(this.userName, ++this.currentPage)
			.subscribe(photos => {
				this.filter = ''
				this.photos = this.photos.concat(photos)
				if(!photos.length) this.hasMore = false
			})
		const t2 = performance.now()
		console.log(t2-t1)
	}

	clearInput() {
		let input: HTMLInputElement = document.querySelector('.rounded')
		input.value = ''
	}
}
