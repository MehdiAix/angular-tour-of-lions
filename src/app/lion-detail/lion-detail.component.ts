import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Lion }         from '../lion';
import { LionService }  from '../lion.service';

@Component({
  selector: 'app-lion-detail',
  templateUrl: './lion-detail.component.html',
  styleUrls: [ './lion-detail.component.css' ]
})
export class LionDetailComponent implements OnInit {
  @Input() lion: Lion;

  constructor(
    private route: ActivatedRoute,
    private lionService: LionService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getLion();
  }

  getLion(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.lionService.getLion(id)
      .subscribe(lion => this.lion = lion);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.lionService.updateLion(this.lion)
      .subscribe(() => this.goBack());
  }
}
