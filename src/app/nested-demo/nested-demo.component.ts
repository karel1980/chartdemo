import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-nested-demo',
  templateUrl: './nested-demo.component.html',
  styleUrls: ['./nested-demo.component.scss']
})
export class NestedDemoComponent implements OnInit {

  constructor() { }

  svg;
  data;

  ngOnInit() {

    this.svg = d3.select(".nested")
      .append("svg")
      .attr("height", 400)
      .attr("width", 800);

    this.updateData();


  }

  private updateData() {
    console.log("updating data");
    this.data = [
      {
        name: "One",
        values: [
          {
            name: "AAA",
            values: [Math.random() * 100, Math.random() * 100, Math.random() * 100]
          },
          {
            name: "BBB",
            values: [Math.random() * 100, Math.random() * 100, Math.random() * 100]
          }
        ]
      },
      {
        name: "Two",
        values: [
          {
            name: "CCC",
            values: [Math.random() * 100, Math.random() * 100, Math.random() * 100]
          },
          {
            name: "DDD",
            values: [Math.random() * 100, Math.random() * 100, Math.random() * 100]
          }
        ]
      }
    ];


    let catRectData = this.svg.selectAll("rect.cat")
      .data(this.data);

    catRectData.exit().remove();

    let catGroupData = this.svg.selectAll("g.cat")
      .data(this.data);

    catGroupData.exit().remove();

    let catRect = catRectData.enter()
      .append("rect")
      .attr("class", "cat")
      .attr("x", (d,i) => i * 100)
      .attr("y", 0)
      .attr("width", 100)
      .attr("height", 0)
      .attr("fill", "#f0f")
      .attr("stroke", "black")
      .transition().duration(500)
      .attr("height", (c) => {
        return d3.max(c.values.map(s => d3.max(s.values)))
      });

    catRectData.transition().duration(500)
      .attr("height", (c) => {
        return d3.max(c.values.map(s => d3.max(s.values)))
      });


    let catGroup = catGroupData.enter()
      .append("g")
      .attr("class", "cat")
      .attr("transform", (d,i) => `translate(${i * 100}, 0)`);

    let subcatGroupData = catGroup.selectAll("g.subcat")
      .data(d => d.values);

    subcatGroupData.transition().duration(500)
      .attr("opacity", 0);

    subcatGroupData.exit().remove();

    let subcatGroup = subcatGroupData.enter()
      .append("g")
      .attr("class", "subcat")
      .attr("transform", (d,i) => `translate(${i*50}, 0)`);

    let blockRectData = subcatGroup.selectAll("rect.block")
      .data(d => d.values);

    blockRectData.transition().duration(500)
      .attr("height", (d,i) => d);

    blockRectData.exit().remove();

    let blockRect = blockRectData.enter()
      .append("rect")
      .attr("class", "block")
      .attr("x", (d,i) => i * 10)
      .attr("y", 0)
      .attr("width", 10)
      .attr("height", 0)
      .transition().duration(1000)
      .attr("height", (d,i) => d);

  }

  onClick() {
    this.updateData();
  }
}
