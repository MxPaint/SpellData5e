import { SpellApiRepository } from "./data/SpellApiRepository";
import { GetGroupOrderLevelUseCase } from "./domain/useCases/GetGroupOrderLevelUseCase";
import { GetGroupOrderTotalUseCase } from "./domain/useCases/GetGroupOrderTotalUseCase";
import { GetRawSpellListUseCase } from "./domain/useCases/GetRawSpellListUseCase";
import { GetSpellGroupsUseCase } from "./domain/useCases/GetSpellGroupsUseCase";
import { GetSpellListUseCase } from "./domain/useCases/GetSpellListUseCase";

export class CompositionRoot {
  private api = SpellApiRepository.instance;

  private getRawList = new GetRawSpellListUseCase(this.api);
  private getList = new GetSpellListUseCase(this.api);
  private getGroups = new GetSpellGroupsUseCase(this.api);
  private getGroupOrderLevel = new GetGroupOrderLevelUseCase(this.api);
  private getGroupOrderTotal = new GetGroupOrderTotalUseCase(this.api);

  getDataCases = () => {
    return {
      getRawList: this.getRawList,
      getSpellList: this.getList,
      getSpellGroups: this.getGroups
    };
  };

  getOrderCases = () => {
    return {
      getOrderLevel: this.getGroupOrderLevel,
      getOrderTotal: this.getGroupOrderTotal
    };
  };
}
