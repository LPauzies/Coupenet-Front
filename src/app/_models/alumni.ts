/**
 * Alumni model
 */
export class Alumni {
  /**
   * username of the alumni
   */
  login: string;
  /**
   * firstname of the alumni
   */
  first_name: string;
  /**
   * lastname of the alumni
   */
  last_name: string;
  /**
   * ban status of the alumni
   */
  ban: boolean;
  /**
   * group of the alumni
   */
  arel_id: number;

  constructor(login: string, first_name: string, last_name: string, ban: boolean, arel_id?: number) {
    this.login = login;
    this.first_name = first_name;
    this.last_name = last_name;
    this.ban = ban;
    this.arel_id = arel_id;
  }

  /**
   * Author : Lucas Pauzies
   *
   * render the banishment status as a string
   *
   * @returns "Banni" if this alumni is banned else "Non Banni"
   */
  renderIsBannedText() {
    return (this.ban) ? "Banni" : "Non Banni";
  }
}
