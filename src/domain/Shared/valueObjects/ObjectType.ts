import { ValueObject } from "./ValueObject";

interface listProps {
  type: RegExp;
  name: string;
}

//'Armor' | 'Potion' | 'Ring' | 'Rod' | 'Scroll' | 'Staff' | 'Wand' | 'Weapon' | 'Wondrous';


const typeList: listProps[] = [
  {type: /Armor/, name:'Armor'},
  {type: /Potion/, name:'Potion'},
  {type: /Ring/, name:'Ring'},
  {type: /Rod/, name:'Rod'},
  {type: /Scroll/, name:'Scroll'},
  {type: /Staff/, name:'Staff'},
  {type: /Wand/, name:'Wand'},
  {type: /Weapon/, name:'Weapon'},
  {type: /Wondrous/, name:'Wondrous'}
];

export interface ObjectTypeProps {
  value: string;
  type: string;
}

export class ObjectType extends ValueObject<ObjectTypeProps> {
  get value(): string { return this.props.value; }
  get type(): string { return this.props.type; }

  private constructor(props: ObjectTypeProps) { super(props); }

  public static create(type: string): ObjectType {

    
    if (!type || type.trim().length === 0) {
      throw new Error('ObjectType cannot be empty');
    }

    let tempType: string = '';
    let tempValue: string = '';

    typeList.forEach((element) => {
      if (type.match(element.type)) {
        tempType = element.name;
        tempValue = type;
      }
    })

    if (tempType === '' && tempValue === '') {
      throw new Error('Type must be valid');
    }
    
    return new ObjectType( {value: tempValue, type: tempType} );

  }
}