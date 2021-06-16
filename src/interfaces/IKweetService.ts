import Kweet, { CreateKweet } from "@/models/Kweet";
import Pagination from "@/models/Pagination";
import Response from "@/services/cqrs/Response";

export default interface IKweetService {
  getKweets(pagination: Pagination): Promise<Kweet[]>;
  setKweet(kweet: CreateKweet): Promise<Response>;
}
