import './App.css';
import { useEffect, useState } from 'react';
import { SpellDotPlot } from './view/components/spellDotPlot.tsx';
import type { SpellGroup } from './domain/entities/SpellGroup.ts';
import { CompositionRoot } from './compositionRoot.ts';
import { School } from './domain/valueObjects/School.ts';
import { Level } from './domain/valueObjects/Level.ts';

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
  const [data, setData] = useState<SpellGroup[]>([]);
  const [sortType, setSortType] = useState<SortOrder>('default');
  const [sortedList, setSortedList] = useState<School[]>(defaultList);

  useEffect(() => {
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
            newOrder = root.getSchoolOrderLevel(Level.create(parseInt(sortType)));
            setSortedList(newOrder);
            break;
          case 'total':
            newOrder = root.getSchoolOrderTotal()
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
    root.getRawSpellList().then(() => {
      setData(root.getSpellGroups());
    });
  }, []);

  return (
    <div className="block">
      <SpellDotPlot data={data} sortOrder={sortedList}/>
      <div>
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
    </div>
  );
}