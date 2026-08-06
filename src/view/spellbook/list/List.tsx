import { useState, useEffect, useMemo } from "react";
import { CompositionRoot } from "../../../compositionRoot";
import type { Spell } from "../../../domain/Spells/entities/Spell";
import { CharacterClass } from "../../../domain/Shared/valueObjects/CharacterClass";
import { Level } from "../../../domain/Shared/valueObjects/Level";
import { School } from "../../../domain/Shared/valueObjects/School";
import { listFiltered } from "./spellList/listFilter";
import { SpellList } from "./spellList/spellList";
import { spellOrderList } from "./spellList/spellOrderList";

interface Props {
  root: CompositionRoot
}

export const List = (props: Props) => {

  const [listData, setListData] = useState<Spell[]>([]);

  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [schoolFilter, setSchoolFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');

  const [listOrder, setListOrder] = useState<string>('Name');
  const [ascOrder, setAscOrder] = useState<boolean>(true);

  useEffect(() => {
    const { getSpellList, getSpellGroups } = props.root.getSpellDataCases();

    setListData(getSpellList.execute());

  }, []);

  const filteredList = useMemo(() => {
    return listFiltered({
      list: listData,
      level: levelFilter === 'all' ? levelFilter : Level.create(parseInt(levelFilter)),
      school: schoolFilter === 'all' ? schoolFilter : School.create(schoolFilter),
      characterClass: classFilter === 'all' ? classFilter : CharacterClass.create(classFilter)
    });
  }, [levelFilter, schoolFilter, classFilter, listData]);

  const orderedList = useMemo(() => {
    return spellOrderList({
      list: [...filteredList],
      order: listOrder,
      ascending: ascOrder
    })
  }, [filteredList, listOrder, ascOrder]);

  return (
    <SpellList data={orderedList} />
  );
}