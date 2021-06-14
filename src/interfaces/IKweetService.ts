import Kweet from "@/models/Kweet";
import Pagination from "@/models/Pagination";
import QueryResponse from "@/services/cqrs/QueryResponse";

export default interface IKweetService {
  getKweets(pagination: Pagination): Promise<QueryResponse<Kweet[]>>;
}
