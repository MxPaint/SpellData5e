import type { Monster } from "../../../domain/Monsters/entities/Monster";

const sizeOrder = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];
const crOrder = ['0', '1/8', '1/4', '1/2', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '19', '20', '21', '22', '23', '24', '30'];

interface Props {
  list: Monster[];
  order: string;
  ascending: boolean
}

export const monsterOrderList = (props: Props) => {

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
    
    case 'Size':
      if(props.ascending) {
        return props.list.sort((a,b) => {
          return (sizeOrder.indexOf(a.size.value) - sizeOrder.indexOf(b.size.value))
        })
      }

      return props.list.sort((a,b) => {
        return 0 - (sizeOrder.indexOf(a.size.value) - sizeOrder.indexOf(b.size.value))
      })

    case 'Type':
      if(props.ascending) {
        return props.list.sort((a,b) => {
          return (a.type.value > b.type.value ? 1 : -1)
        });
      }

      return props.list.sort((a,b) => {
        return 0 - (a.type.value >=b.type.value ? 1 : -1)
      });

    case 'AC':
      if(props.ascending) {
        return props.list.sort((a,b) => {
          return (a.ac.value - b.ac.value)
        });
      }

      return props.list.sort((a,b) => {
        return 0 - (a.ac.value - b.ac.value)
      });

    case 'HP':
      if(props.ascending) {
        return props.list.sort((a,b) => {
          return (a.hitPoints.value - b.hitPoints.value)
        });
      }

      return props.list.sort((a,b) => {
        return 0 - (a.hitPoints.value - b.hitPoints.value)
      });

    case 'CR':
      if(props.ascending) {
        return props.list.sort((a,b) => {
          return (crOrder.indexOf(a.cr.value) - crOrder.indexOf(b.cr.value))
        })
      }

      return props.list.sort((a,b) => {
        return 0 - (crOrder.indexOf(a.cr.value) - crOrder.indexOf(b.cr.value))
      })

    default:
      return props.list;
  }

};
