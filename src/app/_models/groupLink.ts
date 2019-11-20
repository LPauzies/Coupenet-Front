export class GroupLink {
  /*
   * global group of the link
   */
  globalGroup: string;
  /*
   * group of the link
   */
  group: string;
  /*
   * id global group of the link
   */
  idGlobalGroup: number;
  /*
   * id group of the link
   */
  idGroup: number;

  constructor(globalGroup: string, group: string, idGlobalGroup: number, idGroup: number) {
    this.globalGroup = globalGroup;
    this.group = group;
    this.idGlobalGroup = idGlobalGroup;
    this.idGroup = idGroup;
  }

  /**
   * Author : Lucas Pauzies
   *
   * @returns `true` if the object is defined else `false`
   */
  public isNotNull() {
    return this.globalGroup != undefined && this.group != undefined && this.idGlobalGroup != undefined && this.idGroup != undefined;
  }

}
