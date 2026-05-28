import type { MagicItem } from "../../../domain/MagicItems/entities/MagicItem";

const rarityOrder = ['varies', 'common', 'uncommon', 'rare', 'very rare', 'legendary', 'artifact'];

interface Props {
  list: MagicItem[];
  order: string;
  ascending: boolean
}

export const magicItemOrderList = (props: Props) => {

  switch(props.order) {
    case 'Name':
      if(props.ascending) {
        return props.list.sort((a,b) => {
          return (a.id.value >= b.id.value ? 1 : -1)
        });
      }

      return props.list.sort((a,b) => {
        return 0 - (a.id.value > b.id.value ? 1 : -1)
      });
      
    case 'Type':
      if(props.ascending) {
        return props.list.sort((a,b) => {
          return (a.type.value > b.type.value ? 1 : -1)
        });
      }
      
      return props.list.sort((a,b) => {
        return 0 - (a.type.value >=b.type.value ? 1 : -1)
      });

    case 'Rarity':
      if(props.ascending) {
        return props.list.sort((a,b) => {
          return (rarityOrder.indexOf(a.rarity.value[0]) - rarityOrder.indexOf(b.rarity.value[0]))
        });
      }

      return props.list.sort((a,b) => {
        return 0 - (rarityOrder.indexOf(a.rarity.value[0]) - rarityOrder.indexOf(b.rarity.value[0]))
      });

    default:
      return props.list;
  }

};
