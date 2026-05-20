import './App.css';
import { useEffect, useState } from 'react';
import { CompositionRoot } from './compositionRoot.ts';
import { Spellbook } from './view/spellbook/Spellbook.tsx';
import { Armory } from './view/armory/Armory.tsx';
import { MagicShop } from './view/magicShop/MagicShop.tsx';

export default function App() {
  const root = new CompositionRoot();
  const [loading, setLoading] = useState<boolean>(true);
  const [spellView, setSpellView] = useState<number>(0);
  
  useEffect(() => {
    const {getSpellRawList, getWeaponRawList, getMagicItemRawList} = root.getRawDataCases();
    getSpellRawList.execute().then(() => {
      getWeaponRawList.execute().then(() => {
        getMagicItemRawList.execute().then(() => {
          setLoading(false);
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
            Go to Armory
          </button>
          <button className='switch-button' onClick={() => setSpellView(2)}>
            Go to Magic Shop
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
            Go to Spellbook
          </button>
          <button className='switch-button' onClick={() => setSpellView(2)}>
            Go to Magic Shop
          </button>
        </div>
        <Armory root={root}/>
      </div>
    );
  }

  return (
    <div>
      <div className='switch-parent'>
        <button className='switch-button' onClick={() => setSpellView(0)}>
          Go to Spellbook
        </button>
        <button className='switch-button' onClick={() => setSpellView(1)}>
            Go to Armory
          </button>
      </div>
      <MagicShop root={root}/>
    </div>
  );

}