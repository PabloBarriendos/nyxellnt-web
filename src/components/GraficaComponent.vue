<template>
  <v-container>
    <h1 class="title">Número de eventos al mes</h1>
    <Bar v-if="dataLoaded" :data="chartdata" :options="chartoptions"></Bar>
  </v-container>
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
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(0, 0, 255, 0.2)",
              "rgba(255, 0, 0, 0.2)",
              "rgba(0, 255, 0, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderWidth: 1,
          },
        ],
      },
      chartoptions: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 }
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
      },
    };
  },

  computed: {
    ...mapState(["festivalList"]),
  },

  mounted() {
    this.setGrafica(this.festivalList);
  },
  components: {
    Bar,
  },
  methods: {
    filterFestivales(festivales, filtro) {
      return festivales.filter((l) => l.categoriaId == filtro).length;
    },
    setGrafica(festivales) {
      if (festivales.length < 1) {
        return
      }
      let festivalesMes = this.groupBy(festivales, "mes")

      this.chartdata.labels = Object.keys(festivalesMes);
      this.chartdata.datasets[0].data = Object.values(festivalesMes).map(f => f.length);
      this.dataLoaded = true;
    },
    groupBy(arr, property) {
      return arr.reduce((acc, cur) => {
        acc[cur[property]] = [...acc[cur[property]] || [], cur];
        return acc;
      }, {});
    }
  },
  watch: {
    festivalList(newFestival) {
      this.setGrafica(newFestival);
    }
  }
};
</script>

<style scoped>
.title{
  padding: 50px;
}
</style>