import KweetModule, { IKweetModule } from "@/store/kweet.store";
import Vue from "vue";
import Vuex from "vuex";
import { Store } from "vuex";
import { IRootState } from "../interfaces/IRootState";

Vue.use(Vuex);

const kweetModule: IKweetModule = new KweetModule();

export const store: Store<IRootState> = new Store<IRootState>({
  modules: {
    kweet: kweetModule,
  },
});
