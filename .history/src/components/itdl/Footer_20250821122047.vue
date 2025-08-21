<template>
  <div class="footer"> 
    <h3>广州大学黄埔校区 - 新广州知识城科教创新区知明路72号</h3>
    <br>
    <h4>邮编： 510725</h4>
    <br>
    <h4>邮编地址: 广东省广州市黄埔区黄埔校区</h4>
    <br>
    
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

.footer{
    width: 100%;
    height: 40vh;
    background-color: rebeccapurple;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url('@/assets/img36.jpg');
    background-size: over;
}

@media screen and (min-width:768px) {
  .footer{
    height: 23vh;
  }
}


</style>