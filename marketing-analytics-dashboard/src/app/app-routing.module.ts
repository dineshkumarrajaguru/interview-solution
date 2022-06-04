import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'reports',
  loadChildren: () => import('./marketing-analytics/marketing-analytics.module').then(m => m.MarketingAnalyticsModule)
},
{
  path: '**',
  redirectTo: 'reports'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
