import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { CardListComponent } from 'src/app/components/card-list/card-list.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CardListComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [ CardListComponent],
})
export class ComponentsModule {}
