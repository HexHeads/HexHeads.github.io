<template>
  <b-container>
    <b-row style="padding-top: 7vh">
      <b-col md="6">
        <p>The first project based on ERC-721E</p>
        <p>By <a href="https://twitter.com/k0rean_rand0m"
                 target="_blank"
                 style="color: #249fde"><u>@k0rean_rand0m</u></a></p>
        <p>
          These NFTs are revealed and owned by Every wallet.
          Connect MetaMask to see yours and claim it for free! Don't like yours? Just switch the account and try your luck again. Wanna something specific? Bruteforce wallets or buy the one on OpenSea!
        </p>
      </b-col>
      <b-col md="6" style="text-align: center;">
        <div id="jpeg">
          <img src="../assets/showreel.gif" style="width: 40vw"/>
        </div>
        <div id="claimElement">
          <p style="padding-top: 20px">Connect wallet to reveal yours!</p>
        </div>
      </b-col>
    </b-row>
  </b-container>

</template>

<script>
export default {
  name: "Main"
}
</script>

<style scoped>

</style>