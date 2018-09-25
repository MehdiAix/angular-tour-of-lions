import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Lion} from '../lion';
import {LionService} from '../lion.service';

@Component({
  selector: 'app-lion-search',
  templateUrl: './lion-search.component.html',
  styleUrls: ['./lion-search.component.css']
})

export class LionSearchComponent implements OnInit {
  lions$: Observable<Lion[]>;
  private searchTerms = new Subject<string>();

  constructor(private lionService: LionService) {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.lions$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.lionService.searchLions(term)),
    );
  }
}
