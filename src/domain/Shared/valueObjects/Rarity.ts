import { ValueObject } from "./ValueObject";

interface listProps {
  rarity: RegExp;
  name: string;
}

//rarity by figurine
const extraCheck = /rarity by figurine/;

const rarityList: listProps[] = [
  {rarity: /^common/, name:'common'},
  {rarity: /uncommon/, name:'uncommon'},
  {rarity: /^rare|, rare/, name:'rare'},
  {rarity: /very rare/, name:'very rare'},
  {rarity: /legendary/, name:'legendary'},
  {rarity: /artifact/, name:'artifact'},
  {rarity: /varies/, name:'varies'}
];

export interface RarityProps {
  value: string[];
}

export class Rarity extends ValueObject<RarityProps> {
  get value(): string[] { return this.props.value; }

  private constructor(props: RarityProps) { super(props); }

  public static create(rarity: string): Rarity {
    const itemRarity: string[] = [];
    if (!rarity || rarity.trim().length === 0) {
      throw new Error('Rarity cannot be empty');
    }

    rarityList.forEach((element) => {
      if (rarity.trim().match(element.rarity)) {
        itemRarity.push(element.name)
      }
    })

    if (rarity.trim().match(extraCheck)) {
      itemRarity.push('varies');
    }

    return new Rarity({ value: itemRarity});
  }
}