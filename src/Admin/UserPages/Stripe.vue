<template>
  <div>
    <div class="row ml-2">
      <div class="col-md-5">
        <v-card class="card_height">
          <div class="mt-20">
            <p
              class="text-center"
              style="font-size: 20px; font-weight: 700; padding-top: 20px"
            >
              Subscription Details
            </p>
          </div>

          <v-container>
            <v-row>
              <v-col cols="12" md="12" class="pt-2 pb-0">
                <p class="stripe-head">Name &nbsp; &nbsp;: {{ email }}</p>
              </v-col>
              <v-col cols="12" md="6" class="pt-0 pb-0">
                <p class="stripe-head">Price  &nbsp; &nbsp;  &nbsp;: {{ price }}</p>
              </v-col>
              <v-col cols="12" md="6" class="pt-0 pb-0">
                <p class="stripe-head">Discount: {{ discount }}</p>
              </v-col>
              <v-col cols="12" md="12" class="pt-0 pb-0">
                <div class="row">
                  <div class="col-sm-6">
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
                  </div>
                  <div
                    class="col-sm-6"
                    style="
                      padding-top: 0px;
                      padding-bottom: 47px;
                      margin-top: -17px;
                    "
                  >
                    <v-btn small color="primary" style="width: 100% !important"
                      >Apply Coupon</v-btn
                    >
                  </div>
                </div>
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
        <v-card>
          <p
            class="text-center"
            style="font-size: 20px; font-weight: 700; padding: 20px"
          >
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
                style="margin-bottom: 0px; margin-left: 15px"
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
                  style="padding: 10px 11px 0px 31px"
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
                  style="padding: 10px 11px 0px 31px"
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
              <div class="row" style="width: 100%">
                <button
                  @click.prevent="submitFormToCreateToken()"
                  class="btn btn-primary btn-lg btn-block"
                  style="margin: 5px 27px; color: #fff; width: 93%"
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
      price: 1500,
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

  methods: {},
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
/* .v-text-field /deep/ .v-text-field__details{display:none} */
.CardNumberField >>> .is-hidden {
  visibility: visible !important;
}
.InputContainer .InputElement::placeholder {
  visibility: hidden !important;
}
.help-block {
  color: red;
  font-size: 13px;
}
.control-label {
  margin-left: 0px;
  font-weight: 500;
  color: #000;
}
.v-text-field /deep/ .v-input__slot {
  min-height: 45px !important;
  border-radius: 0px !important;
}
.ElementsApp >>> input::placeholder {
  display: none !important;
}
#card-number,
#card-cvc,
#card-expiry {
  padding-top: 10px;
}
.stripeError {
  color: red;
  font-style: italic;
}
.uk-padding {
  padding: 20px;
  /* background-color: rgb(231, 229, 229); */
}
.cvc-field {
  width: 200px;
}
.payment-card-title {
  background: rgb(34, 50, 132);
  color: white;
}
.payment-amount {
  display: grid;
}
.pay-btn {
  background: rgb(18, 178, 12);
}
.payment-container {
  width: 400px;
}
.stripe-title {
  background: #e4e4e4;
  font-size: 18px;
  font-weight: 500;
}
.btn-primary {
  background-color: #be5683;
  border-color: #be5683;
}
.btn-primary:hover {
  background-color: #337ab7;
  border-color: #2e6da4;
}
.v-application a {
  cursor: pointer;
  text-decoration: none;
}
.mt-20 {
  margin-top: 80px !important;
}
.card_height {
  /* height: 530px; */
  width: 800px;
}
.min-width {
  min-width: 90px;
}
.align_pay_text {
  padding: 13px !important;
  font-weight: 600;
  border: none;
  background: #daf2e7;
  font-size: 19px;
  border: none !important;
}
.card-height-payament {
  height: 508px !important;
}
.align_pay_text {
  padding: 2px;
  font-weight: 600;
  border: 2px solid;
}
.stripe-head {
  font-size: 19px;
  font-weight: 500;
  margin-bottom: 9px;
}
</style>