import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface IData {
  name: string
  count: number
}
interface IProp {
  style?: any
  data: IData[]
  xGap?: number
}


const BarChart: React.FC<IProp> = ({ style = {}, data, xGap = 0 }: IProp): JSX.Element => {
  const ref = useRef<SVGSVGElement>(null);
  const refD = useRef<HTMLDivElement>(null);
  useEffect(() => {

    const margin = { top: 20, right: 50, bottom: 50, left: 80 },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
    const x = d3.scaleBand()
      .range([ 0, width ])
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([ height, 0 ]);
    const div = d3.select(refD.current);

    const svg = d3.select(ref.current)
      .attr("id", "svg")
      .style("max-width", "800px")
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    data.forEach(d => d.count = +d.count);
    x.domain(data.map(d => d.name));
    y.domain([ 0, Math.max(...data.map(d => d.count)) ]);

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll("text")
      .style("text-anchor", "end")
      .style("font-size", "20px")
      .attr("dx", `${0.8 + (xGap || 0)}em`)
      .attr("dy", "1em");

    svg.append("g")
      .call(d3.axisLeft(y).ticks(3))
      .selectAll(".tick text")
      .style("font-size", "20px");

    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d: IData) => (x(d.name) || 0) + 6)
      .attr("width", x.bandwidth() - 12)
      .attr("y", (d: IData) => y(d.count))
      .attr("height", (d: IData) => height - y(d.count))
      .attr("fill", "#514E3F")
      .on("mouseover", function (event, d) {
        const elementPos = event.target.getBoundingClientRect();
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html(Number.isInteger(d.count || 0) ? d.count.toString() : d.count.toFixed(2))
          .style("left", `calc(${elementPos.x + (elementPos.width / 2)}px)`)
          .style("top", `${elementPos.y - 30}px`)
          .style("transform", "translateX(-50%)");
      })
      .on("mouseout", function (event, d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });
  });
  return (
    <div className="chart">
      <svg ref={ref} style={style} ></svg>

      <div ref={refD}
           className="chart-tooltip"
           style={{ opacity: 0 }}>
      </div>
    </div>
  );
};

export default BarChart;
