import { useState } from "react";
import type { Spell } from "../../../domain/Spells/entities/Spell"
import { SpellDialog } from "../spellDialog/spellDialog";

interface Props {
  spell: Spell;
}

export const SpellBlock = (props: Props) => {
  const name = props.spell.id.value;
  const level = props.spell.level.value;
  const school = props.spell.school.value;
  const lists = props.spell.classList;

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const classList = () => {
    return(
      <div className='class-list'>
        {lists.map((cl) => (
          <p className='class-name' key={cl.value}>{cl.value}</p>
        ))}
      </div>
    )
  }


  const styles = `spell-block ${school}`;

  return (
    <div className={styles} >
      <h3>{name}</h3>
      <p>lvl {level} {school}</p>
      <hr/>
      <strong>Available for:</strong>
      {classList()}
      <button onClick={() => setIsDialogOpen(true)}>
        <strong>+</strong>
      </button>
      <SpellDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        spell={props.spell}
      />
    </div>
  )
}