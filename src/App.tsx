import './App.css';
import { useEffect, useState } from 'react';
import { SpellDotPlot } from './view/dotPlot/spellDotPlot.tsx';
import type { SpellGroup } from './domain/entities/SpellGroup.ts';
import { CompositionRoot } from './compositionRoot.ts';
import { School } from './domain/valueObjects/School.ts';
import { Level } from './domain/valueObjects/Level.ts';
import { Spell } from './domain/entities/Spell.ts';
import { SpellList } from './view/spellList/spellList.tsx';
import { listFiltered } from './view/spellList/listFilter.ts';
import { CharacterClass } from './domain/valueObjects/CharacterClass.ts';

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

export default function App() {
  const root = new CompositionRoot();
  const [listData, setListData] = useState<Spell[]>([]);
  const [chartData, setChartData] = useState<SpellGroup[]>([]);
  const [sortType, setSortType] = useState<SortOrder>('default');
  const [sortedList, setSortedList] = useState<School[]>(defaultList);

  const [filteredList, setFilteredList] = useState<Spell[]>([]);
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [schoolFilter, setSchoolFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');

  useEffect(() => {
    const {getOrderLevel, getOrderTotal} = root.getOrderCases();

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

    setFilteredList(listFiltered({
      list: listData,
      level: levelFilter === 'all' ? levelFilter : Level.create(parseInt(levelFilter)),
      school: schoolFilter === 'all' ? schoolFilter : School.create(schoolFilter),
      characterClass: classFilter === 'all' ? classFilter : CharacterClass.create(classFilter)
    }));

  }, [levelFilter, schoolFilter, classFilter]);
  
  useEffect(() => {
    const {getRawList, getSpellList, getSpellGroups} = root.getDataCases();

    getRawList.execute().then(() => {
      setListData(getSpellList.execute());
      setChartData(getSpellGroups.execute());
      setFilteredList(getSpellList.execute());
    });
  }, []);

  if (chartData.length === 0) {
    return (
      <div className="loading">
        <h3>- LOADING DATA -</h3>
        <div>
          <span className="loader"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="block">
      <div className='fixed-content'>
        <div className='graph-order'>
          <p>Order by:</p>
          <select name="order" defaultValue={"default"} onChange={(e) => setSortType(e.target.value as SortOrder)}>
            <option value="default">Default</option>
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
            <option value="total">Total spells</option>
          </select>
        </div>
        <SpellDotPlot data={chartData} sortOrder={sortedList}/>
        <div>
          <p>List filters:</p>
          <div className='filters-div'>
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
      <SpellList data={filteredList}/>
    </div>
  );
}