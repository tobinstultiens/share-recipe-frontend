import { getItem, setItem } from "@/helpers/LocalStorageUtility";
import {
  ActionContext,
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from "vuex";
import { IRootState } from "@/interfaces/IRootState";
import User from "@/models/User";

export interface IUserState {
  user: User | null;
}

class UserState implements IUserState {
  public get user(): User | null {
    return getItem<User>("user");
  }
  public set user(value: User | null) {
    setItem("user", value);
  }
}

export interface IUserMutations extends MutationTree<IUserState> {
  signIn(state: IUserState, auth: IAuth): void;
  signOut(state: IUserState, payload: {}): void;
}

type AugmentedUserActionContext = {
  commit<K extends keyof IUserMutations>(
    key: K,
    payload: Parameters<IUserMutations[K]>[1]
  ): ReturnType<IUserMutations[K]>;
} & Omit<ActionContext<IUserState, IRootState>, "commit">;

export interface IUserActions extends ActionTree<IUserState, IRootState> {
  signIn({ commit }: AugmentedUserActionContext, payload: IAuth): void;
  signOut({ commit }: AugmentedUserActionContext, payload: {}): void;
}

export interface IUserGetters extends GetterTree<IUserState, IRootState> {
  isSignedIn(state: IUserState): boolean;
}

export interface IUserModule {
  namespaced?: boolean;
  state?: IUserState;
  mutations?: IUserMutations;
  getters?: IUserGetters;
  actions?: IUserActions;
}

/**
 * Represents the user module class, an implementation of the IUserModule interface.
 */
export default class UserModule
  implements IUserModule, Module<IUserState, IRootState> {
  public namespaced?: boolean;

  public state?: IUserState;

  public mutations?: IUserMutations;

  public getters?: IUserGetters;

  public actions?: IUserActions;

  /**
   * Initializes an instance of the UserModule.
   */
  public constructor() {
    this.namespaced = true;
    this.state = this.getUserState();
    this.mutations = this.getMutations();
    this.getters = this.getGetters();
    this.actions = this.getActions();
  }

  private getActions(): IUserActions {
    const actions: IUserActions = {
      signIn({ commit }: AugmentedUserActionContext, payload: IAuth): void {
        commit("signIn", payload);
      },
      signOut({ commit }: AugmentedUserActionContext, payload: {}): void {
        commit("signOut", {});
      },
    };
    return actions;
  }

  private getGetters(): IUserGetters {
    const getters: IUserGetters = {
      isSignedIn(state: IUserState): boolean {
        return state.user !== null;
      },
    };
    return getters;
  }

  private getUserState(): IUserState {
    return new UserState();
  }

  private getMutations(): IUserMutations {
    const mutations: IUserMutations = {
      signIn(state: IUserState, auth: IAuth): void {
        const jwt: JWT = decode(auth.access_token) as JWT;
        const user: User = {
          auth: auth,
          subject: jwt.subject,
        };
        state.user = user;
      },
      signOut(state: IUserState): void {
        state.user = null;
      },
    };
    return mutations;
  }
}
