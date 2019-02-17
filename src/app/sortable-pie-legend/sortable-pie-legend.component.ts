import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sortable-pie-legend',
  templateUrl: './sortable-pie-legend.component.html',
  styleUrls: ['./sortable-pie-legend.component.scss']
})
export class SortablePieLegendComponent implements OnInit {

  @Input()
  palette: any;
  @Input()
  data: any;
  @Output()
  sortChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  sortOnCategory() {
    this.sortChange.emit('category');
  }

  sortOnQuantity() {
    this.sortChange.emit('quantity');
  }

}
