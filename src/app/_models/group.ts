export class Group {
  /*
   * id of the group
   */
  id: number;
  /*
   * label of the group
   */
  label: string;
  /*
   * arel id of the group
   */
  arel_id: number;

  constructor(id: number, label: string, arel_id?: number) {
    this.id = id;
    this.label = label;
    this.arel_id = id;
  }

}
