<template>
  <v-app class="container">
    <div>
      <page-title :heading="$t('Coupon Setup')" :icon="icon"></page-title>
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
        :items="couponarray"
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
            <td>{{ props.item.coupon_name }}</td>
            <td>{{ props.item.discount }}</td>
            <td>{{ props.item.start_date }}</td>
            <td>{{ props.item.end_date }}</td>
           
           
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
import couponarray from "../../../src/assets/couponarray.json";
import PageTitle from "../../../src/Layout/Components/PageTitle.vue";
import Vue from "vue";
Vue.use(FlashMessage);
export default {
  components: {
    PageTitle,
  },
  data: () => ({
    couponarray,
    search: "",
    initval: false,
   
     }),
  computed: {
    
    headers() {
      return [
        {
          text: this.$t("Coupon Name"),
          value: "mobile",
        },
        {
          text: this.$t("Discount(%)"),
          value: "email",
        },
        {
          text: this.$t("Start Date"),
          value: "email",
        },
        {
          text: this.$t("End Date"),
          value: "email",
        }
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
</style>