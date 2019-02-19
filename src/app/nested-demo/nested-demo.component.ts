import {Component, OnInit} from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-nested-demo',
  templateUrl: './nested-demo.component.html',
  styleUrls: ['./nested-demo.component.scss']
})
export class NestedDemoComponent implements OnInit {

  constructor() {
  }

  svg;
  data;

  ngOnInit() {

    this.svg = d3.select(".nested")
      .append("svg")
      .attr("height", 400)
      .attr("width", 800);

    this.updateData();

    this.createSvg();

  }

  private createSvg() {
    let category = this.svg.selectAll('g.cat')
      .data(this.data);
    category.exit().remove();
    let categoryEnter = category.enter()
      .append("g")
      .attr("class", "cat")
      .attr("transform", (d, i) => `translate(${i * 150}, ${i * 30})`);

    let group = category.merge(categoryEnter).selectAll('g.group')
      .data(d => d.values);
    group.exit().remove();
    let groupEnter = group.enter()
      .append("g")
      .attr("class", "group")
      .attr("transform", (d, i) => `translate(${i * 40}, ${i * 10})`);

    let value = group.merge(groupEnter).selectAll("rect")
      .data(d => d.values);
    value.exit().remove();
    value.enter().append("rect")
      .attr("x", (d, i) => i * 10)
      .attr("y", 0)
      .attr("width", 5)
      .attr("height", 0)
      .transition().duration(500)
      .attr("height", (d) => d);
    value.transition().duration(500)
      .attr("height", (d) => d);

  }

  private updateData() {
    this.data = [
      {
        name: "cat1",
        values: [
          {
            name: "AAA",
            values: [Math.random() * 100, Math.random() * 100, Math.random() * 100]
          },
          {
            name: "BBB",
            values: [Math.random() * 100, Math.random() * 100, Math.random() * 100]
          },
          {
            name: "CCC",
            values: [Math.random() * 100, Math.random() * 100, Math.random() * 100]
          }
        ]
      },
      {
        name: "cat2",
        values: [
          {
            name: "AAA2",
            values: [Math.random() * 100, Math.random() * 100, Math.random() * 100]
          },
          {
            name: "BBB2",
            values: [Math.random() * 100, Math.random() * 100, Math.random() * 100]
          },
          {
            name: "CCC2",
            values: [Math.random() * 100, Math.random() * 100, Math.random() * 100]
          }
        ]
      }
    ];

  }

    onClick()
    {
      this.updateData();
      this.createSvg();
    }
  }
