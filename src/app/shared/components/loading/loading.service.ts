import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { LoadingType } from './loading.type';

@Injectable({ providedIn: 'root' })
export class LoadingService {

	private loadingSubject: Subject<LoadingType> = new Subject<LoadingType>()


	getLoading() {
		return this.loadingSubject
			.asObservable()
			.pipe(startWith(LoadingType.STOPPED));
	}


	start() {
		return this.loadingSubject.next(LoadingType.LOADING)
	}

	stop() {
		return this.loadingSubject.next(LoadingType.STOPPED)
	}
 }