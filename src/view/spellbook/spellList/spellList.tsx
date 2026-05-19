import type { Spell } from "../../../domain/entities/Spell";
import './listStyles.css'
import { SpellBlock } from "./spellBlock";

interface Props{
  data: Spell[]
}

export const SpellList = (props: Props) => {
  return (
    <div className="list-block">
      {props.data.map((spell) => (
        <SpellBlock key={spell.id.value} spell={spell}/>
      ))}
    </div>
  );
}