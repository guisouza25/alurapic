import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';
import { debounce } from '../../shared/decorators/debounce'
import { LoadingService } from 'src/app/shared/components/loading/loading.service';


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
		private photoService: PhotoService,
		private loadingService: LoadingService
		) {} //constructor apenas para injeção de dependência
	
	//troquei pelo resolver que resolve os dados que o componente depende antes de o componente ser carregado
	//fiz isso para evitar que o 'Sorry, no photos found' apareca ao apertar f5
	ngOnInit() {
		this.loadingService.start()
		//userName é o mesmo que está no path no modulo de rotas
		//este data.photos é a propriedade photos que recebe o PhotoListResolver em 
		//app.routing para o path 'user/:userName'

		// this.userName = this.activatedRoute.snapshot.params.userName
		// this.photos = this.activatedRoute.snapshot.data.photos
		
		//para conseguir trocar entre rotas de usuarios
		this.activatedRoute.params.subscribe(params => {
			this.userName = params.userName
			this.photos = this.activatedRoute.snapshot.data['photos']
		})
		
	}		

	@debounce(300)
	load() {
		const t1 = performance.now()
		this.photoService
			.getPhotosFromUserPaginated(this.userName, ++this.currentPage)
			.subscribe(
				photos => {
					console.log(photos)
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
