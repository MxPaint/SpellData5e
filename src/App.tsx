import './App.css';
import { useEffect, useState } from 'react';
import { CompositionRoot } from './compositionRoot.ts';
import { Spellbook } from './view/spellbook/Spellbook.tsx';
import { Armory } from './view/armory/Armory.tsx';
import { MagicShop } from './view/magicShop/MagicShop.tsx';
import { Bestiary } from './view/bestiary/Bestiary.tsx';

export default function App() {
  const root = new CompositionRoot();
  const [loading, setLoading] = useState<boolean>(true);
  const [spellView, setSpellView] = useState<number>(3);
  
  useEffect(() => {
    const {
      getSpellRawList,
      getWeaponRawList,
      getMagicItemRawList,
      getMonsterRawList
    } = root.getRawDataCases();

    getSpellRawList.execute().then(() => {
      getWeaponRawList.execute().then(() => {
        getMagicItemRawList.execute().then(() => {
          getMonsterRawList.execute().then(() => {
            setLoading(false);
          })
        });
      });
    });
  });

  if (loading) {
    return (
      <div className="loading">
        <h3>- LOADING DATA -</h3>
        <div>
          <span className="loader"></span>
        </div>
      </div>
    );
  }

  if(spellView === 0){
    return (
      <div>
        <div className='switch-parent'>
          <button className='switch-button' onClick={() => setSpellView(1)}>
            Armory
          </button>
          <button className='switch-button' onClick={() => setSpellView(2)}>
            Magic Shop
          </button>
          <button className='switch-button' onClick={() => setSpellView(3)}>
            Bestiary
          </button>
        </div>
        <Spellbook root={root}/>
      </div>
    );
  }

  if(spellView === 1){
    return (
      <div>
        <div className='switch-parent'>
          <button className='switch-button' onClick={() => setSpellView(0)}>
            Spellbook
          </button>
          <button className='switch-button' onClick={() => setSpellView(2)}>
            Magic Shop
          </button>
          <button className='switch-button' onClick={() => setSpellView(3)}>
            Bestiary
          </button>
        </div>
        <Armory root={root}/>
      </div>
    );
  }

  if(spellView === 2){
    return (
      <div>
        <div className='switch-parent'>
          <button className='switch-button' onClick={() => setSpellView(0)}>
            Spellbook
          </button>
          <button className='switch-button' onClick={() => setSpellView(1)}>
            Armory
          </button>
          <button className='switch-button' onClick={() => setSpellView(3)}>
            Bestiary
          </button>
        </div>
        <MagicShop root={root}/>
      </div>
    );
  }

  return (
    <div>
      <div className='switch-parent'>
        <button className='switch-button' onClick={() => setSpellView(0)}>
          Spellbook
        </button>
        <button className='switch-button' onClick={() => setSpellView(1)}>
          Armory
        </button>
        <button className='switch-button' onClick={() => setSpellView(2)}>
          Magic Shop
        </button>
      </div>
      <Bestiary root={root}/>
    </div>
  );

}