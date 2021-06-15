import Kweet, { CreateKweet } from "@/models/Kweet";
import Pagination from "@/models/Pagination";
import QueryResponse from "@/services/cqrs/QueryResponse";
import Response from "@/services/cqrs/Response";

export default interface IKweetService {
  getKweets(pagination: Pagination): Promise<QueryResponse<Kweet[]>>;
  setKweet(kweet: CreateKweet): Promise<Response>;
}
