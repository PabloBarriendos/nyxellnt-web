<template>
  <v-footer class="d-flex flex-wrap">
    <v-col cols="12" md="4" class="title-section">
      <img @click="goHome()" src="../assets/logo.png">
    </v-col>

    <v-col cols="12" md="4" class="icons-section">
      <v-row class="icons" justify="center">
        <v-col v-for="icon in icons" :key="icon" cols="auto">
          <v-btn :icon="true" variant="plain" size="small" color="black">
            <v-icon color="white">{{ icon }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <div class="date-section px-4 py-2 bg-black text-center">
        <router-link to="/">Festivalia —</router-link>
        {{ new Date().getFullYear() }}
      </div>
    </v-col>

    <v-col cols="12" md="4" class="link-section">
      <v-row class="links" justify="center">
        <v-col cols="auto" v-for="link in links" :key="link">
          <v-btn color="white" @click="goTo(link.link)" text>{{ link.texto }}</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-footer>
</template>
  
<script>
export default {
  name: "footerComponent",

  data: () => ({
    icons: ["mdi-instagram", "mdi-twitter", "mdi-facebook"],
    links: [{texto: "Contactanos", link: "contacto"}, {texto: "Cookies", link: "cookies"}, {texto: "Estadísticas", link: ""}],
  }),
  methods: {
    goHome() {
      this.$router.push("/");
      document.documentElement.scrollTop = 0;
    },
    goTo(route) {
      this.$router.push(`/${route.toLowerCase()}`);
    }
  },
};
</script>

<style lang="scss" scoped>
.v-footer {
  background-color: black;
  color: white;
  padding: 40px;

  .title-section,
  .icons-section,
  .link-section {
    display: flex;
    justify-content: center;
  }

  .title-section{
    img {
      width: 130px;
      &:hover{
        cursor: pointer;
      }
    }
    
  }

  .icons-section {
    flex-direction: column;

    .date-section {
      margin-top: 10px;
      justify-content: center;
      a {
        color: white;
        text-decoration: none;
      }
    }
  }

  .link-section {
    .links {
      display: flex;
      justify-content: center;

      v-btn {
        padding: 0 10px;
      }
    }
  }

  .v-icon {
    color: white;
  }

  .v-application a {
    color: white;
    text-decoration: none;
  }
}

@media only screen and (min-width: 600px) {
  .v-footer {
    .title-section,
    .icons-section,
    .link-section {
      width: calc(100% / 3);
    }
  }

  .link-section {
    .links {
      flex-direction: row;
    }
  }
}
</style>
