import { Component, Input, OnInit } from '@angular/core';
import { Layout } from '../services/marketing-analytics.service';

@Component({
  selector: 'app-mad-data-point-item',
  templateUrl: './mad-data-point-item.component.html',
  styleUrls: ['./mad-data-point-item.component.scss']
})
export class MadDataPointItemComponent implements OnInit {

  @Input()
  layoutDetail!: Layout;

  constructor() { }

  ngOnInit(): void {
  }

}
