import type { Spell } from "../../../../domain/Spells/entities/Spell"
import { CharacterClass } from "../../../../domain/Shared/valueObjects/CharacterClass";
import type { Level } from "../../../../domain/Shared/valueObjects/Level";
import type { School } from "../../../../domain/Shared/valueObjects/School";

interface Props {
  list: Spell[],
  level: 'all' | Level,
  school: 'all' | School,
  characterClass: 'all' | CharacterClass
}

export const listFiltered = (props: Props) => {
  const newList: Spell[] = [];

  props.list.map((spell) => {
    const levelMatch = props.level === 'all' || props.level.equals(spell.level);
    const schoolMatch = props.school === 'all' || props.school.equals(spell.school);
    const classMatch = props.characterClass === 'all' || spell.classList.some(cls => cls.equals(props.characterClass as CharacterClass))

    if (levelMatch && schoolMatch && classMatch) {
      newList.push(spell);
    }
  });

  return newList;
}