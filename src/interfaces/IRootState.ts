import { ICardState } from "@/store/kweet.store";
import { IUserState } from "@/store/user.store";

/**
 * Represents the IRootState interface.
 */
export interface IRootState {
  card: ICardState;
  user: IUserState;
}
