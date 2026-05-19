import './App.css';
import { useEffect, useState } from 'react';
import { CompositionRoot } from './compositionRoot.ts';
import { Spellbook } from './view/spellbook/Spellbook.tsx';
import { Armory } from './view/armory/Armory.tsx';

export default function App() {
  const root = new CompositionRoot();
  const [loading, setLoading] = useState<boolean>(true);
  const [spellView, setSpellView] = useState<boolean>(true);
  
  useEffect(() => {
    const {getSpellRawList, getWeaponRawList} = root.getRawDataCases();
    getSpellRawList.execute().then(() => {
      getWeaponRawList.execute().then(() => {
        setLoading(false);
      })
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

  if(spellView){
    return (
      <div>
        <div className='switch-parent'>
          <button className='switch-button' onClick={() => setSpellView(!spellView)}>
            Go to Armory
          </button>
        </div>
        <Spellbook root={root}/>
      </div>
    );
  }

  return (
    <div>
      <div className='switch-parent'>
        <button className='switch-button' onClick={() => setSpellView(!spellView)}>
          Go to Spellbook
        </button>
      </div>
      <Armory root={root}/>
    </div>
  );

}