import {Injectable} from "@propero/propulsion-core";



@Injectable()
export class UserRepo {

  private me: any = { hello: "world" };

  public async setMe(me: any) {
    this.me = me;
  }

  public async getMe() {
    return this.me;
  }
}
