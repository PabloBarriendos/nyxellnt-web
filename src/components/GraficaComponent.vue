<template>
    <Bar v-if="dataLoaded" :data="chartdata" :options="chartoptions"></Bar>
  </template>
  
  <script>
  import { Bar } from "vue-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from "chart.js";
  
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  );
  import { mapState } from "vuex";
  
  export default {
    data() {
      return {
        dataLoaded: false, 
        chartdata: {
          labels: [
            "Terror",
            "Humor",
            "Ficción",
            "Literatura",
            "Fantasia",
            "Poesía",
            "Misterio y suspense",
            "Autoayuda",
          ],
          datasets: [
            {
              label: "Cantidad",
              data: [],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        chartoptions: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {stepSize:1}
            },
          },
          responsive: true,
        },
      };
    },
  
    computed: {
      ...mapState(["libro"]),
    },
  
    mounted() {
      this.setGrafica(this.libro);
    },
    components: {
      Bar,
    },
    methods: {
      filterLibros(libros, filtro) {
        return libros.filter((l) => l.categoriaId == filtro).length;
      },
      setGrafica(libros) {
        let terror = this.filterLibros(libros, 1);
        let humor = this.filterLibros(libros, 2);
        let ficcion = this.filterLibros(libros, 3);
        let literatura = this.filterLibros(libros, 4);
        let fantasia = this.filterLibros(libros, 5);
        let poesia = this.filterLibros(libros, 6);
        let misterioSuspense = this.filterLibros(libros, 7);
        let autoayuda = this.filterLibros(libros, 8);
  
        this.chartdata.datasets[0].data = [
          terror,
          humor,
          ficcion,
          literatura,
          fantasia,
          poesia,
          misterioSuspense,
          autoayuda,
        ];
        this.dataLoaded = true;
      },
    },
    watch: {
      libro(newLibro){
        this.setGrafica(newLibro);
      }
    }
  };
  </script>