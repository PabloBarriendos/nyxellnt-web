<template>
    <svg class="spinner" :class="{ colorFestivalia: colorFestivalia }" viewBox="0 0 50 50"
      :style="{ width: valueWidth ? valueWidth + 'px' : '40px', height: valueHeight ? valueHeight + 'px' : '40px' }">
      <circle class="background" cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
      <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
    </svg>
</template>

<script>
    export default {
        name: "SpinnerComponent",

        data: () => ({
            valueWidth: 40,
            valueHeight: 40,
            colorFestivalia: false,
        }),
    };
</script>

<style lang="scss" scoped>
.spinner {
  animation: rotate 3s linear infinite;
  z-index: 2;
  &.colorFestivalia {
    .path {
      stroke: blue;
    }
  }
}

.spinner .background {
  stroke: #e8eef4;
  stroke-linecap: round;
}

.spinner .path {
  stroke: #c9d7d6;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(720deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  75% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -67;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>