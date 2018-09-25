import { Component, OnInit } from '@angular/core';

import { Lion } from '../lion';
import { LionService } from '../lion.service';

@Component({
  selector: 'app-lions',
  templateUrl: './lions.component.html',
  styleUrls: ['./lions.component.css']
})
export class LionsComponent implements OnInit {
  lions: Lion[];

  constructor(private lionService: LionService) { }

  ngOnInit() {
    this.getLions();
  }

  getLions(): void {
    this.lionService.getLions()
      .subscribe(lions => this.lions = lions);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.lionService.addLion({ name } as Lion)
      .subscribe(lion => {
        this.lions.push(lion);
      });
  }

  delete(lion: Lion): void {
    this.lions = this.lions.filter(l => l !== lion);
    this.lionService.deleteLion(lion).subscribe();
  }

}
