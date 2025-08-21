<template>

  <div class="container">
    <div class="background">
    </div>
    
    <div class="context">

      <!-- 简介 -->
      <div class="summary">
        <h1>关于我们</h1>
        <br>
        <p>
          我们是一个优秀的团队，包含一位优秀的导师，和三名核心骨干成员
          我们的研究内容是篡改取证，目标是找出文本图像中被人为篡改的痕迹
          我们本次项目，是想实现一个简单有效的工具为落地实现我们的研究领域，
          是一项很有意义的实用性研究，为人工智能安全带来了新的生机
        </p>
      </div>

      <!-- 展示 -->
       <div class="shows">
        <h1 style="display: block;margin-left: 125px;">团队成员</h1>
        
        <div class="members" style="width: 100%;height: 300px;display: flex;flex-direction: row;
        gap: 30px;justify-content: center;">

          <el-card style="width: 20%; height: 400px" shadow="always">
            <el-image  :src="Avatar02" fit="cover" />
            <template #footer>Rao-Yuan<br/>导师</template>
          </el-card>
          

          <el-card style="width: 20%; height: 400px" shadow="always">
            <el-image  :src="Avatar04" fit="cover" />
            <template #footer>Liao-ZeChao<br/>算法工程师</template>
          </el-card>

          <el-card style="width: 20%; height: 400px" shadow="always">
            <el-image  :src="Avatar03" fit="cover" />
            <template #footer>Tang-YongDe<br/>后端工程师</template>
          </el-card>

          <el-card style="width: 20%; height: 400px" shadow="always">
            <el-image  :src="Avatar01" fit="cover" />
            <template #footer>Yu-JiaFu<br/>前端工程师</template>
          </el-card>

        </div>

       </div>
      

    </div>

    <Footer></Footer>
    
  </div>
  
</template>

<script setup lang="ts">
import Avatar01 from '@/assets/avatar01.jpg'
import Avatar02 from '@/assets/avatar02.jpg'
import Avatar03 from '@/assets/avatar03.jpg'
import Avatar04 from '@/assets/avatar04.jpg'
import Footer from '@/components/itdl/Footer.vue';

</script>

<style scoped>
.container{
width: 100%;
height: 1500px;
display: flex;
flex-direction: column;
gap:30px;
}

.background{
  width: 100%;
  height: 650px;
  background-image: url("@/assets/family.jpg");
  background-size: cover;
}

.context{
  display: flex;

  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 900px;

}

.summary{
  display: flex;
  
  flex-direction: column;

  width: 50%;
  height: 200px;
  font-family: Cereal, sans-serif;
}

.shows{
  display: flex;
  
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 530px;

}

.shows image{
  gap: 10px;
}

@media screen and (max-width:768px) {
  .shows{
    flex-direction: column!important;
  }
}


</style>