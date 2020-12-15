
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Photo } from "./photo";

const API = 'http://localhost:3000'

@Injectable({providedIn: 'root'}) //qualquer componente pode utilizar este service
export class PhotoService {

	private http: HttpClient;

	public constructor(http: HttpClient) {
		this.http = http;
	}

	getPhotosFromUser(userName: string) {
		let response = this.http
			.get<Photo[]>(API + `/${userName}/photos`)
		return response;
	}

	getPhotosFromUserPaginated(userName: string, page: number) {
		const params = new HttpParams().append('page', page.toString())
		let response = this.http
			.get<Photo[]>(API + `/${userName}/photos`, {params: params})
		return response;
	}
	
	
}	
