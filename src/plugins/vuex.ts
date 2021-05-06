import KweetModule, { IKweetModule } from "@/store/kweet.store";
import UserModule, { IUserModule } from "@/store/user.store";
import Vue from "vue";
import Vuex from "vuex";
import { Store } from "vuex";
import { IRootState } from "../interfaces/IRootState";

Vue.use(Vuex);

const userModule: IUserModule = new UserModule();
const kweetModule: IKweetModule = new KweetModule();

export const store: Store<IRootState> = new Store<IRootState>({
  modules: {
    user: userModule,
    kweet: kweetModule,
  },
});
