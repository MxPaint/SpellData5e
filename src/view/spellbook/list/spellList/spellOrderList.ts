import type { Spell } from "../../../../domain/Spells/entities/Spell";

interface Props {
  list: Spell[];
  order: string;
  ascending: boolean
}

export const spellOrderList = (props: Props) => {

  switch (props.order) {
    case 'Name':
      if (props.ascending) {
        return props.list.sort((a, b) => {
          return (a.id.value >= b.id.value ? 1 : -1)
        });
      }

      return props.list.sort((a, b) => {
        return 0 - (a.id.value > b.id.value ? 1 : -1)
      });

    case 'Level':
      if (props.ascending) {
        return props.list.sort((a, b) => {
          return (a.level.value - b.level.value)
        });
      }

      return props.list.sort((a, b) => {
        return 0 - (a.level.value - b.level.value)
      });

    case 'School':
      if (props.ascending) {
        return props.list.sort((a, b) => {
          return (a.school.value >= b.school.value ? 1 : -1)
        });
      }

      return props.list.sort((a, b) => {
        return 0 - (a.school.value > b.school.value ? 1 : -1)
      });

    default:
      return props.list;
  }
}
