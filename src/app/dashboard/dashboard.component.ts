import { Component, OnInit } from '@angular/core';
import { Lion } from '../lion';
import { LionService } from '../lion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  lions: Lion[] = [];

  constructor(private lionService: LionService) { }

  ngOnInit() {
    this.getLions();
  }

  getLions(): void {
    this.lionService.getLions()
      .subscribe(lions => this.lions = lions.slice(1, 5));
  }
}
