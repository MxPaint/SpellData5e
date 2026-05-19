import type { Weapon } from "../../../domain/entities/Weapon";

interface Props {
  weapon: Weapon;
}

export const WeaponLine = (props: Props) => {
  const name = props.weapon.id.value;
  const category = props.weapon.category.value;
  const damageDice = props.weapon.damageDice.value;
  const damageType = props.weapon.damageType.value;
  const properties = props.weapon.properties;

  const propertyList = () => {
    return(
      <div className='prop-list'>
        {properties.map((pl) => (
          <p className='properties' key={pl.value}>- {pl.value} -</p>
        ))}
      </div>
    )
  }

  return (
    <div className='weapon-line'>
      <p>
        <strong>{name}</strong>
      </p>
      <p>{category}</p>
      <p>{damageDice} {damageType}</p>
      {propertyList()}
    </div>
  );

}
