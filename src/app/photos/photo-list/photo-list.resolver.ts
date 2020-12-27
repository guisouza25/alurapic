import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/core/user/user.service';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Injectable({providedIn: 'root'})
export class PhotoListResolver implements Resolve<Observable<Object>> {

	constructor(private service: PhotoService,
		private userService: UserService,
		){}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo[]> {
		const userName = route.params.userName

		return this.service
				.getPhotosFromUserPaginated(userName, 1)	
	}
}