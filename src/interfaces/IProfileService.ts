import UserProfile from "@/models/Profile";
import Response from "@/services/cqrs/Response";

export default interface IProfileService {
  setProfile(userProfile: UserProfile): Promise<Response>;
}
