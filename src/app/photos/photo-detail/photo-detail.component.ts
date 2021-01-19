import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/core/token/token.service';
import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alerts/alert.service';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
	templateUrl: './photo-detail.component.html'
})
export class PhotoDetailComponent implements OnInit {
	
	photo$: Observable<Photo>;
	photoId:number

	constructor(
		private activatedRoute: ActivatedRoute,
		private photoService: PhotoService,
		private router: Router,
		private alertService: AlertService,
		private userService: UserService
		) {}


	ngOnInit(): void {
		//photoId - o mesmo nome que está no appRoutingModule
		this.photoId = this.activatedRoute.snapshot.params.photoId;
		this.photo$ = this.photoService.findById(this.photoId)
		this.photo$.subscribe(() => {}, err => {
			console.log(err);
			this.router.navigate(['not-found'])
		})
	}

	remove() {
		this.photoService
		.removePhoto(this.photoId)
		.subscribe(
			() => {
				this.router.navigate(['/user', this.userService.getUserName()])
				this.alertService.success('Photo removed')
			},
			err => {
				console.log(err)
				if(err.status = 401) {
					this.userService.tokenExpires()
					this.alertService.danger('Token has expired. Please login again.')
				}
			});
	}

	like(photo: Photo) {
    this.photoService
    .like(photo.id)
    .subscribe(liked => {
        if(liked) {
            this.photo$ = this.photoService.findById(photo.id);
        }
    });
}

}