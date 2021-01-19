import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alerts/alert.service';
import { PhotoService } from '../photo/photo.service';

@Component({
	selector: 'ap-photo-form',
	templateUrl: './photo-form.component.html',
	styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

	photoForm: FormGroup;
	file: File;
	preview: String;
	percentDone = 0;

	constructor(
		private renderer2: Renderer2,
		private formBuilder: FormBuilder,
		private photoService: PhotoService,
		private router: Router,
		private userService: UserService,
		private alertService: AlertService
	){}

	ngOnInit() {

		this.photoForm = this.formBuilder.group({
			file: [null,
				Validators.required,
			
			],
			description: ['',
				Validators.maxLength(250)
			],
			allowComments: [true]
		})
	}


	upload() {
		const description = this.photoForm.get('description').value;
		const allowComments = this.photoForm.get('allowComments').value;
		this.photoService
			.upload(description, allowComments, this.file)
			
			.subscribe(
				(event: HttpEvent<any>) => {
					//esse evento é disparado a cada pedaço de upload
					if(event.type == HttpEventType.UploadProgress) { //enquanto esta fazendo upload
						
						this.percentDone = Math.round(100 * event.loaded / event.total);
					
					} else if(event.type == HttpEventType.Response) { // acabou o upload
						
						this.router.navigate(['/user', this.userService.getUserName()])
						this.alertService.success('Photo upload complete')
					} 
				},
				err => {
					console.log(err)

					if(err.status == 401) {
						
						this.userService.tokenExpires()
						this.alertService.danger('Token has expired. Please login again.')
					
					} else {

						this.router.navigate(['/user', this.userService.getUserName()])
						this.alertService.danger('Upload error!');
					}
				}
			)				
	}

	handleFile(file: File) {
		this.file = file;
		const reader = new FileReader();
		reader.onload = (event: any) => this.preview = event.target.result;
		reader.readAsDataURL(file)
	}
}
