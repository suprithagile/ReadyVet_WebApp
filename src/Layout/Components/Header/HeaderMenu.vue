<template>
  <div class="header-dots">
    <ul class="nav flex-column head-menu" style="display: contents">
      <li
        class="nav-link mobile_header_menus"
        v-bind:class="{ 'link-active': selectedMenu == 'WelcomePage' }"
        v-if="user.rolename != 'SuperUser' && user.rolename != 'Admin'"
        @click="activateMenu('WelcomePage')"
      >
        {{ $t("Register") }}
      </li>
      <!-- <li
        class="nav-link"
        v-bind:class="{ 'link-active': selectedMenu == 'dashboard' }"
      >
        {{ $t("Stripe") }}
      </li> -->

      <li
        class="nav-link"
      >
        {{ $t("User List") }}
      </li>

      <li
        class="nav-link"
      >
        {{ $t("Coupon List") }}
      </li>
     
      <li
        class="nav-link"
      >
        {{ $t("Subscription Plans") }}
      </li>
     
       
     
  

      <!-- <div id="myDropdown" class="dropdown-content">
                <li @click="activateMenu('communication'), activateChat()">{{ $t("contact_job_seeker") }}</li>
                <li @click="activateMenu('communication'), activateChat()">{{ $t("contact_councellor") }}</li>
            </div> -->
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  components: {},
  data: () => ({
    user: [],
    selectedMenu: null,
    chat_unseen_count: null,
    notification_unseen_count: null,
    individualHighlight: [],
    storeMenu: "",
  }),
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.storeMenu = localStorage.getItem("activemenu");
    if (this.storeMenu == null) {
      this.selectedMenu = "dashboard";
    } else {
      this.selectedMenu = this.storeMenu;
    }

    // this.defaultDashboard();
    if (this.user != null) {
      this.unseen_message_count();
      this.unseen_notification_count();
    }
    var channel = this.$pusher.subscribe("notify-channel");
    // chat messages event
    channel.bind("chatmessages", (data) => {
      if (this.user.id == data.data.to_id) {
        this.unseen_message_count();
      }
    });
    channel.bind("message_seen_status", (data) => {
      if (this.user.id == data.data.to_id) {
        this.unseen_message_count();
      }
    });
    channel.bind("push_notifications", () => {
      this.unseen_notification_count();
    });
  },

  methods: {
    ...mapActions("auth", ["sendLogoutRequest"]),
    logout() {
      // this.sendLogoutRequest();
      localStorage.removeItem("user");
      localStorage.removeItem("activemenu");
      this.$router.push({ name: "WelcomePage" });
      document.location.href = "/";
      // this.$router.push({
      //         name: "WelcomePage"
      // });
    },
    // activateChat() {
    //     // document.getElementById("myDropdown").classList.toggle("show");

    //     // Close the dropdown menu if the user clicks outside of it
    //     window.onclick = function (event) {
    //         if (!event.target.matches(".dropbtn")) {
    //             var dropdowns = document.getElementsByClassName("dropdown-content");
    //             var i;
    //             for (i = 0; i < dropdowns.length; i++) {
    //                 var openDropdown = dropdowns[i];
    //                 if (openDropdown.classList.contains("show")) {
    //                     openDropdown.classList.remove("show");
    //                 }
    //             }
    //         }
    //     };

    // },
    unseen_message_count() {
      axios
        .get(process.env.VUE_APP_API_URL_ADMIN + "unseen_chat")
        .then((res) => {
          this.chat_unseen_count = res.data.chat_unseen_count;
          this.individualHighlight = res.data.individual_highlight;
          localStorage.setItem(
            "individual_highlight",
            this.individualHighlight
          );
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },
    unseen_notification_count() {
      axios
        .get(process.env.VUE_APP_API_URL_ADMIN + "unseen_notification")
        .then((res) => {
          this.notification_unseen_count = res.data.notification_unseen_count;
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },
    // updateChatSeen() {
    // this.chat_unseen_count = 0;
    // alert('tesrt')
    // axios.post(process.env.VUE_APP_API_URL_ADMIN +'update_all_unseen_chat').then(res => {
    // console.log(res);
    // this.unseen_message_count();
    // }).catch(err => {
    //     console.log("this error" + err)
    // })
    //},
    switchChannel(el) {
      // find all the elements in your channel list and loop over them
      Array.prototype.slice
        .call(document.querySelectorAll('ul[data-tag="channelList"] li'))
        .forEach(function (element) {
          // remove the selected class
          element.classList.remove("selected");
        });
      // add the selected class to the element that was clicked
      el.classList.add("selected");
    },
    defaultDashboard() {
      if (this.user.rolename == "Jobseeker") {
        this.selectedMenu = "dashboard";
      } else if (this.user.rolename == "Employer") {
        this.selectedMenu = "dashboard";
      } else {
        this.selectedMenu = localStorage.getItem("activemenu");
      }
    },
    activateMenu(menu) {
      localStorage.setItem("activemenu", menu);

      if (menu == "users.view") {
        this.$router.push({
          name: "users.view",
          query: { slug: this.user.slug, view: "myprofile" },
        });
        this.selectedMenu = menu;
      } else {
        this.$router.push({ name: menu });
        this.selectedMenu = menu;
      }
    },
    reset_notification_count() {
      console.log("reset called");
      axios
        .post(process.env.VUE_APP_API_URL_ADMIN + "update_unseen_notification")
        .then(() => {
          this.unseen_notification_count();
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },
  },
};
</script>
<style scope>
.v-badge__badge {
  left: 2px !important;
}
.header-dots .icon-wrapper-alt .badge-dot {
  position: absolute;
}
.nav-link {
  text-decoration: none;
  background: transparent;
  font-weight: normal;
  padding: 0.5rem 0px !important;
  margin: 0px 17px !important;
}

.nav-link:active {
  color: black !important;
}
.link-active {
  color: green;
  border-bottom: 2px solid green;
}
/* Dropdown Button */
.dropbtn {
  background-color: #3498db;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

/* Dropdown button on hover & focus */
.dropbtn:hover,
.dropbtn:focus {
  background-color: #2980b9;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content li {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

/* Change color of dropdown links on hover */
.dropdown-content li:hover {
  background-color: #ddd;
}

/* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
.show {
  display: block;
}
.dropdown-content {
  position: absolute;
  right: 135px;
  top: 60px;
}
.logout-btn {
  font-size: 14px;
}
	@media only screen and (min-width: 200px) and (max-width: 990px)
  {
.header-dots{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    /* margin-top: 20px; */
}
}
@media only screen and (min-width: 200px) and (max-width: 768px) {
  .mobile_view_myprofile {
    display: none;
  }
  .mobile_header_menus {
    width: 40px;
    justify-content: center;
  }
  .mobile_header_icon{
    margin-left: 10px;
    margin-top: 8px;
    margin-bottom: 20px;
  }
}
</style>
