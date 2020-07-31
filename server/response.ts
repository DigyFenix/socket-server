import ResultDb from '../DB/ResultDb';
import { HttpCodes } from './httpCodes';
export default class ResponseServer {
  ok: boolean;
  data: any;
  error: any;

  private constructor(ok: boolean) {
    this.ok = ok;
  }

  public static getResponse(data: ResultDb | any) {
    if (data.error) {
      return ResponseServer.getError(data.error);
    }
    return ResponseServer.getOk(data.data);
  }

  public static getResponseCode(data: ResultDb | any) {
    if (data.error) {
      return HttpCodes.INTERNAL_SERVER_ERROR
    }
    return HttpCodes.OK
  }

  public static getOk(data: any) {
    let rs = new this(true);
    rs.data = data;
    return rs;
  }

  public static getError(error: any) {
    let rs = new this(false);
    rs.error = error;
    return rs;
  }

}
