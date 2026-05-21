import type { Monster } from "../../../domain/Monsters/entities/Monster";
import type { SpeedBlock } from "../../../domain/Shared/valueObjects/SpeedBlock";

interface Props {
  monster: Monster;
  block: string;
}

export const MonsterBlock = (props: Props) => {
  const name = props.monster.id.value;
  const size = props.monster.size.value;
  const type = props.monster.type.value;
  const ac = props.monster.ac.value;
  const hitPoints = props.monster.hitPoints.value;
  const hitDice = props.monster.hitDice.value;
  const speed = props.monster.speed;
  const statBlock = props.monster.statBlock;
  const cr = props.monster.cr.value;

  const readSpeed = (speed: SpeedBlock) => {

    const speedList = [
      {name: 'Walk:', value: speed.walk},
      {name: 'Burrow:', value: speed.burrow},
      {name: 'Climb:', value: speed.climb},
      {name: 'Swim:', value: speed.swim},
      {name: 'Fly:', value: speed.fly}
    ];

    const cleanSpeedList = speedList.map((element) => {
      if(element.value > 0) {
        return {name: element.name, value: '' +element.value + 'ft'};
      }
    })

    if(speed.hover) {
      cleanSpeedList.push({name: 'Hover', value:''})
    }

    let list = (
      <ul>
        {cleanSpeedList.filter(Boolean).map((element) => (
          <li key={element?.name}>{element?.name} {element?.value}</li>
        ))}
      </ul>
    );

    return list;
  }

  const modPlus = (mod: number) => {
    if (mod > 0) {
      return '+';
    }

    return '';
  }

  const className = `monster-block ${props.block}`

  return (
    <div className={className}>
      <strong>{name}</strong>
      <hr/>
      <div className='monster-card'>
        <div className='monster-info'>
          <p>{size} {type}</p>
          <p>AC: {ac}</p>
          <p>{hitPoints}hp ({hitDice})</p>
          <div className='speed-list'>
            <p>Speed:</p>
            {readSpeed(speed)}
          </div>
          <p className='small-text'>CR: {cr}</p>
        </div>
        <div className='stats'>
          <table>
            <tbody>
              <tr>
                <td>STR</td>
                <td className='text-right'>{statBlock.str.value}</td>
                <td className='text-right'>{modPlus(statBlock.str.getMod())}{statBlock.str.getMod()}</td>
              </tr>
              <tr>
                <td>DEX</td>
                <td className='text-right'>{statBlock.dex.value}</td>
                <td className='text-right'>{modPlus(statBlock.dex.getMod())}{statBlock.dex.getMod()}</td>
              </tr>
              <tr>
                <td>CON</td>
                <td className='text-right'>{statBlock.con.value}</td>
                <td className='text-right'>{modPlus(statBlock.con.getMod())}{statBlock.con.getMod()}</td>
              </tr>
              <tr>
                <td>INT</td>
                <td className='text-right'>{statBlock.int.value}</td>
                <td className='text-right'>{modPlus(statBlock.int.getMod())}{statBlock.int.getMod()}</td>
              </tr>
              <tr>
                <td>WIS</td>
                <td className='text-right'>{statBlock.wis.value}</td>
                <td className='text-right'>{modPlus(statBlock.wis.getMod())}{statBlock.wis.getMod()}</td>
              </tr>
              <tr>
                <td>CHA</td>
                <td className='text-right'>{statBlock.cha.value}</td>
                <td className='text-right'>{modPlus(statBlock.cha.getMod())}{statBlock.cha.getMod()}</td>
              </tr>  
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

}
