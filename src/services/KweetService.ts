import IHttpCommunicator from "@/interfaces/IHttpCommunicator";
import IKweetService from "@/interfaces/IKweetService";
import Kweet from "@/models/Kweet";
import QueryResponse from "./cqrs/QueryResponse";

export default class KweetService implements IKweetService {
  private _httpCommunicator: IHttpCommunicator;
  private _kweetPath = "/kweet";

  constructor(httpCommunicator: IHttpCommunicator) {
    this._httpCommunicator = httpCommunicator;
  }
  getKweets(): Promise<QueryResponse<Kweet[]>> {
    throw new Error("Method not implemented.");
  }
}
