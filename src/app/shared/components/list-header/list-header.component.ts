import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-list-header[title]',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {
  @Input() title!: string;

  @Output() search: EventEmitter<string> = new EventEmitter();

  searchControl: FormControl = new FormControl();

  ngOnInit(): void {
    this.searchChangeListen();
  }

  /**
   * Search content change listener
   */
  searchChangeListen() {
    this.searchControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe({
        next: (value) => this.search.emit(value)
      });
  }
}
