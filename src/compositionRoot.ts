import { SpellApiRepository } from "./data/SpellApiRepository";
import { WeaponApiRepository } from "./data/WeaponApiRepository";
import { GetGroupOrderLevelUseCase } from "./domain/Spells/useCases/GetGroupOrderLevelUseCase";
import { GetGroupOrderTotalUseCase } from "./domain/Spells/useCases/GetGroupOrderTotalUseCase";
import { GetRawSpellListUseCase } from "./domain/Spells/useCases/GetRawSpellListUseCase";
import { GetRawWeaponListUseCase } from "./domain/Weapons/useCases/GetRawWeaponListUseCase";
import { GetSpellGroupsUseCase } from "./domain/Spells/useCases/GetSpellGroupsUseCase";
import { GetSpellListUseCase } from "./domain/Spells/useCases/GetSpellListUseCase";
import { GetWeaponListUseCase } from "./domain/Weapons/useCases/GetWeaponListUseCase";
import { MagicItemApiRepository } from "./data/MagicItemApiRepository";
import { GetMagicItemListUseCase } from "./domain/MagicItems/useCases/GetMagicItemListUseCase";
import { GetRawMagicItemListUseCase } from "./domain/MagicItems/useCases/GetRawMagicItemListUseCase";

export class CompositionRoot {
  private spellApi = SpellApiRepository.instance;
  private weaponApi = WeaponApiRepository.instance;
  private magicItemApi = MagicItemApiRepository.instance;

  private getRawSpellList = new GetRawSpellListUseCase(this.spellApi);
  private getSpellList = new GetSpellListUseCase(this.spellApi);
  private getGroups = new GetSpellGroupsUseCase(this.spellApi);
  private getGroupOrderLevel = new GetGroupOrderLevelUseCase(this.spellApi);
  private getGroupOrderTotal = new GetGroupOrderTotalUseCase(this.spellApi);

  private getRawWeaponList = new GetRawWeaponListUseCase(this.weaponApi);
  private getWeaponList = new GetWeaponListUseCase(this.weaponApi);

  private getRawMagicItemList = new GetRawMagicItemListUseCase(this.magicItemApi);
  private getMagicItemList = new GetMagicItemListUseCase(this.magicItemApi);

  getRawDataCases = () => {
    return {
      getSpellRawList: this.getRawSpellList,
      getWeaponRawList: this.getRawWeaponList,
      getMagicItemRawList: this.getRawMagicItemList
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

  getMagicItemCases = () => {
    return {
      getMagicItemList: this.getMagicItemList,
    }
  };
}
