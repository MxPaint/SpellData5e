import { useState } from 'react';
import { Chart } from './useChart';
import type { SpellGroup } from '../../../domain/Spells/entities/SpellGroup';
import type { School } from '../../../domain/Shared/valueObjects/School';
import { GroupTooltip } from '../tooltip/GroupTooltip';

interface Props {
  data: SpellGroup[];
  sortOrder: School[];
}

const Legend = ({ scale }: { scale: d3.ScaleOrdinal<number, string, never> }) => {
  const domain = scale.domain();

  return (
    <div className='legend-container'>
      {domain.map((level) => (
        <div key={level} className='level-legend'>
          <div
            className='legend-color'
            style={{ 
              backgroundColor: scale(level) 
            }} 
          />
          <span style={{ fontSize: '12px' }}>{level}</span>
        </div>
      ))}
    </div>
  );
};

export const SpellDotPlot = (props: Props ) => {
  const [colorScale, setColorScale] = useState<d3.ScaleOrdinal<number, string, never> | null>(null);

  const [tooltip, setTooltip] = useState<{ x: number; y: number; data: any } | null>(null);

  const schoolNames = props.sortOrder.map(school => {
    return school.value;
  })

  return (
    <div className="chart-container">
      {colorScale && <Legend scale={colorScale} />}
      <Chart
        data={props.data}
        sortOrder={schoolNames}
        onScaleReady={(scale) => setColorScale(() => scale)}
        onHover={(event, data) => {
          if (data) {
            setTooltip({ x: event.clientX, y: event.clientY, data });
          } else {
            setTooltip(null);
          }
        }}
      />
      {tooltip && (
        <GroupTooltip 
          x={tooltip.x} 
          y={tooltip.y} 
          data={tooltip.data} 
        />
      )}
    </div>
  );
};