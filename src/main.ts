/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import IProfileService from "./interfaces/IProfileService";
import ProfileService from "./services/ProfileService";
import UserProfile from "./models/Profile";
import { setItem } from "./helpers/LocalStorageUtility";
import User from "./models/User";

Vue.config.productionTip = false;

//Environment variables
const GATEWAY_API_URL: string = process.env.VUE_APP_GATEWAY_API_URL;

//Generic
const httpCommunicator: IHttpCommunicator = new HttpCommunicator(
  GATEWAY_API_URL
);

//Service
const kweetService: IKweetService = new KweetService(httpCommunicator);
const profileService: IProfileService = new ProfileService(httpCommunicator);

Vue.config.productionTip = false;
// Vue.prototype.$workbox = workbox;
Vue.use(VuePwaInstallPlugin);
Vue.mixin(mixinDetictingMobile);

Vue.$kweetService = kweetService;
Vue.$profileService = profileService;

const initOptions = {
  url: "https://keycloak.tstultiens.com/auth",
  realm: "ShareRecipe",
  clientId: "vueapp",
};

const keycloak = Keycloak(initOptions);

keycloak
  .init({ onLoad: "login-required", checkLoginIframe: false })
  .success((auth: any) => {
    if (!auth) {
      window.location.reload();
    } else {
      console.log("Authenticated");

      new Vue({
        vuetify,
        snotify,
        router,
        store,
        render: (h: any) => h(App),
      } as any).$mount("#app");

      console.log(keycloak.idToken);
      localStorage.setItem("vue-token", keycloak.token!);
      localStorage.setItem("vue-refresh-token", keycloak.refreshToken!);
      const profile: UserProfile = {
        //@ts-ignore
        userDisplayName: keycloak.idTokenParsed!.name!,
        userProfileDescription: "",
        userProfileImage:
          "http://zultimate.com/wp-content/uploads/2019/12/default-profile.png",
      };
      const user: User = {
        userId: keycloak.idToken!,
        auth: { access_token: keycloak.idToken!, authId: "" },
      };
      setItem("user", user);
      Vue.$profileService.setProfile(profile);
      Vue.$keycloak = keycloak;
    }

    //Token Refresh
    setInterval(() => {
      keycloak
        .updateToken(70)
        .success((refreshed: any) => {
          if (refreshed) {
            //console.log("Token refreshed" + refreshed);
          } else {
            //console.log("Token not refreshed, valid for " + " seconds");
          }
        })
        .error(() => {
          console.log("Failed to refresh token");
        });
    }, 60000);
  })
  .error(() => {
    console.log("Authenticated Failed");
  });
