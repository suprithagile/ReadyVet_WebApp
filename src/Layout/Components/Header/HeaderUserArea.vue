<template>
  <div class="d-flex">
    <div class="header-btn-lg pr-0">
      <div class="widget-content p-0">
        <div class="widget-content-wrapper">
          <div class="widget-content-left">
            <b-dropdown toggle-class="p-0 mr-2" menu-class="dropdown-menu-lg" variant="link" no-caret right>
              <span slot="button-content">
             
                <div class="icon-wrapper icon-wrapper-alt rounded-circle">
                  <!-- <img v-if="user.image_url!=null" width="42" class="rounded-circle" :src="user.image_full_url" alt />
                  <img v-else width="42" class="rounded-circle" src="@/assets/images/base_app.jpg" alt /> -->
                </div>
              </span>
              <div class="dropdown-menu-header">
                <div class="dropdown-menu-header-inner bg-info">
                  <div class="menu-header-image opacity-2 dd-header-bg-6"></div>
                  <div class="menu-header-content text-left">
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">
                        <div class="widget-content-left mr-3">
                           <!-- <img v-if="user.image_url!=null" width="42" class="rounded-circle" :src="user.image_full_url" alt />
                          <img v-else width="42" class="rounded-circle" src="@/assets/images/base_app.jpg" alt /> -->
                        </div>
                        <div class="widget-content-left">
                          <div class="widget-heading">{{user.name}}{{user.lastname}}</div>
                          <div class="widget-subheading opacity-8">{{user.description}} </div>
                        </div>
                        <div class="widget-content-right mr-2">
                          <button class="btn-pill btn-shadow btn-shine btn btn-focus" @click="logout">{{$t('logout')}}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="scroll-area-xs" style="height: 50px;">
                <VuePerfectScrollbar class="scrollbar-container" v-once>
                  <ul class="nav flex-column">
                    <li class="nav-item">
                      <!-- <a href="javascript:void(0);" class="nav-link">Recover Password</a> -->
                       <router-link :to="{ name: 'change.password'}" class="nav-link"> {{$t('reset_password')}} </router-link>
                    </li>
                  </ul>
                </VuePerfectScrollbar>
              </div>
            </b-dropdown>
          </div>
          <!-- ml-3 header-user-info -->
          <div class="widget-content-left ">
            <div class="widget-heading">{{user.name}}{{user.lastname}}</div>
            <div class="widget-subheading" v-if="user.role">{{user.role.rolename}}</div>
          </div>
         
        </div>
      </div>
    </div>
    

  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";


import { mapGetters, mapActions } from "vuex";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faCalendarAlt,
  faTrashAlt,
  faCheck,
  faFileAlt,
  faCloudDownloadAlt,
  faFileExcel,
  faFilePdf,
  faFileArchive,
  faEllipsisH
} from "@fortawesome/free-solid-svg-icons";


library.add(
  faAngleDown,
  faCalendarAlt,
  faTrashAlt,
  faCheck,
  faFileAlt,
  faCloudDownloadAlt,
  faFileExcel,
  faFilePdf,
  faFileArchive,
  faEllipsisH
);

export default {
  components: {
    VuePerfectScrollbar,
   
   
   
  },
  data: () => ({
    fill1: { gradient: ["#00b09b", "#96c93d"] },
    fill2: { gradient: ["#ff0844", "#ffb199"] },
    fill3: { gradient: ["#f6d365", "#fda085"] },
    showDrawerSection: false,
    user:"",
  }),
  computed: {
    ...mapGetters(["auth"])
  },
  mounted(){
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
     ...mapActions("auth", ["sendLogoutRequest"]),
        logout() {
       // this.sendLogoutRequest();
        this.$router.push("/");
        localStorage.removeItem("user");
        },
  }
};
</script>
