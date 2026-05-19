import { SpellApiRepository } from "./data/SpellApiRepository";
import { WeaponApiRepository } from "./data/WeaponApiRepository";
import { GetGroupOrderLevelUseCase } from "./domain/useCases/GetGroupOrderLevelUseCase";
import { GetGroupOrderTotalUseCase } from "./domain/useCases/GetGroupOrderTotalUseCase";
import { GetRawSpellListUseCase } from "./domain/useCases/GetRawSpellListUseCase";
import { GetRawWeaponListUseCase } from "./domain/useCases/GetRawWeaponListUseCase";
import { GetSpellGroupsUseCase } from "./domain/useCases/GetSpellGroupsUseCase";
import { GetSpellListUseCase } from "./domain/useCases/GetSpellListUseCase";
import { GetWeaponListUseCase } from "./domain/useCases/GetWeaponListUseCase";

export class CompositionRoot {
  private spellApi = SpellApiRepository.instance;
  private weaponApi = WeaponApiRepository.instance;

  private getRawSpellList = new GetRawSpellListUseCase(this.spellApi);
  private getSpellList = new GetSpellListUseCase(this.spellApi);
  private getGroups = new GetSpellGroupsUseCase(this.spellApi);
  private getGroupOrderLevel = new GetGroupOrderLevelUseCase(this.spellApi);
  private getGroupOrderTotal = new GetGroupOrderTotalUseCase(this.spellApi);

  private getRawWeaponList = new GetRawWeaponListUseCase(this.weaponApi);
  private getWeaponList = new GetWeaponListUseCase(this.weaponApi);

  getRawDataCases = () => {
    return {
      getSpellRawList: this.getRawSpellList,
      getWeaponRawList: this.getRawWeaponList,
    }
  }

  getSpellDataCases = () => {
    return {
      getSpellList: this.getSpellList,
      getSpellGroups: this.getGroups
    };
  };

  getSpellOrderCases = () => {
    return {
      getOrderLevel: this.getGroupOrderLevel,
      getOrderTotal: this.getGroupOrderTotal
    };
  };

  getWeaponDataCases = () => {
    return {
      getWeaponList: this.getWeaponList,
    }
  };
}
