import { AppModule } from './../app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CategoryPipe } from './pipes/category.pipe';
import {MatIconModule} from '@angular/material/icon';
import { ConfimationDialogComponent } from './components/confimation-dialog/confimation-dialog.component';





@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    ConfimationDialogComponent
  ],
  imports: [
    MatDialogModule,
    CommonModule,
    MatIconModule


  ],
  exports:[
    ErrorDialogComponent,
    ConfimationDialogComponent,
    CategoryPipe
  ]
})
export class SharedModule { }
