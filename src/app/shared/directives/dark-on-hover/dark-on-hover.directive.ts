import { ElementRef, Input } from '@angular/core';
import { Renderer } from '@angular/core';
import { HostListener } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
	selector: '[apDarkOnHover]' //[] - para poder usar como atributo
})
export class DarkOnHoverDirective {

	@Input() brightness = '70%';

	constructor(private el: ElementRef, private render: Renderer) {}

    @HostListener('mouseover')
    darkenOn() {
		this.render.setElementStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`);
		
    }
    
    @HostListener('mouseleave')
    darkenOff() {
        this.render.setElementStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
    }
    

}
