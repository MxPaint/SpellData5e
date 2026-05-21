import type { Monster } from "../../../domain/Monsters/entities/Monster";

export const splitList = (list: Monster[]) => {
  const list1: Monster[] = [];
  const list2: Monster[] = [];
  const list3: Monster[] = [];

  let num = 0;

  list.forEach((monster) => {
    if(num === 0) {
      list1.push(monster);
    }
    if(num === 1) {
      list2.push(monster);
    }
    if(num === 2) {
      list3.push(monster);
    }
    num++;
    if(num === 3) {
      num = 0;
    }
  })

  return {list1, list2, list3};
}
