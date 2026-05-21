import type { Monster } from "../../../domain/Monsters/entities/Monster";
import { MonsterBlock } from "./MonsterBlock";
import './monsterStyles.css';
import { splitList } from "./SplitMonsterList";

interface Props {
  data: Monster[]
}

export const MonsterList = (props: Props) => {

  const {list1, list2, list3} = splitList(props.data);

  return (
    <div className='monster-list'>
      <div className='monster-column'>
        {list1.map((monster) => (
          <MonsterBlock key={monster.id.value} monster={monster} block="left-block"/>
        ))}
      </div>
      <div className='monster-column'>
        {list2.map((monster) => (
          <MonsterBlock key={monster.id.value} monster={monster} block="center-block"/>
        ))}
      </div>
      <div className='monster-column'>
        {list3.map((monster) => (
          <MonsterBlock key={monster.id.value} monster={monster} block="right-block"/>
        ))}
      </div>
    </div>
  );
}
