import { Directive, ElementRef, OnInit } from '@angular/core';
import { PlatformDetectorService } from 'src/app/core/plataform-detector/platform-detector.service';

@Directive({
	selector: '[immediateClick]' //[] - para poder usar como atributo
})
export class ImmediateClickDirective implements OnInit {

	constructor(
		private element: ElementRef<any>,
		private plataformDetector: PlatformDetectorService) {

		
	}
	ngOnInit(): void {
		this.plataformDetector.isPlatformBrowser && 
		this.element.nativeElement.click();
	}
}
