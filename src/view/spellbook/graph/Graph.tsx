import { useState, useEffect } from "react";
import { CompositionRoot } from "../../../compositionRoot";
import type { SpellGroup } from "../../../domain/Spells/entities/SpellGroup";
import { Level } from "../../../domain/Shared/valueObjects/Level";
import { School } from "../../../domain/Shared/valueObjects/School";
import { SpellDotPlot } from "./dotPlot/spellDotPlot";

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

export const Graph = (props: Props) => {

  const [chartData, setChartData] = useState<SpellGroup[]>([]);
  const [sortType, setSortType] = useState<SortOrder>('default');
  const [sortedList, setSortedList] = useState<School[]>(defaultList);

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

    setChartData(getSpellGroups.execute());

  }, []);

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

  return (
    <div className='block-child'>
      <div className='graph-header'>
        <div className='graph-order'>
          <p>Graph order: </p>
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
      <SpellDotPlot data={chartData} sortOrder={sortedList} />
    </div>
  );
}