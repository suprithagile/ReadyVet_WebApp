<template>
  <div>
    <div class="mt-20"></div>
    <v-card
      style="height: 1200px; width: 1000px; margin-left: 10px"
      class="course-card"
    >
      <v-container>
        <div class="header-dots mt-20">
          <div>
            <div class="row ml-1">
              <v-card
                class="mx-3 my-2 course-card row card-height"
                v-for="(
                  ready_vet_data, ready_vet_data_index
                ) in readyvet_content"
                :key="ready_vet_data_index"
              >
                <!-- {{course_data.course_selected}} -->
                <!-- check_box_margin      disabled=  -->
                <!-- <div class="col-md-12 p-0">
            <div class="img-div w-100">
              <img src="@/assets/images/ReadyVet/Platinum.jpg" width="160px" />
            </div>
          </div> -->
                <div class="col-md-12">
                  <div class="d-flex justify-content-center">
                    <div class="d-flex mb-3">
                      <span
                        class="course-content-width course_font text-center"
                      >
                        {{ ready_vet_data.readyvet_name }}</span
                      >
                    </div>
                  </div>

                  <div class="d-flex mb-3 text-center">
                    <span class="course-content-width">
                      £ {{ ready_vet_data.price }}
                    </span>
                  </div>

                  <div class="d-flex  text-center " style="margin-left:20px">
                    <span>{{ $t("Discount") }}</span>

                    <span class="sub_course sub_course_font">
                      :&nbsp;{{ ready_vet_data.discount }} %</span
                    >
                  </div>
                </div>
                <div class="mt-138">
                <div class="more_details_margin text-center">
                  <a href="#">More Details</a>
                </div>
                <div class="text-center">
                  <v-btn small color="primary">Select</v-btn>
                </div>
                </div>
              </v-card>
            </div>

            <!-- <div class="d-flex"> -->
          </div>
        </div>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import readyvet_content from "../../../src/assets/readyvet_data.json";
export default {
  data: () => {
    return {
      readyvet_content,
    };
  },
};
</script>

<style scope>
.main-20 {
  margin: 20px;
}
.sub_course {
  font-size: 12px !important;
  font-weight: 200px !important;
}

.course-content-width {
  min-width: 110px !important;
  font-size: 12px !important;
  max-width: 200px !important;
}
.course-card {
  box-shadow: 0px 0px 2px black !important;
}
.check_box_margin {
  margin-top: 45px !important;
}

.mycourses-container {
  height: 250px;
  overflow-x: scroll;
}
.course_font {
  font-size: 18px !important;
  font-weight: bold;
  color: green;
}
.mt2 {
  margin-top: 1px;
  font-size: 14px;
  font-weight: 200px;
}
[v-cloak] {
  display: none;
}
/* .v-text-field /deep/ .v-text-field__details{display:none} */

.btn-primary {
  background-color: #be5683;
  border-color: #be5683;
}
.btn-primary:hover {
  background-color: #337ab7;
  border-color: #2e6da4;
}
.mt-20 {
  margin-top: 20px;
}
.card-height {
  height: 340px;
  width: 175px;
}
.font-size {
  font-size: 20px;
}
/* 
.mt-139 {
  margin-top: 139px;
} */
.more_details_margin {
  min-width: 97px;
}
.sub_course_font{
  font-size:14px;
  margin-top:1px
}
.mt-138{
      margin-top: 138px;

}
</style>
