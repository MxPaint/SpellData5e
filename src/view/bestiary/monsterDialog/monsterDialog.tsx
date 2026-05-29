import { useEffect, useRef } from "react";
import type { Monster } from "../../../domain/Monsters/entities/Monster";
import { MarkdownRenderer } from "../../markdownRenderer/MarkdownRenderer";
import './monsterDialogStyles.css';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  monster: Monster;
}

export const MonsterDialog = (props: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const name = props.monster.id.value;
  const desc = props.monster.desc.value === 'no' ? '' : props.monster.desc.value;
  const size = props.monster.size.value;
  const type = props.monster.type.value;
  const ac = props.monster.ac.value;
  const acDesc = props.monster.acDesc.value === 'no' ? '' : props.monster.acDesc.value;
  const hitPoints = props.monster.hitPoints.value;
  const hitDice = props.monster.hitDice.value;
  const speed = props.monster.speed;
  const statBlock = props.monster.statBlock;
  const skills = props.monster.skills.skills;
  const dmgVuln = props.monster.dmgVuln.value === 'no' ? '' : props.monster.dmgVuln.value;
  const dmgResist = props.monster.dmgResist.value === 'no' ? '' : props.monster.dmgResist.value;
  const dmgImm = props.monster.dmgImm.value === 'no' ? '' : props.monster.dmgImm.value;
  const conditionImm = props.monster.conditionImm.value === 'no' ? '' : props.monster.conditionImm.value;
  const senses = props.monster.senses.value === 'no' ? '' : props.monster.senses.value;
  const languages = props.monster.languages.value === 'no' ? '' : props.monster.languages.value;
  const cr = props.monster.cr.value;
  const actions = props.monster.actions;
  const bonusActions = props.monster.bonusActions;
  const reactions = props.monster.reactions;
  const legendaryDesc = props.monster.legendaryDesc.value === 'no' ? '' : props.monster.legendaryDesc.value;
  const legendaryActions = props.monster.legendaryActions;
  const specialAbilities = props.monster.specialAbilities;

  const getDesc = () => {
    if(desc === '') {
      return <p className='hidden'></p>
    }

    return (
      <MarkdownRenderer content={desc}/>
    );
  }

  const getSpeed = () => {
    const speedList = [
    {name: 'Walk', value: props.monster.speed.walk},
    {name: 'Burrow', value: props.monster.speed.burrow},
    {name: 'Climb', value: props.monster.speed.climb},
    {name: 'Swim', value: props.monster.speed.swim},
    {name: 'Fly', value: props.monster.speed.fly},
    ];

    const cleanSpeedList = speedList.map((element) => {
      if(element.value > 0) {
        return {name: element.name, value: '' +element.value + 'ft'};
      }
    })

    if(speed.hover) {
      cleanSpeedList.push({name: 'Hover', value:''})
    }

    const list = (
      <div>
        {cleanSpeedList.filter(Boolean).map((element) => (
          <p key={element?.name}>{element?.name} {element?.value}</p>
        ))}
      </div>
    );

    return list;
  }

  const modPlus = (mod: number) => {
    if (mod > 0) {
      return '+' + mod;
    }

    return '' + mod;
  }

  const getSkills = () => {
    if(skills.length === 0) {
      return <p className='hidden'></p>
    }

    let text = '';
    skills.map((skill) => {
      text += skill.name + ' ' + modPlus(skill.value) + ', '
    })

    return <p><strong>Skills:</strong> {text}</p>;
  }

  const getSenses = () => {
    if(senses === '') {
      return <p className='hidden'></p>
    }

    return <p><strong>Senses:</strong> {senses}</p>;
  }

  const getLanguages = () => {
    if(languages === '') {
      return <p className='hidden'></p>
    }

    return <p><strong>Languages:</strong> {languages}</p>;
  }

  const getVulnerabilities = () => {
    if(dmgVuln === '') {
      return <p className='hidden'></p>
    }

    return <p><strong>Vulnerabilities:</strong> {dmgVuln}</p>;
  }

  const getResistances = () => {
    if(dmgResist === '') {
      return <p className='hidden'></p>
    }

    return <p><strong>Resistances:</strong> {dmgResist}</p>;
  }

  const getImmunities = () => {
    if(dmgImm === '') {
      return <p className='hidden'></p>
    }

    return <p><strong>Immunities:</strong> {dmgImm}</p>;
  }

  const getConditions = () => {
    if(conditionImm === '') {
      return <p className='hidden'></p>
    }

    return <p><strong>Condition immunities:</strong> {conditionImm}</p>;
  }

  const getTraits = () => {
    if (specialAbilities.length === 0){
      return <div className='hidden'></div>
    }

    const block = (
      <div>
        <h4>Traits</h4>
        <div className='action-block'>
          {specialAbilities.map((item) => (
            <MarkdownRenderer content={'**' + item.name + ':** ' + item.desc} key={item.name}/>
          ))}
        </div>
      </div>
    );

    return block;
  }

  const getActions = () => {
    if (actions.length === 0){
      return <div className='hidden'></div>
    }

    const block = (
      <div>
        <h4>Actions</h4>
        <div className='action-block'>
          {actions.map((item) => (
            <MarkdownRenderer content={'**' + item.name + ':** ' + item.desc} key={item.name}/>
          ))}
        </div>
      </div>
    );

    return block;
  }

  const getBonusActions = () => {
    if (bonusActions.length === 0){
      return <div className='hidden'></div>
    }

    const block = (
      <div>
        <h4>Bonus actions</h4>
        <div className='action-block'>
          {bonusActions.map((item) => (
            <MarkdownRenderer content={'**' + item.name + ':** ' + item.desc} key={item.name}/>
          ))}
        </div>
      </div>
    );

    return block;
  }

  const getReactions = () => {
    if (reactions.length === 0){
      return <div className='hidden'></div>
    }

    const block = (
      <div>
        <h4>Reactions</h4>
        <div className='action-block'>
          {reactions.map((item) => (
            <MarkdownRenderer content={'**' + item.name + ':** ' + item.desc} key={item.name}/>
          ))}
        </div>
      </div>
    );

    return block;
  }

  const getLegendary = () => {
    if (legendaryActions.length === 0){
      return <div className='hidden'></div>
    }

    const block = (
      <div>
        <h4>Legendary actions</h4>
        <div className='legendary-desc'>
          <p>{legendaryDesc}</p>
        </div>
        <div className='action-block'>
          {legendaryActions.map((item) => (
            <MarkdownRenderer content={'**' + item.name + ':** ' + item.desc} key={item.name}/>
          ))}
        </div>
      </div>
    );

    return block;
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
    <dialog className='monsterDialog' ref={dialogRef} onCancel={handleCancel} closedby='any'>
      <h2>{name}</h2>
      <p className='monster-type'>{size} {type}</p>
      <div className='body'>
        <div className='dialog-m-general'>
          <div className='monster-general'>
            <div className='general-block'>
              <div className='compound'>
                <div><strong>AC</strong> {ac} {acDesc}</div>
                <div><strong>Initiative</strong> {modPlus(statBlock.dex.getMod())}</div>
              </div>
              <div><strong>HP</strong> {hitPoints} {'(' + hitDice + ')'}</div>
              <div className='monster-speed-list'>
                <p><strong>Speed:</strong>  </p>
                {getSpeed()}
              </div>
            </div>
            <div className='skills-block'>
              {getVulnerabilities()}
              {getResistances()}
              {getImmunities()}
              {getConditions()}
              {getSkills()}
              {getSenses()}
              {getLanguages()}
            </div>
            <div className='cr'>CR {cr}</div>
          </div>
          <div className='table-block'>
            <table>
              <tbody>
                <tr>
                  <td className='table-start'>STR</td>
                  <td className='text-right'>{statBlock.str.stat + ' (' + modPlus(statBlock.str.getMod()) + ')'}</td>
                  <td className='table-end text-right'>{modPlus(statBlock.str.save)}</td>
                  <td className='table-start'>INT</td>
                  <td className='text-right'>{statBlock.int.stat + ' (' + modPlus(statBlock.int.getMod()) + ')'}</td>
                  <td className='table-end text-right'>{modPlus(statBlock.int.save)}</td>
                </tr>
                <tr>
                  <td className='table-start'>DEX</td>
                  <td className='text-right'>{statBlock.dex.stat + ' (' + modPlus(statBlock.dex.getMod()) + ')'}</td>
                  <td className='table-end text-right'>{modPlus(statBlock.dex.save)}</td>
                  <td className='table-start'>WIS</td>
                  <td className='text-right'>{statBlock.wis.stat + ' (' + modPlus(statBlock.wis.getMod()) + ')'}</td>
                  <td className='table-end text-right'>{modPlus(statBlock.wis.save)}</td>
                </tr>
                <tr>
                  <td className='table-start'>CON</td>
                  <td className='text-right'>{statBlock.con.stat + ' (' + modPlus(statBlock.con.getMod()) + ')'}</td>
                  <td className='table-end text-right'>{modPlus(statBlock.con.save)}</td>
                  <td className='table-start'>CHA</td>
                  <td className='text-right'>{statBlock.cha.stat + ' (' + modPlus(statBlock.cha.getMod()) + ')'}</td>
                  <td className='table-end text-right'>{modPlus(statBlock.cha.save)}</td>
                </tr>
              </tbody>
            </table>
            {getDesc()}
          </div>
        </div>
        <div className='dialog-m-ability-block'>
          {getTraits()}
          {getActions()}
          {getBonusActions()}
          {getReactions()}
          {getLegendary()}
        </div>
      </div>
    </dialog>
  );
}
