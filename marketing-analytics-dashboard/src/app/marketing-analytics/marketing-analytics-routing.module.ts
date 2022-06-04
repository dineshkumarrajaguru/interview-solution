import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaDashboardComponent } from './ma-dashboard/ma-dashboard.component';

const routes: Routes = [{
  path: '',
  component: MaDashboardComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingAnalyticsRoutingModule { }
