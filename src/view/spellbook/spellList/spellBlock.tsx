import type { Spell } from "../../../domain/entities/Spell"

interface Props {
  spell: Spell;
}

export const SpellBlock = (props: Props) => {
  const name = props.spell.id.value;
  const level = props.spell.level.value;
  const school = props.spell.school.value;
  const lists = props.spell.classList;

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
    </div>
  )
}