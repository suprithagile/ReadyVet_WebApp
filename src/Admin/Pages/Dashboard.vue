<template>
  <div>
    <page-title :heading="heading" :icon="icon"></page-title>
    <div class="row">
    
      <div class="col-md-6 col-lg-3">
        <div
          class="
            widget-chart widget-chart2
            text-left
            mb-3
            card-btm-border card-shadow-primary
            border-primary
            card
          "
        >
          <div class="widget-chat-wrapper-outer">
            <div class="widget-chart-content">
              <div class="widget-title opacity-5 text-uppercase">{{ $t("suburb") }}</div>
              <div class="widget-numbers mt-2 fsize-4 mb-0 w-100">
                <div class="widget-chart-flex align-items-center">
                  <div>{{dashboarddata.citycount}}</div>
                  <div
                    class="
                      widget-title
                      ml-auto
                      font-size-lg font-weight-normal
                      text-muted
                    "
                  >
                    <div class="circle-progress"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-3">
        <div
          class="
            widget-chart widget-chart2
            text-left
            mb-3
            card-btm-border card-shadow-danger
            border-danger
            card
          "
        >
          <div class="widget-chat-wrapper-outer">
            <div class="widget-chart-content">
              <div class="widget-title opacity-5 text-uppercase">
                 {{ $t("properties") }}
              </div>
              <div class="widget-numbers mt-2 fsize-4 mb-0 w-100">
                <div class="widget-chart-flex align-items-center">
                  <div>{{dashboarddata.propertycount}}</div>
                  <div
                    class="
                      widget-title
                      ml-auto
                      font-size-lg font-weight-normal
                      text-muted
                    "
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-3">
        <div
          class="
            widget-chart widget-chart2
            text-left
            mb-3
            card-btm-border card-shadow-warning
            border-warning
            card
          "
        >
          <div class="widget-chat-wrapper-outer">
            <div class="widget-chart-content">
              <div class="widget-title opacity-5 text-uppercase">{{ $t("agents") }}</div>
              <div class="widget-numbers mt-2 fsize-4 mb-0 w-100">
                <div class="widget-chart-flex align-items-center">
                  <div>{{dashboarddata.agentcount}}</div>
                  <div
                    class="
                      widget-title
                      ml-auto
                      font-size-lg font-weight-normal
                      text-muted
                    "
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-3">
        <div
          class="
            widget-chart widget-chart2
            text-left
            mb-3
            card-btm-border card-shadow-success
            border-success
            card
          "
        >
          <div class="widget-chat-wrapper-outer">
            <div class="widget-chart-content">
              <div class="widget-title opacity-5 text-uppercase">
                {{$t("property_verified")}}
              </div>
              <div class="widget-numbers mt-2 fsize-4 mb-0 w-100">
                <div class="widget-chart-flex align-items-center">
                  <div>{{dashboarddata.propertyviewedcount}}</div>
                  <div
                    class="
                      widget-title
                      ml-auto
                      font-size-lg font-weight-normal
                      text-muted
                    "
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import PageTitle from "../../Layout/Components/PageTitle.vue";
import axios from "axios";

// import { library } from "@fortawesome/fontawesome-svg-core";
// import {
//   faBatteryThreeQuarters,
//   faAngleDown,
//   faAngleUp,
//   faAngleRight,
//   faHome,
//   faQuestionCircle,
//   faBusinessTime,
// } from "@fortawesome/free-solid-svg-icons";

// library.add(
//   faBatteryThreeQuarters,
//   faAngleDown,
//   faAngleUp,
//   faAngleRight,
//   faHome,
//   faQuestionCircle,
//   faBusinessTime
// );

export default {
  components: {
    PageTitle,
  },
  data: () => ({
    dashboarddata:[],
    heading: "Dashboard",
    icon: "pe-7s-car icon-gradient bg-mean-fruit",
  }),
 created() {
   // this.initialize();
  },
  methods: {
        initialize() {
      axios
        .get(process.env.VUE_APP_API_URL_ADMIN + "dashboard")
        .then((res) => {
          this.dashboarddata = res.data;
          this.initval = false;
        })
        .catch((err) => {
          console.log(err);
          this.initval = false;
        });
    },

  },
};
</script>
