import { NgModule } from '@angular/core';

import {  MatButtonModule, 
          MatCheckboxModule, 
          MatMenuModule,
          MatTabsModule, 
          MatCardModule, 
          MatIconModule,
          MatFormFieldModule, 
          MatInputModule, 
          MatTableModule, 
          MatToolbarModule, 
          MatSortModule,  
          MatSidenavModule,
          MatRadioModule, 
          MatSnackBarModule, 
          MatSliderModule  } from '@angular/material';
import {  MatDialogModule} from '@angular/material/dialog';
import {  MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [],
  imports: [
          MatButtonModule, 
          MatCheckboxModule, 
          MatMenuModule,
          MatTabsModule, 
          MatCardModule, 
          MatIconModule,
          MatFormFieldModule, 
          MatInputModule, 
          MatTableModule, 
          MatToolbarModule, 
          MatSortModule,  
          MatSidenavModule,
          MatRadioModule, 
          MatSnackBarModule, 
          MatSliderModule,
          MatDialogModule, 
          MatSlideToggleModule
  ],
  exports: [
          MatButtonModule, 
          MatCheckboxModule, 
          MatMenuModule,
          MatTabsModule, 
          MatCardModule, 
          MatIconModule,
          MatFormFieldModule, 
          MatInputModule, 
          MatTableModule, 
          MatToolbarModule, 
          MatSortModule,  
          MatSidenavModule,
          MatRadioModule, 
          MatSnackBarModule, 
          MatSliderModule,
          MatDialogModule, 
          MatSlideToggleModule
  ]
})
export class MaterialModule { }
