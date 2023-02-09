<template>
  <div class="loader-container">
    <div class="loader"></div>
  </div>
</template>

<style lang="scss" scoped>
.loader-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .loader {
    border: 16px solid #f3f3f3;
    border-top: 16px solid $orange;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
