/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRootState } from "@/interfaces/IRootState";
import {
  ActionContext,
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from "vuex";
import Kweet from "@/models/Kweet";
import { setItem } from "@/helpers/LocalStorageUtility";

export interface IKweetState {
  cardVisible: boolean;
  detailsVisible: boolean;
  cards: Array<Kweet> | null;
}

type AugmentedKweetActionContext = {
  commit<K extends keyof IKweetMutations>(
    key: K,
    payload: Parameters<IKweetMutations[K]>[1]
  ): ReturnType<IKweetMutations[K]>;
} & Omit<ActionContext<IKweetState, IRootState>, "commit">;

export interface IKweetGetters extends GetterTree<IKweetState, IRootState> {
  getKweetArray(state: IKweetState): Array<Kweet>;
}

export interface IKweetActions extends ActionTree<IKweetState, IRootState> {
  setKweet({ commit }: AugmentedKweetActionContext): void;
}

export interface IKweetMutations extends MutationTree<IKweetState> {
  setKweetArray(state: IKweetState): void;
}

export interface IKweetModule {
  namespaced?: boolean;
  state?: IKweetState;
  mutations?: IKweetMutations;
  getters?: IKweetGetters;
  actions?: IKweetActions;
}

/**
 * Represents the card module class, an implementation of the IKweetModule interface.
 */
export default class KweetModule
  implements IKweetModule, Module<IKweetState, any> {
  public namespaced?: boolean;

  public state?: IKweetState;

  public mutations?: IKweetMutations;

  public getters?: IKweetGetters;
  public actions?: IKweetActions;

  /**
   * Initializes an instance of the KweetModule.
   */
  public constructor() {
    this.namespaced = true;
    this.state = this.getKweetState();
    this.mutations = this.getMutations();
    this.getters = this.getGetters();
    this.actions = this.getActions();
  }

  private getKweetState(): IKweetState {
    if (localStorage.getItem("card")) {
      const card: Array<Kweet> = JSON.parse(
        localStorage.getItem("card")!
      ) as Array<Kweet>;
      return { cardVisible: true, detailsVisible: false, cards: card };
    }
    this.state = {
      cardVisible: true,
      detailsVisible: false,
      cards: new Array<Kweet>(),
    };
    return this.state;
  }

  private getMutations(): IKweetMutations {
    const mutations: IKweetMutations = {
      setKweetArray(state: IKweetState) {
        setItem("sup", null);
      },
    };
    return mutations;
  }

  private getGetters(): IKweetGetters {
    const getters: IKweetGetters = {
      getKweetArray(state: IKweetState): Array<Kweet> {
        return state.cards as Array<Kweet>;
      },
    };
    return getters;
  }

  private getActions(): IKweetActions {
    const actions: IKweetActions = {
      setKweet({ commit }: AugmentedKweetActionContext) {
        return null;
      },
    };
    return actions;
  }
}
