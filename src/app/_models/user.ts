/**
 * User model
 */
export class User {
  /**
   * username of the connected user
   */
  username: string;
  /**
   * status of the connected user, can be "root", "teacher" or "administratif"
   */
  status: string;
  /**
   * connection token
   */
  token: string;
  /**
   * number of bans
   */
  banNumber: number;

  constructor(username: string, status: number, token: string, banNumber: number) {
    this.username = username;
    this.status = this.generateRightStatusUser(status);
    this.token = token;
    this.banNumber = banNumber;
  }

  private generateRightStatusUser(status: number) {
    var res;
    switch (status) {
      case 2:
        res = "root";
        break;
      case 1:
        res = "teacher";
        break;
      default:
        res = "viewer";
        break;
    }
    return res;
  }

}
