<template>
  <b-row id="header" style="padding: 1vh 5vw 2vh 5vw;">
    <b-col sm="12" md="4" style="padding-top: 0.8vh;">
      <h1>HexHeads</h1>
    </b-col>
    <b-col sm="12" md="4" style="text-align: center; padding-top: 1.6vh;">
      <a href="#" class="link-underlined" style="margin-right: 7px;">Bruteforce</a>
      <a href="#" class="link-underlined" style="margin-left: 7px;">Scan</a>
    </b-col>
    <b-col sm="12" md="4" style="text-align: right; padding-top: 8px;">
      <div v-if="address === undefined"
          class="button" @click="$emit('connectRequested')">Connect MetaMask</div>
      <div v-else style="padding-top: 0.7vh;">
        {{address}}
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "Header",
  props: {
    address: undefined
  }
}
</script>

<style scoped>

  h1 {
    margin: 0;
  }

  #header {
    box-shadow: 5px 5px 23px 0px rgba(0,0,0,0.1);
    -webkit-box-shadow: 5px 5px 23px 0px rgba(0,0,0,0.1);
    -moz-box-shadow: 5px 5px 23px 0px rgba(0,0,0,0.1);
    border-bottom: 2px solid black;
  }
</style>