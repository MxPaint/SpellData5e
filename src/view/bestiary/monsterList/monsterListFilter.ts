import type { Monster } from "../../../domain/Monsters/entities/Monster";
import type { MonsterSize } from "../../../domain/Shared/valueObjects/MonsterSize";
import type { MonsterType } from "../../../domain/Shared/valueObjects/MonsterType";

interface Props {
  list: Monster[];
  size: 'all' | MonsterSize;
  type: 'all' | MonsterType;
  cr: string;
}

export const monsterListFiltered = (props: Props) => {
  const newList: Monster[] = [];

  props.list.map((item) => {
    const typeMatch = props.type === 'all' || props.type.equals(item.type);
    const sizeMatch = props.size === 'all' || props.size.equals(item.size);
    const crMatch = props.cr === 'all' || props.cr === item.cr.value;
    
    if (typeMatch && sizeMatch && crMatch) {
      newList.push(item);
    }
  })

  return newList;
}
