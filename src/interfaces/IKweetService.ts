import Kweet from "@/models/Kweet";
import QueryResponse from "@/services/cqrs/QueryResponse";

export default interface IKweetService {
  getKweets(): Promise<QueryResponse<Kweet[]>>;
}
