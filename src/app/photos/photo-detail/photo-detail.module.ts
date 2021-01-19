import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VmessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { ShowIfLoggedModule } from 'src/app/shared/directives/show-if-logged/show-if-logged.module';
import { PhotoModule } from '../photo/photo.module';
import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';
import { PhotoDetailComponent } from './photo-detail.component';
import { PhotoOwnerDirective } from './photo-owner-only.directive/photo-owner-only.directive';

@NgModule({
	declarations: [
		PhotoDetailComponent,
		PhotoCommentsComponent,
		PhotoOwnerDirective //nao exporta pois esta sendo usada penas pelos componentes de photo-detail
	],
	exports: [
		PhotoDetailComponent,
		PhotoCommentsComponent,
	],
	imports: [
		CommonModule,
		PhotoModule,
		RouterModule,
		ReactiveFormsModule,
		VmessageModule,
		ShowIfLoggedModule
	]
})
export class PhotoDetailModule {

}