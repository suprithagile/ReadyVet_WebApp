<template>
  <v-app class="container">
    <div>
      <page-title :heading="$t('userview')" :icon="icon"></page-title>
      <v-app-bar flat color="white">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-text-field
              v-on="on"
              v-model="search"
              append-icon="search"
              v-bind:label="$t('search')"
              class="srch_bar"
              single-line
              hide-details
            ></v-text-field>
          </template>
          <span>{{ $t("search") }}</span>
        </v-tooltip>
        <v-spacer></v-spacer>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" small class="mb-2" v-on="on">Add new </v-btn>
          </template>
          <span>{{ $t("add_new") }}</span>
        </v-tooltip>
      </v-app-bar>

      <v-data-table
        :headers="headers"
        :items="userarray"
        class="elevation-1"
        :search="search"
        :loading="initval"
        v-bind:no-data-text="$t('no_data_available')"
        :footer-props="{
          'items-per-page-text': $t('rows_per_page'),
        }"
      >
        <template v-slot:item="props">
          <tr>
            <td>
              {{ props.item.salutation }} {{ props.item.name }}
              {{ props.item.lastname }}
            </td>
            <td>{{ props.item.mobile }}</td>
            <td>{{ props.item.email }}</td>
            <td v-if="props.item.subscription_plan">
              {{ props.item.subscription_plan }}
            </td>
            <td v-else>-</td>

            <!-- <td >
         
            <router-link  :to="{ name: 'users.amend', params: { id: props.item.id } }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" small class="mr-2">edit</v-icon>
                </template>
                <span>{{$t('edit')}}</span>
              </v-tooltip>
            </router-link>
             </td> -->
            <td class="text-center">
              <router-link
                :to="{ name: 'users.view', query: { slug: props.item.slug } }"
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small class="mr-2" color="primary">{{
                      $t("view")
                    }}</v-btn>
                  </template>
                  <span>{{ $t("view") }}</span>
                </v-tooltip>
              </router-link>
            </td>
            <td class="text-center">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <div v-on="on" class="d-inline-block">
                    <v-btn
                      class="status-btn-width"
                      :disabled="isDisabled"
                      @click="deleteUser(props.item.id)"
                      small
                      v-bind:class="[
                        props.item.status == 1 ? 'success' : 'warning',
                      ]"
                    >
                      <span v-if="props.item.status == 1">{{
                        $t("active")
                      }}</span>
                      <span v-if="props.item.status == 0">{{
                        $t("inactive")
                      }}</span>
                    </v-btn>
                  </div>
                </template>
                <span>{{ $t("status") }}</span>
              </v-tooltip>
            </td>
            <!-- <td>
             <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                 <div v-on="on" class="d-inline-block">
               
                <v-btn
                :disabled="send_credentials_disabled"
                small
                @click="resetPassword(props.item.email)"
                color="error"
                >
                <b-spinner
                  :disabled="isBtnLoading"
                  small
                  v-if="isBtnLoading"
                ></b-spinner>
              {{$t('send_credentials')}}
              </v-btn>
              </div>
              </template>
              <span>{{$t('send_credentials')}}</span>
            </v-tooltip>
          </td> -->
          </tr>
        </template>
      </v-data-table>
    </div>
  </v-app>
</template>

<script>
import FlashMessage from "@smartweb/vue-flash-message";
import userarray from "../../../src/assets/userdata.json";
import PageTitle from "../../../src/Layout/Components/PageTitle.vue";
import Vue from "vue";
Vue.use(FlashMessage);
export default {
  components: {
    PageTitle,
  },
  data: () => ({
    userarray,
    search: "",
    initval: false,
   
     }),
  computed: {
    
    headers() {
      return [
        {
          text: this.$t("name"),
          align: "left",
          value: "name",
        },
        {
          text: this.$t("mobile"),
          value: "mobile",
        },
        {
          text: this.$t("email"),
          value: "email",
        },

        {
          text: this.$t("Subscription Plan"),
          value: "role",
        },

        //  {
        //   text: this.$t('action'),
        //   value: "status",
        // },
        {
          text: this.$t("view"),
            align: "center",
          value: "view",
        },
        {
          text: this.$t("status"),
          value: "status",
          align: "center",
          sortable: false,
        },
        //  {
        //   text: this.$t('action'),
        //   value: "status",
        //   //align: "center",
        //   sortable: false,
        // },
      ];
    },
  },
  mounted() {},
};
</script>
<style scoped>
.btn_pos {
  margin-top: 9px;
}
.address {
  margin: 30px 0px;
}
.address > p {
  margin: 5px 20px;
}
.widget-subheading {
  font-size: 12px;
  font-weight: 500;
}
.v-application a {
    cursor: pointer;
    text-decoration: none;
}
</style>