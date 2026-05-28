import { useEffect, useMemo, useState } from "react";
import type { MagicItem } from "../../domain/MagicItems/entities/MagicItem";
import type { CompositionRoot } from "../../compositionRoot";
import { MagicItemList } from "./magicItemList/MagicItemList";
import { itemListFiltered } from "./magicItemList/itemListFilter";
import { ObjectType } from "../../domain/Shared/valueObjects/ObjectType";
import { Attunement } from "../../domain/Shared/valueObjects/Attunement";
import { magicItemOrderList } from "./magicItemList/magicItemsOrder";

interface Props {
  root: CompositionRoot
}

export const MagicShop = (props: Props) => {

  const [listData, setListData] = useState<MagicItem[]>([]);

  const [filteredList, setFilteredList] = useState<MagicItem[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [attunementFilter, setAttunementFilter] = useState<string>('all');
  const [rarityFilter, setRarityFilter] = useState<string>('all');
  
  const [listOrder, setListOrder] = useState<string>('Name');
  const [ascOrder, setAscOrder] = useState<boolean>(true);

  useEffect(() => {
    const {getMagicItemList} = props.root.getMagicItemCases();

    setListData(getMagicItemList.execute());
  }, []);

  useEffect(() => {
  
    setFilteredList(itemListFiltered({
      list: listData,
      type: typeFilter === 'all' ? typeFilter : ObjectType.create(typeFilter),
      attunement: attunementFilter === 'all' ? attunementFilter : Attunement.create(attunementFilter),
      rarity: rarityFilter
    }));

  }, [typeFilter, attunementFilter, rarityFilter, listData]);
    
  const orderedList = useMemo(() => {
      return magicItemOrderList({
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
        <h3>Magic Shop</h3>
        <div className='selecters'>
          <div className='monster-order'>
            <p>List order: </p>
            <select name="order" defaultValue={"Name"} onChange={(e) => setListOrder(e.target.value)}>
              <option value="Name">Name</option>
              <option value="Rarity">Rarity</option>
              <option value="Type">Type</option>
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
              <option value="Armor">Armor</option>
              <option value="Potion">Potions</option>
              <option value="Ring">Rings</option>
              <option value="Rod">Rods</option>
              <option value="Scroll">Scrolls</option>
              <option value="Staff">Staves</option>
              <option value="Wand">Wands</option>
              <option value="Weapon">Weapons</option>
              <option value="Wondrous">Wondrous items</option>
            </select>
            <select name="attunement" defaultValue={"all"} onChange={(e) => setAttunementFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="attunement">Attunement</option>
              <option value="">No attunement</option>
            </select>
            <select name="rarity" defaultValue={"all"} onChange={(e) => setRarityFilter(e.target.value)}>
              <option value="all">All rarities</option>
              <option value="common">Common</option>
              <option value="uncommon">Uncommon</option>
              <option value="rare">Rare</option>
              <option value="very rare">Very rare</option>
              <option value="legendary">Legendary</option>
              <option value="artifact">Artifact</option>
              <option value="varies">Varies</option>
            </select>
          </div>
        </div>
      </div>
      <MagicItemList data={orderedList}/>
    </div>
  )
}
  