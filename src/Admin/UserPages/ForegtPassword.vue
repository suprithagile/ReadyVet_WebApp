<template>
  <div>
    <v-app>
      <div class="h-100">
        <b-row class="h-100 no-gutters">
          <b-col lg="4" class="d-none d-lg-block d-flex">
            <div class="slider-light">
              <!-- <img src="@/assets/images/home-login.png" style="width: 300px;">  -->
              <div class="font-base-app text-center">
                {{ $t("base_app") }}
              </div>
            </div>
          </b-col>
          <VueElementLoading
            :active="loader"
            spinner="bar-fade-scale"
            color="var(--primary)"
          />
          <b-col
            lg="8"
            md="12"
            class="
              h-100
              d-flex
              bg-white
              justify-content-center
              align-items-center
            "
          >
            <b-col lg="6" md="8" sm="12" class="mx-auto app-login-box">
              <div
                style="
                  display: flex;
                  display: flex;
                  justify-content: space-around;
                  align-items: center;
                "
              >
                <div>
                  <!-- <h4 class="mb-0">
                    <img
                      src="@/assets/images/home-login.png"
                      style="width: 100%"
                    />
                  </h4> -->
                  <!-- <div class="font-login">Create Account</div> -->
                </div>
              </div>
              <h4 class="text-center">
                <div class="font-login">{{ $t("forgot_password") }}</div>
                <!-- <span>{{$t('form_to_recover_psw')}}</span> -->
              </h4>
              <div>
                <Form>
                  <b-row form>
                    <b-col md="12">
                      <b-form-group>
                        <div
                          style="color: red"
                          class="v-messages__message"
                          v-if="status == 'E'"
                        >
                          {{ message }}
                        </div>
                        <div style="color: green" v-if="status == 'S'">
                          {{ message }}
                        </div>
                        <!-- <Label for="exampleEmail">Email</Label>
                       <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email" required> -->
                        <v-form autocomplete="off" ref="form" v-model="valid">
                          <div class="form-group">
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-on="on"
                                  v-model="email"
                                  :rules="fieldRules"
                                  v-bind:label="$t('email')"
                                  @keyup.enter="requestResetPassword"
                                  required
                                ></v-text-field>
                              </template>
                              <span>{{ $t("email") }}</span>
                            </v-tooltip>
                          </div>
                        </v-form>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <div class="d-flex align-items-center">
                    <h6 class="mb-0">
                      <a href="/" class="text-primary f-13 a-underline">{{
                        $t("sign_existing_account")
                      }}</a>
                    </h6>
                    <div class="ml-auto">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <div v-on="on" class="d-inline-block">
                            <v-btn
                              class="primary ml-2"
                              @click="requestResetPassword"
                              :disabled="isDisabled"
                              >{{ $t("recoverpassword") }}
                              <b-spinner
                                :disabled="isBtnLoading"
                                v-if="isBtnLoading"
                              ></b-spinner>
                            </v-btn>
                          </div>
                        </template>
                        <span>{{ $t("recover_password") }}</span>
                      </v-tooltip>
                    </div>
                  </div>
                </Form>
              </div>
            </b-col>
          </b-col>
        </b-row>
      </div>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import VueElementLoading from "vue-element-loading";
export default {
  components: {
    VueElementLoading,
  },
  computed: {
    fieldRules() {
      return [(v) => !!v || this.$t("field_required")];
    },
  },
  data() {
    return {
      email: null,
      has_error: false,
      status: "",
      message: "",
      loader: false,
      isDisabled: false,
      valid: true,
      isBtnLoading: false,
    };
  },
  methods: {
    requestResetPassword() {
      if (this.$refs.form.validate()) {
        this.isDisabled = true;
        this.isBtnLoading = true;
        this.loader = true;
        axios
          .post(
            process.env.VUE_APP_API_URL_ADMIN +
              "reset_password?email=" +
              this.email +
              "&role=User"
          )
          .then((response) => {
            console.log(response);
            this.response = response.data;
            this.message = response.data.message;
            this.status = response.data.status;
            if (this.status == "S") {
              setTimeout(
                () =>
                  this.$router.push({
                    name: "reset_password_form",
                    params: { email: this.email },
                  }),
                1000
              );
            }
            this.isDisabled = false;
            this.isBtnLoading = false;
            this.loader = false;
          })
          .catch((err) => {
            this.isDisabled = false;
            this.isBtnLoading = false;
            this.loader = false;
            console.log(err);
          });
      }
    },
    cancel() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
<style scoped>
.d-flex {
  display: flex !important;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.font-login {
  font-family: "Goudy Old Style";
  font-size: 25px;
  color: black;
}
</style>

