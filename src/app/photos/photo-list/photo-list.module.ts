import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { DarkOnHoverDirective } from 'src/app/shared/directives/dark-on-hover/dark-on-hover.directive';
import { DarkOnHoverModule } from 'src/app/shared/directives/dark-on-hover/dark-on-hover.module';
import { PhotoModule } from '../photo/photo.module';
import { FilterByDescription } from './filter-by-description.pipe';
import { LoadButtonComponent } from './load-button/load-button.component';
import { PhotoListComponent } from './photo-list.component';
import { PhotosComponent } from './photos/photos.component';
import { SearchComponent } from './search/search.component';

@NgModule({
	declarations: [
		PhotoListComponent,
		PhotosComponent,
		LoadButtonComponent,
		FilterByDescription,
		SearchComponent
	],
	exports: [
		
	],//para que fique acessível no template de outro componente. Vazio quando ninguem de fora vai usar nenhum declaration
	imports: [
		PhotoModule,
		CommonModule,
		CardModule,
		DarkOnHoverModule,
		RouterModule
	]
})
export class PhotosListModule {
}