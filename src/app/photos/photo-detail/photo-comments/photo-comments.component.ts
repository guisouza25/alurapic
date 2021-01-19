import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PhotoComment } from './photo-comment';
import { PhotoService } from '../../photo/photo.service';

@Component({
	selector: 'ap-photo-comments',
	templateUrl: './photo-comments.component.html',
	styleUrls: ['photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {
	
	@Input() photoId: number
	@Input() allowComments: boolean
	placeholder: string ;

	commentsForm: FormGroup
	comments$ : Observable<PhotoComment[]>

	constructor(
		private formBuilder: FormBuilder,
		private photoService: PhotoService
		) {}

	ngOnInit(): void {
		
		this.placeholder = this.allowComments ? 'Insert your comment here' : 'Comments disabled'
		
		//photoId - o mesmo nome que está no appRoutingModule
		this.comments$ = this.photoService.getComments(this.photoId)
		
		this.commentsForm = this.formBuilder.group({
			commentText: [{value: '', disabled: !this.allowComments}, Validators.maxLength(300)]
		})
	}

	save() {
		const commentText: string = this.commentsForm.get('commentText').value
		this.comments$ = this.photoService
			.addComment(this.photoId, commentText)
			.pipe(switchMap( () => this.photoService.getComments(this.photoId)))
			.pipe(tap( () => {
				this.commentsForm.reset
			},
			err => console.log(err)))
	}
}