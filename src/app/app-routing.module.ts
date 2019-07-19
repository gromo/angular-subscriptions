import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'unsubscribe',
    loadChildren: () => import('./pages/unsubscribe/unsubscribe.module').then(mod => mod.UnsubscribeModule),
  },
  {
    path: 'take-until',
    loadChildren: () => import('./pages/take-until/take-until.module').then(mod => mod.TakeUntilModule),
  },
  {
    path: 'take-while',
    loadChildren: () => import('./pages/take-while/take-while.module').then(mod => mod.TakeWhileModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
