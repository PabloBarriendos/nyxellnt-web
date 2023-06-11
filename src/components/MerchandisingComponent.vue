<template>
    <v-container>
        <h1>Página en desarrollo</h1>
        <v-text>Tiempo restante para su creación: </v-text>
        <body>
            <svg width="300" height="300" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="black" stroke-width="4" />
                <g>
                    <line id="hora" x1="100" y1="110" x2="100" y2="70" stroke="blue" stroke-width="3" />
                    <line id="minuto" x1="100" y1="110" x2="100" y2="50" stroke="grey" stroke-width="3" />
                    <line id="segundo" x1="100" y1="110" x2="100" y2="40" stroke="red" stroke-width="2" />
                </g>
                <g stroke="black" stroke-width="3">
                    <line x1="100" y1="10" x2="100" y2="20" transform="rotate(0, 100, 100)" />
                    <line x1="100" y1="10" x2="100" y2="20" transform="rotate(30, 100, 100)" />
                    <line x1="100" y1="10" x2="100" y2="20" transform="rotate(60, 100, 100)" />
                    <line x1="100" y1="10" x2="100" y2="20" transform="rotate(90, 100, 100)" />
                    <line x1="100" y1="10" x2="100" y2="20" transform="rotate(120, 100, 100)" />
                    <line x1="100" y1="10" x2="100" y2="20" transform="rotate(150, 100, 100)" />
                    <line x1="100" y1="10" x2="100" y2="20" transform="rotate(180, 100, 100)" />
                    <line x1="100" y1="10" x2="100" y2="20" transform="rotate(210, 100, 100)" />
                    <line x1="100" y1="10" x2="100" y2="20" transform="rotate(240, 100, 100)" />
                    <line x1="100" y1="10" x2="100" y2="20" transform="rotate(270, 100, 100)" />
                    <line x1="100" y1="10" x2="100" y2="20" transform="rotate(300, 100, 100)" />
                    <line x1="100" y1="10" x2="100" y2="20" transform="rotate(330, 100, 100)" />
                </g>
            </svg>
        </body>
    </v-container>
</template>

<script>
  function updateClock() {
    var root = document.querySelector(":root");

    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const hourAngle = hours * 30 + minutes / 2;
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;

    root.style.setProperty("--segundos", secondAngle + "deg");
    root.style.setProperty("--minutos", minuteAngle + "deg");
    root.style.setProperty("--horas", hourAngle + "deg");
  }
  updateClock();
</script>

<style scoped>
  @keyframes girarSegundos {
    from {
      transform: rotate(var(--segundos));
    }
    to {
      transform: rotate(calc(360deg + var(--segundos)));
    }
  }

  @keyframes girarMinutos {
    from {
      transform: rotate(var(--minutos));
    }
    to {
      transform: rotate(calc(360deg + var(--minutos)));
    }
  }

  @keyframes girarHoras {
    from {
      transform: rotate(var(--horas));
    }
    to {
      transform: rotate(calc(360deg + var(--horas)));
    }
  }

  #hora {
    animation: girarHoras 43200s linear infinite;
    transform-origin: 100px 100px;
  }
  #minuto {
    animation: girarMinutos 3600s linear infinite;
    transform-origin: 100px 100px;
  }
  #segundo {
    animation: girarSegundos 60s linear infinite;
    transform-origin: 100px 100px;
  }

  .container{
    display: flex;
    margin-top: 100px;
    flex-direction: column;
    align-items: center;
  }

  v-text{
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: x-large;
  }
</style>


    