<template>
  <div class="app-page-title">
    <div class="page-title-wrapper">
      <div class="page-title-heading">
        <div class="page-title-icon">
          <i :class="icon" />
        </div>
        <div>
          {{heading}}
          <div class="page-title-subheading">{{subheading}}</div>
        </div>
      </div>
      <div class="page-title-actions">
       
      </div>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faPlus } from "@fortawesome/free-solid-svg-icons";


library.add(faStar, faPlus);

export default {
  components: {
   
  },
  props: {
    icon: String,
    heading: String,
    subheading: String
  }
};
</script>
