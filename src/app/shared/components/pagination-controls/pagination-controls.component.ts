import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-pagination-controls',
  templateUrl: './pagination-controls.component.html',
  styleUrls: ['./pagination-controls.component.scss']
})
export class PaginationControlsComponent implements OnChanges, OnInit {
  @Input() itemsPerPage!: number;
  @Input() currentPage!: number;
  @Input() totalCount!: number;

  @Output() itemsPerPageChanged: EventEmitter<number> = new EventEmitter();
  @Output() loadPrev: EventEmitter<void> = new EventEmitter();
  @Output() loadNext: EventEmitter<void> = new EventEmitter();

  itemsPerPageFormControl!: FormControl

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['itemsPerPage'] && !changes['itemsPerPage'].firstChange) {
      this.itemsPerPageFormControl?.setValue(changes['itemsPerPage'].currentValue, {
        emitEvent: false
      })
    }
  }

  ngOnInit(): void {
    this.itemsPerPageFormControl = new FormControl<number>(this.itemsPerPage, Validators.min(1));
    this.itemsPerPageFormControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe({
        next: (value: number) => {
          if(this.itemsPerPageFormControl.valid && value) {
            this.itemsPerPageChanged.emit(value);
          }
        }
      });
  }

  /**
   * Count the number of pages based on the number of elements per page
   * @returns number
   */
  computeNumberOfPage(): number {
    if(this.itemsPerPage == 0) return 0;
    return Math.ceil(this.totalCount / this.itemsPerPage)
  }

}
