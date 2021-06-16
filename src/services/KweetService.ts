import IHttpCommunicator from "@/interfaces/IHttpCommunicator";
import IKweetService from "@/interfaces/IKweetService";
import Kweet, { CreateKweet } from "@/models/Kweet";
import Pagination from "@/models/Pagination";
import Response from "./cqrs/Response";

export default class KweetService implements IKweetService {
  private _httpCommunicator: IHttpCommunicator;
  private _path = "/kweet";

  constructor(httpCommunicator: IHttpCommunicator) {
    this._httpCommunicator = httpCommunicator;
  }
  getKweets(pagination: Pagination): Promise<Kweet[]> {
    return this._httpCommunicator.get<Kweet[]>(
      `${this._path}?page=${pagination.pageNumber}&size=${pagination.pageSize}`
    );
  }
  setKweet(kweet: CreateKweet): Promise<Response> {
    return this._httpCommunicator.post<CreateKweet, Response>(
      `${this._path}`,
      kweet
    );
  }
}
