import IHttpCommunicator from "@/interfaces/IHttpCommunicator";
import IProfileService from "@/interfaces/IProfileService";
import Profile from "@/models/Profile";
import Response from "./cqrs/Response";

export default class ProfileService implements IProfileService {
  private _httpCommunicator: IHttpCommunicator;
  private _path = "/profile";

  constructor(httpCommunicator: IHttpCommunicator) {
    this._httpCommunicator = httpCommunicator;
  }
  setProfile(userProfile: Profile): Promise<Response> {
    return this._httpCommunicator.post<Profile, Response>(
      `${this._path}`,
      userProfile
    );
  }
}
