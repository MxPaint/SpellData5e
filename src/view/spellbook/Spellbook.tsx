import { useState, useEffect, useMemo } from "react";
import { CompositionRoot } from "../../compositionRoot";
import type { Spell } from "../../domain/Spells/entities/Spell";
import type { SpellGroup } from "../../domain/Spells/entities/SpellGroup";
import { CharacterClass } from "../../domain/Shared/valueObjects/CharacterClass";
import { Level } from "../../domain/Shared/valueObjects/Level";
import { School } from "../../domain/Shared/valueObjects/School";
import { listFiltered } from "./list/spellList/listFilter";
import { SpellList } from "./list/spellList/spellList";
import { spellOrderList } from "./list/spellList/spellOrderList";
import { Graph } from "./graph/Graph";

export type SortOrder = 'default' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'total';

const defaultList: School[] = [
  School.create('Abjuration'),
  School.create('Conjuration'),
  School.create('Divination'),
  School.create('Enchantment'),
  School.create('Evocation'),
  School.create('Illusion'),
  School.create('Necromancy'),
  School.create('Transmutation')
];

interface Props {
  root: CompositionRoot
}

export const Spellbook = (props: Props) => {

  const [spellbookView, setSpellbookView] = useState<number>(0);

  const [listData, setListData] = useState<Spell[]>([]);
  const [chartData, setChartData] = useState<SpellGroup[]>([]);
  const [sortType] = useState<SortOrder>('default');
  const [, setSortedList] = useState<School[]>(defaultList);

  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [schoolFilter, setSchoolFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');

  const [listOrder, setListOrder] = useState<string>('Name');
  const [ascOrder, setAscOrder] = useState<boolean>(true);

  useEffect(() => {
    const { getOrderLevel, getOrderTotal } = props.root.getSpellOrderCases();

    const updateOrder = () => {
      let newOrder: School[];

      try {
        switch (sortType) {
          case '0':
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
          case '9':
            newOrder = getOrderLevel.execute(Level.create(parseInt(sortType)));
            setSortedList(newOrder);
            break;
          case 'total':
            newOrder = getOrderTotal.execute()
            setSortedList(newOrder);
            break;
          default:
            setSortedList(defaultList);
        }
      } catch (error) {
        console.error("Failed to update sort order:", error);
      }
    };

    updateOrder();

  }, [sortType]);

  useEffect(() => {
    const { getSpellList, getSpellGroups } = props.root.getSpellDataCases();

    setListData(getSpellList.execute());
    setChartData(getSpellGroups.execute());

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

  if (chartData.length === 0) {
    return (
      <div className="block">
        <h3 className='loading'>- LOADING DATA -</h3>
        <div>
          <span className="loader"></span>
        </div>
      </div>
    );
  }

  if (spellbookView === 0) {
    return (
      <div>
        <div className='graph-list'>
          <button className='switch-button' onClick={() => setSpellbookView(1)}>
            List
          </button>
        </div>
        <div className="block">
          <div className='header'>
            <h3>Spellbook</h3>
          </div>
          <Graph root={props.root} />
        </div>
      </div>
    );
  }

  if (spellbookView === 1) {
    return (
      <div>
        <div className='graph-list'>
          <button className='switch-button' onClick={() => setSpellbookView(0)}>
            Graph
          </button>
        </div>
        <div className="block">
          <div className='header'>
            <h3>Spellbook</h3>
          </div>
          <div className='spell-list-header'>
            <div className='filters-div'>
              <div>
                <p>List order: </p>
                <select name="order" defaultValue={"Name"} onChange={(e) => setListOrder(e.target.value)}>
                  <option value="Name">Name</option>
                  <option value="Level">Level</option>
                  <option value="School">School</option>
                </select>
                <select name="asc-desc" defaultValue={"Asc"} onChange={(e) => e.target.value === 'Asc' ? setAscOrder(true) : setAscOrder(false)}>
                  <option value="Asc">asc</option>
                  <option value="Desc">desc</option>
                </select>
              </div>
              <div>
                <p>List filters: </p>
                <select name="level" defaultValue={"all"} onChange={(e) => setLevelFilter(e.target.value)}>
                  <option value="all">All levels</option>
                  <option value="0">Cantrips - lvl 0</option>
                  <option value="1">Level 1</option>
                  <option value="2">Level 2</option>
                  <option value="3">Level 3</option>
                  <option value="4">Level 4</option>
                  <option value="5">Level 5</option>
                  <option value="6">Level 6</option>
                  <option value="7">Level 7</option>
                  <option value="8">Level 8</option>
                  <option value="9">Level 9</option>
                </select>
                <select name="school" defaultValue={"all"} onChange={(e) => setSchoolFilter(e.target.value)}>
                  <option value="all">All schools</option>
                  <option value="Abjuration">Abjuration</option>
                  <option value="Conjuration">Conjuration</option>
                  <option value="Divination">Divination</option>
                  <option value="Enchantment">Enchantment</option>
                  <option value="Evocation">Evocation</option>
                  <option value="Illusion">Illusion</option>
                  <option value="Necromancy">Necromancy</option>
                  <option value="Transmutation">Transmutation</option>
                </select>
                <select name="list" defaultValue={"all"} onChange={(e) => setClassFilter(e.target.value)}>
                  <option value="all">All spell lists</option>
                  <option value="bard">Bard</option>
                  <option value="cleric">Cleric</option>
                  <option value="druid">Druid</option>
                  <option value="ranger">Ranger</option>
                  <option value="sorcerer">Sorcerer</option>
                  <option value="warlock">Warlock</option>
                  <option value="wizard">Wizard</option>
                </select>
              </div>
            </div>
          </div>
          <SpellList data={orderedList} />
        </div>
      </div>
    );
  }

}