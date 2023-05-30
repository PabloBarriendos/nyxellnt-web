<template>
  <v-footer class="d-flex">
    <div class="title-section">
      <h3>Nyxelln't</h3>
    </div>

    <div class="icons-section">
      <div class="icons">
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 icono"
          :icon="icon"
          variant="plain"
          size="small"
          color="black"
        ></v-btn>
      </div>
      <div class="date-section px-4 py-2 bg-black text-center w-100">
        <router-link to="/"><strong>Nyxelln`t — </strong></router-link>
        {{ new Date().getFullYear() }}
      </div>
    </div>

    <div class="link-section">
      <div>
      <button>Contáctanos</button>
      </div>
      <div>
      <button @click="goCookies()">Cookies</button>
      </div>
      <div>
      <button>Estadísticas</button>
      </div>
    </div>
  </v-footer>
</template>
  
<script>
export default {
  name: "footerComponent",

  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-instagram"],
  }),
  methods: {
    goCookies() {
      this.$router.push("/cookies")
    }
  },
};
</script>

<style lang="scss" scoped>
.v-footer {
  background-color: #1976d2;
  color: white;
  padding: 40px;

  >div {
    width: calc(100% / 3);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .icons-section{

    .date-section{
      width: 100%;
      margin-top: 10px;
      justify-content: center;
      a{
        color: white;
        text-decoration: none;
      }
    }

  }

  .link-section{
    >div{
      width: calc(100% / 3);
      display: flex;
      justify-content: center;

      button{
        padding: 0 10px;
      }
    }

  }


  .icono {
    background-color: white;
  }
  .v-application a {
    color: white;
    text-decoration: none;
  }
}
</style>