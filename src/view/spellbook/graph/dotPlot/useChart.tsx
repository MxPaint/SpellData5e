import React, { useEffect, useRef } from "react";
import { SpellChartEngine } from "./chartEngine";
import type { SpellGroup } from "../../../../domain/Spells/entities/SpellGroup";

interface ChartProps {
  data: SpellGroup[];
  sortOrder?: string[];
  onScaleReady?: (scale: d3.ScaleOrdinal<number, string, never>) => void;
  onHover: (event: MouseEvent, data: any | null) => void;
}

export const Chart: React.FC<ChartProps> = ({ data, sortOrder, onScaleReady, onHover }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const engineRef = useRef<SpellChartEngine | null>(null);

  useEffect(() => {
    if (svgRef.current && !engineRef.current) {
      engineRef.current = new SpellChartEngine(svgRef.current, data, onHover);

      if (onScaleReady) {
        onScaleReady(engineRef.current.color);
      }
    }

  }, [data, onScaleReady, onHover]);

  useEffect(() => {
    if (engineRef.current && sortOrder) {
      engineRef.current.update(sortOrder);
    }
  }, [sortOrder]);

  return <svg ref={svgRef} />;
};