// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from "vue";
import Keycloak from "keycloak-js";
import IKweetService from "./interfaces/IKweetService";

declare module "vue/types/vue" {
  interface VueConstructor {
    $keycloak: Keycloak;
    $kweetService: IKweetService;
    $followService: IFollowService;
    $profileService: IProfileService;
  }
}
