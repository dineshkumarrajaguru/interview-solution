import { Component, Input, OnInit } from '@angular/core';
import { FormattedDashboardData } from '../services/marketing-analytics.service';

@Component({
  selector: 'app-mad-layout-list',
  templateUrl: './mad-layout-list.component.html',
  styleUrls: ['./mad-layout-list.component.scss']
})
export class MadLayoutListComponent implements OnInit {

  @Input()
  public layoutListData!: FormattedDashboardData;

  constructor() {
   }

  ngOnInit(): void {
  }

}
