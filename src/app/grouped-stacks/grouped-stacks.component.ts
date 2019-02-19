import {Component, OnInit} from '@angular/core';
import * as d3 from "d3";

interface Data {
  groupNames: string[];
  categories: string[];
  groups: Group[];
}

interface Group {
  groupName: string,
  stacks: Stack[];
}

interface Stack {
  categoryName: string,
  values: { [key: string]: number };
}

@Component({
  selector: 'app-grouped-stacks',
  templateUrl: './grouped-stacks.component.html',
  styleUrls: ['./grouped-stacks.component.scss']
})
export class GroupedStacksComponent implements OnInit {

  readonly WIDTH = 800;
  readonly HEIGHT = 400;
  readonly chartMargins = {left: 100, right: 10, top: 40, bottom: 10};

  data: Data;
  numberOfGroups = 2;
  numberOfCategories = 3;

  chartYScale;

  svg;
  chart;

  constructor() {
  }

  ngOnInit() {
    this.data = this.createData();

    let groupHeight = this.HEIGHT - this.chartMargins.top - this.chartMargins.bottom;
    this.chartYScale = d3.scaleLinear()
      .domain([0, 100])
      .range([groupHeight, 0] as ReadonlyArray<number>);

    this.svg = this.createSvg();
    this.chart = this.createChart(this.svg);
    this.createImportantHeight(this.chart, 80, -this.chartMargins.left + 10, "Maximum effort");
    this.createImportantHeight(this.chart, 50, -this.chartMargins.left + 50, "Medium effort");

    this.updateChart();
  }

  private updateChart() {
    const groups = this.createGroups(this.chart, this.data.groups);
    this.createStacks(groups);
  }

  private createSvg() {
    return d3.select('.chart')
      .append('svg')
      .attr("width", this.WIDTH)
      .attr("height", this.HEIGHT)
      .attr("style", "background-color: #ccc");
  }

  private createImportantHeight(chart, height, x: number, label: string) {
    chart.append("line")
      .attr("x1", this.WIDTH - this.chartMargins.right - this.chartMargins.left)
      .attr("y1", this.chartYScale(height))
      .attr("x2", this.WIDTH - this.chartMargins.right - this.chartMargins.left)
      .attr("y2", this.chartYScale(height))
      .attr("stroke", "black")
      .transition().duration(500)
      .attr("x1", x);

    let line1Left = x + 10;
    let line1Top = this.chartYScale(height) + 20;

    chart.append("text")
      .text(label)
      .attr("x", line1Left)
      .attr("y", line1Top)
      .attr("text-anchor", "end")
      .attr("transform", `rotate(-90, ${line1Left}, ${line1Top})`)
      .transition().duration(500)
      .attr("opacity", 1)
  }

  private createChart(svg) {
    return svg.append('g')
      .attr("class", "chart")
      .attr("transform", `translate(${this.chartMargins.left}, ${this.chartMargins.top})`);
  }

  private createGroups(chart, data) {
    const width: number = this.WIDTH - this.chartMargins.right - this.chartMargins.left;
    const height: number = this.HEIGHT - this.chartMargins.bottom - this.chartMargins.top;

    let xScale = d3.scaleLinear()
      .domain([0, this.numberOfGroups])
      .range([0, width] as ReadonlyArray<number>);

    var groupData = chart.selectAll('g.group')
      .data(data);

    let groupEnter = groupData
      .enter()
      .append('g')
      .attr("class", "group")
      .attr("transform", (d, i) => `translate(${xScale(i)}, 0)`);

    // create rect around each group
    groupEnter.append("rect")
      .attr("class", "group-rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width / this.numberOfGroups)
      .attr("height", height)
      .attr("fill", "none")
      .attr("stroke", "#999");

    return groupEnter.merge(groupData);
  }

  private createStacks(groups) {
    const groupWidth = (this.WIDTH - this.chartMargins.left - this.chartMargins.right) / this.numberOfGroups;

    let xScale = d3.scaleBand()
      .domain(d3.range(this.numberOfCategories).map(String) as ReadonlyArray<string>)
      .range([0, groupWidth])
      .paddingInner(0.20)
      .paddingOuter(1);

    let stackFn = d3.stack().keys(["apples", "bananas", "oranges", "limes"]);

    let product = groups
      .selectAll('g.product')
      .data(d => stackFn(d.stacks.map(s => s.values)));

    let productEnter = product
      .enter()
      .append("g")
      .attr("class", "product")
      .attr("fill", (d, i) => d3.schemeCategory10[i]);

    let blockData = productEnter.merge(product)
      .selectAll("rect.block")
      .data(d => d);

    let blockEnter = blockData
      .enter()
      .append("rect")
      .attr("class", "block")
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => this.chartYScale(d[1]))
      .attr("width", xScale.bandwidth())
      .attr("height", d => this.chartYScale(d[0]) - this.chartYScale(d[1]))
      .attr("stroke", "black");

    blockEnter.merge(blockData).transition()
      .duration(500)
      .ease(d3.easeExp)
      .attr("x", (d,i) => xScale(i))
      .attr("y", (d) => this.chartYScale(d[1]))
      .attr("width", xScale.bandwidth())
      .attr("height", d => this.chartYScale(d[0]) - this.chartYScale(d[1]));

    this.createStackLabels(xScale, groups);

    return productEnter;
  }

  private createStackLabels(xScale, groups) {
    let xAxis = d3.axisTop(xScale)
      .tickSize(0)
      .tickPadding(10)
      .tickFormat((d, i) => this.data.categories[i])
      .tickValues(xScale.domain());

    groups.append("g")
      .attr("class", "xaxis")
      .attr("transform", `translate(0,0)`)
      .call(xAxis)
      .selectAll("path")
      .attr("stroke-width", 0);
  }

  private createData(): Data {
    let groupNames = d3.range(this.numberOfGroups).map(i => `Group ${i}`);
    let categories = d3.range(this.numberOfCategories).map(i => `Cat ${i}`);

    return {
      groupNames: groupNames,
      categories: categories,
      groups: this.createGroupData()
    };
  }

  onUpdateClick() {
    this.data = this.createData();
    this.updateChart();
  }

  private createGroupData(): Group[] {
    let result: Group[] = [];
    for (let i = 0; i < this.numberOfGroups; i++) {
      result.push({
        groupName: `group ${i}`,
        stacks: this.createStackData()
      });
    }
    return result;
  }

  createStackData(): Stack[] {
    let result: Stack[] = [];
    for (let i = 0; i < this.numberOfCategories; i++) {
      result.push({
        categoryName: `stack ${i}`,
        values: {
          "apples": Math.random() * 30,
          "bananas": Math.random() * 30,
          "oranges": Math.random() * 30,
          "limes": Math.random() * 30
        }
      });
    }
    return result;
  }

}
