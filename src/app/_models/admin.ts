/**
 * Admin models
 */
export class Admin {
  /**
   * username of the connected user
   */
  username: string;
  /**
   * status of the connected user, can be "root", "teacher" or "administratif"
   */
  status: string;

  constructor(username: string, status: number) {
    this.username = username;
    this.status = this.generateRightStatusUser(status);
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

  public generateNumberStatusUser() {
    if (this.status == "root") return 2;
    if (this.status == "teacher") return 1;
    return 0;
  }

}
