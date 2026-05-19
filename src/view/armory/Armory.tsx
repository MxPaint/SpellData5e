import { useEffect, useState } from "react"
import type { CompositionRoot } from "../../compositionRoot"
import { Weapon } from "../../domain/entities/Weapon"
import { WeaponList } from "./weaponList/weaponList"

interface Props {
  root: CompositionRoot
}

export const Armory = (props: Props) => {

  const [listData, setListData] = useState<Weapon[]>([]);

  useEffect(() => {
    const {getWeaponList} = props.root.getWeaponDataCases();

    setListData(getWeaponList.execute());
  }, []);

  if (listData.length === 0) {
    return (
      <div className="loading">
        <h3>- LOADING DATA -</h3>
        <div>
          <span className="loader"></span>
        </div>
      </div>
    );
  }

  return (
    <div className='block'>
      <div className='header'>
        <h3>Weapons</h3>
        <div>
          <strong className='short'>Name</strong>
          <strong className='short'>Type</strong>
          <strong className='short'>Damage</strong>
          <strong className='long'>Properties</strong>
        </div>
      </div>
      <WeaponList data={listData}/>
    </div>
  )
}
  