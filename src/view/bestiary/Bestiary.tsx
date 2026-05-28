import { useState, useEffect, useMemo } from "react";
import type { CompositionRoot } from "../../compositionRoot";
import type { Monster } from "../../domain/Monsters/entities/Monster";
import { MonsterList } from "./monsterList/MonsterList";
import { monsterListFiltered } from "./monsterList/monsterListFilter";
import { MonsterType } from "../../domain/Shared/valueObjects/MonsterType";
import { MonsterSize } from "../../domain/Shared/valueObjects/MonsterSize";
import { monsterOrderList } from "./monsterList/monsterOrderList";

interface Props {
  root: CompositionRoot
}

export const Bestiary = (props: Props) => {

  const [listData, setListData] = useState<Monster[]>([]);

  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sizeFilter, setSizeFilter] = useState<string>('all');
  const [crFilter, setCrFilter] = useState<string>('all');

  const [listOrder, setListOrder] = useState<string>('Name');
  const [ascOrder, setAscOrder] = useState<boolean>(true);

  useEffect(() => {
    const {getMonsterList} = props.root.getMonsterCases();

    setListData(getMonsterList.execute());
  }, []);

  const filteredList = useMemo(() => {
    return monsterListFiltered({
      list: listData,
      type: typeFilter === 'all' ? typeFilter : MonsterType.create(typeFilter),
      size: sizeFilter === 'all' ? sizeFilter : MonsterSize.create(sizeFilter),
      cr: crFilter
    });
  }, [typeFilter, sizeFilter, crFilter, listData]);

  const orderedList = useMemo(() => {
    return monsterOrderList({
      list: [...filteredList],
      order: listOrder,
      ascending: ascOrder
    })
  }, [filteredList, listOrder, ascOrder]);

  if (listData.length === 0) {
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
    <div className='block'>
      <div className='header'>
        <h3>Bestiary</h3>
        <div className='selecters'>
          <div className='monster-order'>
            <p>List order: </p>
            <select name="order" defaultValue={"Name"} onChange={(e) => setListOrder(e.target.value)}>
              <option value="Name">Name</option>
              <option value="Size">Size</option>
              <option value="Type">Type</option>
              <option value="AC">Armor Class</option>
              <option value="HP">Hit Points</option>
              <option value="CR">Challenge Rating</option>
            </select>
            <select name="asc-desc" defaultValue={"Asc"} onChange={(e) => e.target.value === 'Asc' ? setAscOrder(true) : setAscOrder(false)}>
              <option value="Asc">asc</option>
              <option value="Desc">desc</option>
            </select>
          </div>
          <div className='items-filters-div'>
            <p>List filters: </p>
            <select name="type" defaultValue={"all"} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">All types</option>
              <option value="Aberration">Aberrations</option>
              <option value="Beast">Beasts</option>
              <option value="Celestial">Celestials</option>
              <option value="Construct">Constructs</option>
              <option value="Dragon">Dragons</option>
              <option value="Elemental">Elementals</option>
              <option value="Fey">Fey</option>
              <option value="Fiend">Fiends</option>
              <option value="Giant">Giants</option>
              <option value="Humanoid">Humanoids</option>
              <option value="Monstrosity">Monstrosities</option>
              <option value="Ooze">Oozes</option>
              <option value="Plant">Plants</option>
              <option value="Undead">Undead</option>
            </select>
            <select name="size" defaultValue={"all"} onChange={(e) => setSizeFilter(e.target.value)}>
              <option value="all">All sizes</option>
              <option value="Tiny">Tiny</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="Huge">Huge</option>
              <option value="Gargantuan">Gargantuan</option>
            </select>
            <select name="cr" defaultValue={"all"} onChange={(e) => setCrFilter(e.target.value)}>
              <option value="all">All CR</option>
              <option value="0">0</option>
              <option value="1/8">1/8</option>
              <option value="1/4">1/4</option>
              <option value="1/2">1/2</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>
      </div>
      <MonsterList data={orderedList}/>
    </div>
  );

}
