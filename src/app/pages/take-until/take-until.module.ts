import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TakeUntilComponent } from './take-until.component';

const routes: Routes = [
  {
    path: '**',
    component: TakeUntilComponent,
  }
];

@NgModule({
  declarations: [TakeUntilComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class TakeUntilModule {
}
