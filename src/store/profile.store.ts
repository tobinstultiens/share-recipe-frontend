/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRootState } from "@/interfaces/IRootState";
import { ActionContext, GetterTree, Module, MutationTree } from "vuex";
import UserProfile from "@/models/Profile";

export interface IProfileState {
  profile: UserProfile | null;
}

type AugmentedProfiletionContext = {
  commit<K extends keyof IProfileMutations>(
    key: K,
    payload: Parameters<IProfileMutations[K]>[1]
  ): ReturnType<IProfileMutations[K]>;
} & Omit<ActionContext<IProfileState, IRootState>, "commit">;

export interface IProfileGetters extends GetterTree<IProfileState, IRootState> {
  getProfile(state: IProfileState): UserProfile;
}

export interface IProfileMutations extends MutationTree<IProfileState> {
  setKweetArray(state: IProfileState, profile: UserProfile): void;
}

export interface IProfileModule {
  namespaced?: boolean;
  state?: IProfileState;
  mutations?: IProfileMutations;
  getters?: IProfileGetters;
}

/**
 * Represents the card module class, an implementation of the IKweetModule interface.
 */
export default class ProfileModule
  implements IProfileModule, Module<IProfileState, any> {
  public namespaced?: boolean;

  public state?: IProfileState;

  public mutations?: IProfileMutations;

  public getters?: IProfileGetters;

  /**
   * Initializes an instance of the KweetModule.
   */
  public constructor() {
    this.namespaced = true;
    this.state = this.getProfileState();
    this.mutations = this.getMutations();
    this.getters = this.getGetters();
  }

  private getProfileState(): IProfileState {
    return this.state!;
  }

  private getMutations(): IProfileMutations {
    const mutations: IProfileMutations = {
      setKweetArray(state: IProfileState, profile: UserProfile) {
        state.profile = profile;
      },
    };
    return mutations;
  }

  private getGetters(): IProfileGetters {
    const getters: IProfileGetters = {
      getProfile(state: IProfileState): UserProfile {
        return state.profile as UserProfile;
      },
    };
    return getters;
  }
}
