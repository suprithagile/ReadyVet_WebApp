<template>
  <div>
    <div class="row ml-2">
      <div class="col-md-5">
        <v-card class="card_height">
          <div class="mt-20">
            <p class="text-center" style="font-size: 20px; font-weight: 700">
              Subscription Plan
            </p>
          </div>

          <v-container>
            <v-row>
              <v-col cols="12" md="12" class="pt-2 pb-0">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-on="on"
                      v-model="email"
                      v-bind:label="$t('Name')"
                      required
                      outlined
                      disabled
                      dense
                    ></v-text-field>
                  </template>
                  <span>{{ $t("Name") }}</span>
                </v-tooltip>
              </v-col>
              <v-col cols="12" md="6" class="pt-0 pb-0">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-on="on"
                      v-model="price"
                      v-bind:label="$t('Price')"
                      required
                      disabled
                      outlined
                      dense
                    ></v-text-field>
                  </template>
                  <span>{{ $t("Price") }}</span>
                </v-tooltip>
              </v-col>
              <v-col cols="12" md="6" class="pt-0 pb-0">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-on="on"
                      v-model="discount"
                      v-bind:label="$t('Discount(%)')"
                      required
                      outlined
                      disabled
                      dense
                    ></v-text-field>
                  </template>
                  <span>{{ $t("Discount") }}</span>
                </v-tooltip>
              </v-col>
              <v-col cols="12" md="12" class="pt-0 pb-0">
                <span class="d-flex">
                  <span>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-on="on"
                          v-model="coupon"
                          required
                          outlined
                          dense
                        ></v-text-field>
                      </template>
                    </v-tooltip>
                  </span>
                  <span class="mb-2 ml-2">
                    <v-btn small color="primary">Apply Coupon</v-btn>
                  </span>
                </span>
              </v-col>
              <v-divider></v-divider>
              <div class="d-flex justify-content-end">
                <p class="align_pay_text ml-2">
                  {{ $t("TOTAL") }}&nbsp;: 12000
                </p>
              </div>
            </v-row>
          </v-container>
        </v-card>
      </div>
      <div class="col-md-7" style="margin-top: 70px">
        <v-card style="height: 506px">
          <p class="text-center" style="font-size: 20px; font-weight: 700">
            Payment
          </p>

          <v-container>
            <v-form
              class="uk-padding"
              valid
              style="display: flex; flex-direction: column; margin-top: -30px"
            >
              <div class="col-xs-12 form-group required">
                <p class="stripeError" v-if="stripeError">
                  {{ stripeError }}
                </p>
              </div>
              <div
                class="col-xs-12 form-group required"
                id="cardparent"
                style="margin-bottom: 0px;margin-left:15px"
              >
                <label class="control-label" for="Card Number"
                  >Card Holder Name (as it appears on the card)
                </label>
                <v-text-field
                  filled
                  v-model="card.cardholderName"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </div>
              <div
                class="col-xs-12 form-group required"
                id="cardparent"
                style="margin-left: 18px; margin-top: -22px     margin-left: 18px;"
              >
                <label
                  class="control-label"
                  for="Card Number"
                  style="margin-top: 3px"
                  >Card Number
                </label>

                <div class="uk-form-controls">
                  <div
                    id="card-number"
                    class="form-control stripe-element-container"
                    :class="{ 'uk-form-danger': cardNumberError }"
                  ></div>
                  <span class="help-block" v-if="cardNumberError">
                    {{ cardNumberError }}</span
                  >
                </div>
              </div>
              <div class="row" style="display: flex">
                <div
                  class="col-xs-6 form-group required"
                  style="padding: 10px 30px"
                >
                  <label class="control-label" for="Card CVC"> Card CVC </label>
                  <div class="uk-form-controls">
                    <div
                      id="card-cvc"
                      class="form-control"
                      :class="{ 'uk-form-danger': cardCvcError }"
                    ></div>
                    <span class="help-block" v-if="cardCvcError">
                      {{ cardCvcError }}
                    </span>
                  </div>
                </div>

                <div
                  class="col-xs-6 form-group required"
                  style="padding: 10px 30px"
                >
                  <label class="control-label" for="Expiry Month">
                    Expiry
                  </label>
                  <div class="uk-form-controls">
                    <div
                      id="card-expiry"
                      class="form-control"
                      :class="{ 'uk-form-danger': cardExpiryError }"
                    ></div>
                    <span class="help-block" v-if="cardExpiryError">
                      {{ cardExpiryError }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="row">
                <button
                  @click.prevent="submitFormToCreateToken()"
                  class="btn btn-primary btn-lg btn-block"
                  style="margin: 5px 27px; color: #fff"
                  type="submit"
                  :disabled="
                    btnloading ||
                    card.cardholderName == '' ||
                    stripeError != '' ||
                    card.cvc == '' ||
                    card.number == '' ||
                    card.expiry == ''
                  "
                >
                  <vue-simple-spinner
                    small
                    v-if="btnloading"
                  ></vue-simple-spinner>
                  Pay Now
                </button>
              </div>
            </v-form>
          </v-container>
        </v-card>
      </div>
    </div>
    <!-- <div class="col-md-6">
          <v-row>
            <v-col cols="12" md="11" class="pt-5 pb-0">
              <v-text-field
                filled
                v-model="card.cardholderName"
                :rules="nameRules"
                dense
                outlined
                placeholder="Card Holder Name (as it appears on the card)"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pt-0 pb-0">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-on="on"
                    placeholder="Card CVV"
                    :rules="fieldRules"
                    v-bind:label="$t('CVV')"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </template>
                <span>{{ $t("CVV") }}</span>
              </v-tooltip>
            </v-col>
            <v-col cols="12" md="5" class="pt-0 pb-0">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-on="on"
                    placeholder="Expiry"
                    :rules="fieldRules"
                    v-bind:label="$t('Expiry')"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </template>
                <span>{{ $t("Expiry") }}</span>
              </v-tooltip>
            </v-col>
            <div class="d-flex justify-space-between">
              <div>
                <p class="align_pay_text ml-2">{{ $t("Total") }}&nbsp;:12000</p>
              </div>
              <div class="mr-5">
                <v-btn small color="primary" dark style="width: 150px">
                  {{ $t("Pay") }}
                </v-btn>
              </div>
            </div>
          </v-row>
        </div> -->
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      email: "Silver",
      price: 12000,
      discount: 12,
      coupon: "APR15",
      card: {
        cardholderName: "",
        cvc: "",
        number: "",
        expiry: "",
      },

      // stripe: "",
      //elements
      // cardHolderNameError: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      stripe: null,

      // errors
      stripeError: "",
      cardCvcError: "",
      cardExpiryError: "",
      cardNumberError: "",
      cardHolderNameError: "",
      showIcon: true,
      loading: false,
      nameRules: [(v) => !!v || "Card Holder Name is required"],
    };
  },
 
   
  methods: {



  
  },
};
</script>
<style scoped>
.v-application a {
  cursor: pointer;
  text-decoration: none;
}
.mt-20 {
  margin-top: 80px !important;
}
.card_height {
  height: 500px;
  width: 800px;
}
.min-width {
  min-width: 90px;
}
.align_pay_text {
  padding: 5px;
  font-weight: 600;
  border: 2px solid;
}
.card-height-payament {
  height: 508px !important;
}
.align_pay_text {
  padding: 2px;
  font-weight: 600;
  border: 2px solid;
}
</style>