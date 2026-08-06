import type { SpellGroup } from "../../../../domain/Spells/entities/SpellGroup";
import './tooltipStyle.css';

interface TooltipData {
  x: number;
  y: number;
  data: SpellGroup;
}

export const GroupTooltip = (props: TooltipData) => {
  return (
    <div
      className="tooltip"
      style={{
        top: props.y,
        left: props.x
      }}
    >
      <p>{props.data.school.value} level {props.data.level.value}</p>
      <p>Count: {props.data.count.value}</p>
    </div>
  );
};
