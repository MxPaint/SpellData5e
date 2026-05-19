import type { Weapon } from "../../../domain/entities/Weapon";
import { WeaponLine } from "./weaponLine";
import './weaponListStyles.css';

interface Props {
  data: Weapon[]
}

export const WeaponList = (props: Props) => {
  return (
    <div className='weapon-list'>
      {props.data.map((weapon) => (
        <WeaponLine key={weapon.id.value} weapon={weapon}/>
      ))}
    </div>
  );
}
