import { NgModule } from "@angular/core";
import { PhotoComponent } from "./photo/photo.component";

@NgModule({
	declarations: [PhotoComponent],
	exports: [PhotoComponent]//para que fique acessível no modulo que está importando
})
export class PhotosModule {

}