import type { MagicItem } from "../../../domain/MagicItems/entities/MagicItem";
import type { Attunement } from "../../../domain/Shared/valueObjects/Attunement";
import type { ObjectType } from "../../../domain/Shared/valueObjects/ObjectType";

interface Props {
  list: MagicItem[];
  rarity: string;
  attunement: 'all' | Attunement;
  type: 'all' | ObjectType;
}

export const itemListFiltered = (props: Props) => {
  const newList: MagicItem[] = [];

  props.list.map((item) => {
    const typeMatch = props.type === 'all' || props.type.type === item.type.type;
    const attunementMatch = props.attunement === 'all' || props.attunement.equals(item.attunement);
    const rarityMatch = props.rarity === 'all' || item.rarity.value.includes(props.rarity)
    
    if (typeMatch && attunementMatch && rarityMatch) {
      newList.push(item);
    }
  })

  return newList;
}
