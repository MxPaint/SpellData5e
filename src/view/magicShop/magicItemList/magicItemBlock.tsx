import type { MagicItem } from "../../../domain/MagicItems/entities/MagicItem";

interface Props {
  magicItem: MagicItem;
}

export const MagicItemBlock = (props: Props) => {
  const name = props.magicItem.id.value;
  const typeFull = props.magicItem.type.value;
  const type = props.magicItem.type.type;
  const attunement = props.magicItem.attunement.value;
  const rarity = props.magicItem.rarity.value;
  const description = props.magicItem.description.value;

  const readAttunement = (att: boolean) => {
    return (
      att ? 'Needs attunement' : ''
    );
  };

  const readRarity = (rarity: string[]) => {
    let text = '';
    rarity.forEach((element) => {
      text += ' - ' + element;
    })
    text += ' -';
    return text;
  }

  const itemClass = `magic-item-block ${type}`

  return (
    <div className={itemClass}>
      <div className='data-card'>
        <strong>{name}</strong>
        <div>
          <p>{typeFull}</p>
          <p>{readRarity(rarity)}</p>
          <p>{readAttunement(attunement)}</p>
        </div>
      </div>
      <p className='description'>{description}</p>
    </div>
  );
}
