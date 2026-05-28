import { useEffect, useRef } from "react";
import type { Spell } from "../../../domain/Spells/entities/Spell";
import './spellDialogStyles.css';
import { MarkdownRenderer } from "../../markdownRenderer/MarkdownRenderer";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  spell: Spell;
}

export const SpellDialog = (props: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const name = props.spell.id.value;
  const level = props.spell.level.value;
  const school = props.spell.school.value;
  const classList = props.spell.classList;
  const castingTime = props.spell.castingTime.value;
  const range = props.spell.range.value;
  const components = props.spell.components.getComponents();
  const material = props.spell.materialComponents.value === 'no' ? '' : (' (' + props.spell.materialComponents.value + ')');
  const duration = props.spell.duration.value;
  const concentration = props.spell.concentration.value;
  const ritual = props.spell.ritual.value;
  const desc = props.spell.description.value;
  const highLevel = props.spell.highLevel.value;

  const classListInfo = () => {
    let text = ' - ';

    classList.map((cl) => (
      text += cl.value + ' - '
    ))

    return text;
  }

  const concentrationProp = () => {
    if(concentration) {
      return <li>Requires concentration</li>;
    }

    return <li className='hidden'></li>
  }

  const ritualProp = () => {
    if(ritual) {
      return <li>Can be cast as ritual</li>;
    }

    return <li className='hidden'></li>
  }

  const highLevelsInfo = () => {
    if(highLevel === 'no') {
      return <p className='hidden'></p>
    }
    
    return (
      <div className='high-level'>
        <strong>Higher levels: </strong>
        <MarkdownRenderer content={highLevel} /> 
      </div>
    );
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (props.isOpen) {
      if (!dialog.open) dialog.showModal(); 
    } else {
      if (dialog.open) dialog.close();
    }
  }, [props.isOpen]);

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    props.onClose();
  };

  return (
    <dialog className='spellDialog' ref={dialogRef} onCancel={handleCancel} closedby='any'>
      <h3>{name}</h3>
      <div className='body'>
        <div className='list-block'>
          <div className='list-1'>
            <ul className='spell-class-list'>
              <li>
                <strong>Available for: </strong>{classListInfo()}
              </li>
            </ul>
            <ul>
              <li>Lvl {level} - {school}</li>
              {concentrationProp()}
              {ritualProp()}
            </ul>
          </div>
          <div className='list-2'>
            <ul>
              <li><strong>Casting time: </strong>{castingTime}</li>
              <li><strong>Range: </strong>{range}</li>
              <li><strong>Components: </strong>{components + material}</li>
              <li><strong>Spell duration: </strong>{duration}</li>
            </ul>
          </div>
        </div>
        <div className='info-block'>
          <MarkdownRenderer content={desc}/> 
          {highLevelsInfo()}
        </div>
      </div>
    </dialog>
  );
}
