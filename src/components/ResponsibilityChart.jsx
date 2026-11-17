import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { STACK_LAYERS, SERVICE_MODELS } from "../data/cloudModels";

const COLORS = {
  customer: "#2563eb", // Blue
  shared: "#f59e0b",   // Amber
  provider: "#10b981"  // Emerald
};

export default function ResponsibilityChart({ selectedModels }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    if (selectedModels.length === 0) return;

    const margin = { top: 40, right: 30, bottom: 40, left: 120 };
    const width = 760 - margin.left - margin.right;
    const height = 460 - margin.top - margin.bottom;

    const g = svg
      .attr("viewBox", `0 0 760 460`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().domain(selectedModels).range([0, width]).padding(0.2);
    const y = d3.scaleBand().domain(STACK_LAYERS).range([0, height]).padding(0.12);

    g.append("g")
      .call(d3.axisTop(x).tickFormat((d) => SERVICE_MODELS[d].name))
      .selectAll("text")
      .style("font-size", "13px")
      .style("font-weight", "600");

    g.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "12px");

    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "#1e293b")
      .style("color", "#fff")
      .style("padding", "8px 12px")
      .style("border-radius", "6px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    const cells = [];
    selectedModels.forEach((modelKey) => {
      STACK_LAYERS.forEach((layer) => {
        cells.push({
          modelKey,
          modelName: SERVICE_MODELS[modelKey].name,
          layer,
          owner: SERVICE_MODELS[modelKey].layers[layer]
        });
      });
    });

    g.selectAll("rect")
      .data(cells)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.modelKey))
      .attr("y", (d) => y(d.layer))
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .attr("rx", 6)
      .attr("fill", (d) => COLORS[d.owner])
      .style("cursor", "pointer")
      .on("mouseover", (event, d) => {
        d3.select(event.currentTarget).attr("opacity", 0.85);
        tooltip
          .style("opacity", 1)
          .html(`<strong>${d.modelName} — ${d.layer}</strong><br/>Managed by: ${d.owner.toUpperCase()}`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", event.pageX + 12 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", (event) => {
        d3.select(event.currentTarget).attr("opacity", 1);
        tooltip.style("opacity", 0);
      });

    return () => tooltip.remove();
  }, [selectedModels]);

  return (
    <div>
      <div style={{ display: "flex", gap: "16px", marginBottom: "10px", fontSize: "14px" }}>
        <span><strong style={{ color: "#2563eb" }}>■</strong> Customer Managed</span>
        <span><strong style={{ color: "#f59e0b" }}>■</strong> Shared Responsibility</span>
        <span><strong style={{ color: "#10b981" }}>■</strong> Cloud Provider Managed</span>
      </div>
      <svg ref={svgRef} style={{ width: "100%", maxWidth: "760px", height: "auto" }} />
    </div>
  );
}
