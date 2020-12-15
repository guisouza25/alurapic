import { TryCatchStmt } from '@angular/compiler';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'

@Component({
	selector: 'ap-search',
	templateUrl: './search.component.html'
})
export class SearchComponent  {
	
	@Output() onTyping = new EventEmitter<string>()
	@Input() value;
	debounce: Subject<string> = new Subject<string>();
	
	ngOnInit(): void {
		this.debounce //debounce.next('f') //emitir um valor
		.pipe(debounceTime(300))
		.subscribe(filter => this.onTyping.emit(filter))
	}

	
}