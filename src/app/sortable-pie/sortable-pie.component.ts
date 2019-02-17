import {Component, OnInit} from '@angular/core';
import * as d3 from "d3";
import {Arc} from "d3";
import {Observable, of} from "rxjs";

interface Data {
  color: number,
  category: string,
  quantity: number
}

const SORT_NATURAL = null;

const SORT_CATEGORY = (a, b) => {
  return a.category < b.category ? -1 : 1;
};

const SORT_QUANTITY = (a, b) => {
  return a.quantity < b.quantity ? -1 : 1;
};

@Component({
  selector: 'app-sortable-pie',
  templateUrl: './sortable-pie.component.html',
  styleUrls: ['./sortable-pie.component.scss']
})
export class SortablePieComponent implements OnInit {

  data: Data[];
  height: number;
  width: number;
  sortProperty: string;

  svg;
  pie;
  arc: Arc<any, Data>;
  arcTween;
  opacityTween;
  palette;
  tooltip;

  constructor() {
  }

  ngOnInit() {
    this.palette = d3.interpolateGreens;
    this.width = 540;
    this.height = 540;
    const radius = Math.min(this.width, this.height) / 2;

    this.tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    this.svg = d3.select("#pie")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr("transform", `translate(${this.width / 2}, ${this.height / 2})`)

    this.pie = d3.pie<Data>()
      .value(d => d.quantity)
      .sort(null); // we'll sort the data in place when sorting changes

    this.arc = d3.arc<Data>()
      .innerRadius(0)
      .outerRadius(radius);

    let arc = this.arc;

    this.arcTween = function (d, indx) {
      let interp = d3.interpolate(this._current, d);
      this._current = d;
      return function (t) {
        let tmp = interp(t);
        return arc(tmp, indx);
      }
    };

    this.loadData();
  }

  loadData() {
    this.fetchData().subscribe(
      data => this.update(data)
    )
  }

  fetchData(): Observable<Data[]> {
    let count = 1 + Math.floor(10 * Math.random());
    let data = [];
    for (let i = 0; i < count; i++) {
      let q = Math.random();
      data.push({category: `category ${i}`, color: q * 0.75 + 0.25, quantity: q, sortKey: 1 - q});
    }
    return of(data);
  }

  update(data) {
    this.data = data;
    // Join new data
    const path = this.svg.selectAll("path")
      .data(this.pie(this.data));

    // Update existing arcs
    path.transition().duration(200)
      .attrTween("d", this.arcTween)
      .attr("fill", (d) => this.palette(d.data.color));

    // Enter new arcs
    var attrPath = path.enter().append("path")
      .attr("fill", d => this.palette(d.data.color))
      .attr("d", this.arc)
      .attr("stroke", "white")
      .attr("stroke-width", "6px")
      .each(function (d) {
        this._current = d;
      })
      .on('mouseover', d => {
        this.tooltip
          .transition()
          .duration(200)
          .style('opacity', 0.9);
        this.tooltip
          .html(`${this.palette(d.data.color)} <br/> ${d.data.quantity}`)
          .style('left', d3.event.pageX + 'px')
          .style('top', d3.event.pageY - 28 + 'px');
      })
      .on('mouseout', () => {
        this.tooltip
          .transition()
          .duration(200)
          .style('opacity', 0);
      });


    let opacityFn = function (d) {
      return (t) => {
        return 1 - t;
      }
    };

    path.exit()
      .transition().duration(200)
      .attr("opacity", opacityFn)
      .remove();
  }

  onSortChange(sort: string) {
    this.update(this.data.sort(this.determineSortFn(sort)));
  }

  determineSortFn(sort: string) {
    if (sort == 'quantity') {
      return SORT_QUANTITY;
    }

    if (sort == 'category') {
      return SORT_CATEGORY;
    }

    return null;
  }


}
