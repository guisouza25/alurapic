
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Photo } from "./photo";
import { PhotoComment } from '../photo-detail/photo-comments/photo-comment';
import { environment } from '../../../environments/environment';

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' }) //qualquer componente pode utilizar este service
export class PhotoService {



	public constructor(private http: HttpClient) {}

	getPhotosFromUser(userName: string) {
		let response = this.http
			.get<Photo[]>(API + `/${userName}/photos`)
		return response;

	}

	getPhotosFromUserPaginated(userName: string, page: number) {

		// const headers = new HttpHeaders({
		// 	'Content-Type': 'application/json',
		// 	'Authorization': "Bearer " + this.tokenservice.getToken()
		//   })

		const params = new HttpParams()
			.append('page', page.toString());

		let response = this.http
			.get<Photo[]>(API + `/${userName}/photos`, {params: params})
		// .pipe(catchError(response => {
		// 	if(response.status == 401) {
		// 		this.userService.tokenExpires()
		// 		return EMPTY;
		// 	}
		// }))
		return response;
	}

	upload(description: string, allowComments: boolean, file: File) {

		const httpOptions = {
			headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})
		  }

		const formData = new FormData();
		formData.append('description', description);
		formData.append('allowComments', allowComments ? 'true' : 'false');
		formData.append('photo', file);
		formData.append('photoType', file.type);
		
		console.log(file)

		return this.http
			.post(API + '/photos/upload', formData, {observe: 'events', reportProgress: true});
	}

	findById(photoId: number) {

		return this.http
			.get<Photo>(API + `/photos/${photoId}`);
	}
	
	getComments(photoId: number) {
		return this.http
			.get<PhotoComment[]>(API + `/photos/${photoId}/comments`);
	}
	
	addComment(photoId: number, commentText: string) {
		return this.http
			.post(API + `/photos/${photoId}/comments`, {text: commentText});    
	}   
	
	removePhoto(photoId: number) {
		return this.http.delete(API + `/photos/${photoId}` );
	}

	like(photoId: number) {

		return this.http
		.post(API + `/photos/${photoId}/like`, {}, {observe: 'response'})
        .pipe(map(res => true))
        .pipe(catchError(err => {
            return err.status == '304' ? of(false) : throwError(err);
		}));
	}
}	
