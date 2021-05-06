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

Vue.config.productionTip = false;

//Environment variables
const GATEWAY_API_URL: string = process.env.VUE_APP_GATEWAY_API_URL;

//Generic
const httpCommunicator: IHttpCommunicator = new HttpCommunicator(
  GATEWAY_API_URL
);

//Service
//const busSummaryService: IBusSummaryService = new BusSummaryService(
//  httpCommunicator
//);

Vue.config.productionTip = false;
// Vue.prototype.$workbox = workbox;
Vue.use(VuePwaInstallPlugin);
Vue.mixin(mixinDetictingMobile);

// Vue.$authorizationService = authorizationService;
// Vue.$busSummaryService = busSummaryService;

new Vue({
  vuetify,
  snotify,
  router,
  store,
  render: (h: any) => h(App),
} as any).$mount("#app");
