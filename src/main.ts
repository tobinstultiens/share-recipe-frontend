/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import App from "./App.vue";
import { mixinDetictingMobile } from "./mixins/device.detect";
import HttpCommunicator from "./helpers/HttpCommunicator";
import IHttpCommunicator from "./interfaces/IHttpCommunicator";
import "./registerServiceWorker";
import router from "./router/index";
// Plugins
import vuetify from "@/plugins/vuetify";
import snotify from "@/plugins/vuesnotify";
import { store } from "@/plugins/vuex";
import VuePwaInstallPlugin from "vue-pwa-install";

//Services
import IKweetService from "./interfaces/IKweetService";
import KweetService from "./services/KweetService";
import Keycloak from "keycloak-js";

Vue.config.productionTip = false;

//Environment variables
const GATEWAY_API_URL: string = process.env.VUE_APP_GATEWAY_API_URL;

//Generic
const httpCommunicator: IHttpCommunicator = new HttpCommunicator(
  GATEWAY_API_URL
);

//Service
const kweetService: IKweetService = new KweetService(httpCommunicator);

Vue.config.productionTip = false;
// Vue.prototype.$workbox = workbox;
Vue.use(VuePwaInstallPlugin);
Vue.mixin(mixinDetictingMobile);

Vue.$kweetService = kweetService;

const initOptions = {
  url: "https://keycloak.tstultiens.com/auth",
  realm: "ShareRecipe",
  clientId: "vueapp",
  onLoad: "login-required",
};

const keycloak = Keycloak(initOptions);

keycloak
  .init({ onLoad: "login-required" })
  .success((auth: any) => {
    if (!auth) {
      window.location.reload();
    } else {
      console.log("Authenticated");

      new Vue({
        el: "#app",
        render: (h) => h(App, { props: { keycloak: keycloak } }),
      });
    }

    //Token Refresh
    setInterval(() => {
      keycloak
        .updateToken(70)
        .success((refreshed: any) => {
          if (refreshed) {
            console.log("Token refreshed" + refreshed);
          } else {
            console.log("Token not refreshed, valid for " + " seconds");
          }
        })
        .error(() => {
          console.log("Failed to refresh token");
        });
    }, 6000);
  })
  .error(() => {
    console.log("Authenticated Failed");
  });

new Vue({
  vuetify,
  snotify,
  router,
  store,
  render: (h: any) => h(App),
} as any).$mount("#app");
