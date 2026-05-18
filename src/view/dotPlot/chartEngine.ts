import * as d3 from "d3";
import type { SpellGroup } from "../../domain/entities/SpellGroup";
import './chartStyles.css';

export class SpellChartEngine {
  private svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private g: d3.Selection<SVGGElement, [string, SpellGroup[]], SVGGElement, unknown>;
  private y: d3.ScalePoint<string>;
  public color: d3.ScaleOrdinal<number, string, never>;
  private nodes;

  constructor(
    container: SVGSVGElement,
    data: SpellGroup[],
    onHover: (event: MouseEvent, data: any | null) => void
  ) {
    this.svg = d3.select(container);
    
    const schools = d3.group(data, d => d.school.value);
    const schoolNames = d3.sort(Array.from(schools.keys()));
    const levels = new Set(data.map(d => d.level.value));
    
    const width = 1000;
    const height = schoolNames.length * 65;
    const marginTop = 30;
    const marginRight = 10;
    const marginBottom = 10;
    const marginLeft = 100;

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count.value) || 0])
      .rangeRound([marginLeft, width - marginRight]);

    this.y = d3.scalePoint()
      .domain(schoolNames)
      .rangeRound([marginTop, height - marginBottom])
      .padding(1);

    this.color = d3.scaleOrdinal<number, string, never>()
      .domain(Array.from(levels))
      .range(d3.quantize(d3.interpolateSpectral, Math.max(levels.size, 3)))
      .unknown("#ccc");

    this.svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);

    this.svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(d3.axisTop(x).ticks(null))
      .call(g => g.append("text")
            .text("Number of spells")
            .attr("fill", "currentColor")
            .attr("transform", `translate(${width - marginRight},0)`)
            .attr("text-anchor", "end")
            .attr("dy", -22)
      )
      .call(g => g.selectAll(".tick line").clone().attr("stroke-opacity", 0.1).attr("y2", height - marginBottom))
      .call(g => g.selectAll(".domain").remove());

    this.g = this.svg.append("g")
        .attr("text-anchor", "end")
        .style("font", "10px sans-serif")
        .selectAll()
        .data(Array.from(schools))
        .join("g")
        .attr("class", "school-row")
        .attr("transform", ([school]) => `translate(0,${this.y(school)})`);

    this.g.append("line")
        .attr("stroke", "#aaa")
        .attr("x1", ([, values]) => x(d3.min(values, d => d.count.value)!))
        .attr("x2", ([, values]) => x(d3.max(values, d => d.count.value)!));

    this.g.append("text")
        .attr("class", "white-text")
        .attr("dy", "0.35em")
        .attr("x", ([, values]) => x(d3.min(values, d => d.count.value)!) - 6)
        .text(([school]) => school);

    this.nodes = data.map(d => ({
      ...d,
      y: this.y(d.school.value),    // Fix X so nodes don't move horizontally
      fx: x(d.count.value) || 0,  // Start at the center of the row
    }));

    this.runSimulation();

    const dotGroup = this.svg.append("g")
        .attr("class", "dots");

    dotGroup.selectAll("circle")
        .data(this.nodes)
        .join("circle")
        .attr("class", "spell-dot")
        .attr("cx", d => d.fx) // Use calculated simulation x (which matches fx)
        .attr("cy", d => d.y) // Use calculated simulation y (pushed apart)
        .attr("fill", d => this.color(d.level.value))
        .attr("r", 4)
        .on('mouseover', (event, d) => onHover(event, d))
        .on('mousemove', (event, d) => onHover(event, d))
        .on('mouseleave', (event) => onHover(event, null));
  }

  public update(names: string[]) {
    this.y.domain(names);
    
    this.svg.selectAll(".school-row")
      .transition()
      .duration(750)
      .attr("transform", (d: any) => `translate(0,${this.y(d[0])})`);
    
    this.runSimulation();
    
    this.svg.selectAll(".spell-dot")
      .data(this.nodes)
      .transition()
      .duration(750)
      .attr("cy", (d: any) => d.y);
      
    //console.log(names);
  }

  private runSimulation() {
    
    const simulation = d3.forceSimulation(this.nodes)
      .force("y", d3.forceY((d: any) => this.y(d.school.value) || 0).strength(1))
      .force("collide", d3.forceCollide(4.5)) 
      .stop();

    for (let i = 0; i < 120; ++i) simulation.tick();
  }
}
