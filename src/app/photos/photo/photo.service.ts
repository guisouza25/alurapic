
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TokenService } from 'src/app/core/token/token.service';
import { UserService } from 'src/app/core/user/user.service';
import { Photo } from "./photo";

const API = 'http://localhost:3000'

@Injectable({providedIn: 'root'}) //qualquer componente pode utilizar este service
export class PhotoService {

	

	public constructor(
		private http: HttpClient,
		private tokenservice: TokenService,
		private userService: UserService
		) {
		
	}

	getPhotosFromUser(userName: string) {
		let response = this.http
			.get<Photo[]>(API + `/${userName}/photos`)
		return response;
		
	}

	getPhotosFromUserPaginated(userName: string, page: number) {
		
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': "Bearer " + this.tokenservice.getToken()
		  })

		const params = new HttpParams()
			.append('page', page.toString());
			
		
		let response = this.http
			.get<Photo[]>(API + `/${userName}/photos`, {headers: headers, params: params})
			.pipe(catchError(response => {
				if(response.status == 401) {
					this.userService.tokenExpires()
					return EMPTY;
				}
			}))
		return response;
	}
	
	
}	
