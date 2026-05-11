import type { Spell } from "../../domain/entities/Spell"

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
      <div>
        {lists.map((cl) => (
          <p key={cl.value}>- {cl.value}</p>
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
      <h4>Available for:</h4>
      {classList()}
    </div>
  )
}