import type { MagicItem } from "../../../domain/MagicItems/entities/MagicItem";
import { MagicItemBlock } from "./magicItemBlock";
import './magicItemStyles.css';

interface Props {
  data: MagicItem[]
}

export const MagicItemList = (props: Props) => {
  return (
    <div className='magic-item-list'>
      {props.data.map((magicItem) => (
        <MagicItemBlock key={magicItem.id.value} magicItem={magicItem}/>
      ))}
      <div className='foot'></div>
    </div>
  );
}
