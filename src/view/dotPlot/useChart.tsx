import React, { useEffect, useRef } from "react";
import { SpellChartEngine } from "./chartEngine";
import type { SpellGroup } from "../../domain/entities/SpellGroup";

interface ChartProps {
  data: SpellGroup[];
  sortOrder?: string[];
  onScaleReady?: (scale: d3.ScaleOrdinal<number, string, never>) => void;
}

export const Chart: React.FC<ChartProps> = ({ data, sortOrder, onScaleReady }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const engineRef = useRef<SpellChartEngine | null>(null);

  useEffect(() => {
    //console.log("Data received by Chart:", data);
    // if (data.length === 0) {
    //   console.warn("Chart received empty data array.");
    //   return;
    // }
    //console.log("SVG Ref current:", svgRef.current);
    
    if (svgRef.current && !engineRef.current) {
      engineRef.current = new SpellChartEngine(svgRef.current, data);

      if (onScaleReady) {
        onScaleReady(engineRef.current.color);
      }
    }

  }, [data, onScaleReady]);

  useEffect(() => {
    //sortOrder = ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'];
    if (engineRef.current && sortOrder) {
      engineRef.current.update(sortOrder);
    }
  }, [sortOrder]);

  // if (data.length === 0) {
  //   return <h3>- LOADING DATA -</h3>
  // }

  return <svg ref={svgRef} />;
};