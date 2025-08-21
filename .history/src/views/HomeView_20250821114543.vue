<script setup lang="ts">
import Tips from '@/components/itdl/Tips.vue'
import Footer from '@/components/itdl/Footer.vue'


</script>

<template>
  <div class="container" > 
    <div class="TOP-container">
      <Tips></Tips>
    </div>
    
    <!-- <br> -->

    <Footer></Footer>
  </div>
  
  
</template>


<style scoped>
.container{
  

}

.TOP-container {
  width: 100%; /* 设置容器的宽度 */
  height:calc(10*var(--space-lg)*0.78); /* 设置容器的高度 */
  background-image: url("@/assets/leadspace.jpg");
  background-size: over;
  display: flex;
  flex-direction: auto;
  justify-content: center;
  align-items: center;
 
}


</style>
