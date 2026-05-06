import { SpellApiRepository } from "./data/SpellApiRepository";
import { GetGroupOrderLevelUseCase } from "./domain/useCases/GetGroupOrderLevelUseCase";
import { GetGroupOrderTotalUseCase } from "./domain/useCases/GetGroupOrderTotalUseCase";
import { GetRawSpellListUseCase } from "./domain/useCases/GetRawSpellListUseCase";
import { GetSpellGroupsUseCase } from "./domain/useCases/GetSpellGroupsUseCase";
import { GetSpellListUseCase } from "./domain/useCases/GetSpellListUseCase";
import { Level } from "./domain/valueObjects/Level";

export class CompositionRoot {
  private api = SpellApiRepository.instance;
  private getRawList = new GetRawSpellListUseCase(this.api);
  private getList = new GetSpellListUseCase(this.api);
  private getGroups = new GetSpellGroupsUseCase(this.api);
  private getGroupOrderLevel = new GetGroupOrderLevelUseCase(this.api);
  private getGroupOrderTotal = new GetGroupOrderTotalUseCase(this.api);

  // constructor() {
  //   this.getRawSpellList();
  // }

  getRawSpellList = async() => {
    await this.getRawList.execute();
  }

  getSpellList = () => {
    return this.getList.execute();
  }

  getSpellGroups = () => {
    return this.getGroups.execute();
  }

  getSchoolOrderLevel = (level: Level) => {
    return this.getGroupOrderLevel.execute(level);
  }

  getSchoolOrderTotal = () => {
    return this.getGroupOrderTotal.execute();
  }
}
