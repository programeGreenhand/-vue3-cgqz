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
        <h1 class="team-title">团队成员</h1>
        
        <div class="members">

          <el-card class="member-card" shadow="always">
            <el-image :src="Avatar02" fit="cover" />
            <template #footer>Rao-Yuan<br/>导师</template>
          </el-card>
          
          <el-card class="member-card" shadow="always">
            <el-image :src="Avatar04" fit="cover" />
            <template #footer>Liao-ZeChao<br/>算法工程师</template>
          </el-card>

          <el-card class="member-card" shadow="always">
            <el-image :src="Avatar03" fit="cover" />
            <template #footer>Tang-YongDe<br/>后端工程师</template>
          </el-card>

          <el-card class="member-card" shadow="always">
            <el-image :src="Avatar01" fit="cover" />
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
.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.background {
  width: 100%;
  height: 40vh;
  min-height: 300px;
  max-height: 650px;
  background-image: url("@/assets/family.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.context {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 2rem 1rem;
  gap: 3rem;
}

.summary {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  font-family: Cereal, sans-serif;
  text-align: center;
}

.summary h1 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-bottom: 1rem;
}

.summary p {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  line-height: 1.6;
  color: #666;
}

.shows {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
}

.team-title {
  text-align: center;
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  margin-bottom: 1rem;
}

.members {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  justify-items: center;
}

.member-card {
  width: 100%;
  max-width: 280px;
  height: auto;
  min-height: 350px;
}

.member-card :deep(.el-card__body) {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.member-card :deep(.el-image) {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
}

.member-card :deep(.el-card__footer) {
  text-align: center;
  font-weight: bold;
  padding: 1rem 0;
  margin-top: auto;
}

/* 平板设备 */
@media screen and (max-width: 1024px) {
  .members {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }
  
  .member-card {
    max-width: 250px;
    min-height: 320px;
  }
  
  .member-card :deep(.el-image) {
    height: 180px;
  }
}

/* 手机设备 */
@media screen and (max-width: 768px) {
  .container {
    gap: 1rem;
  }
  
  .background {
    height: 30vh;
    min-height: 250px;
  }
  
  .context {
    padding: 1.5rem 1rem;
    gap: 2rem;
  }
  
  .members {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .member-card {
    max-width: none;
    width: 100%;
    min-height: 300px;
  }
  
  .member-card :deep(.el-image) {
    height: 160px;
  }
}

/* 小屏手机 */
@media screen and (max-width: 480px) {
  .context {
    padding: 1rem 0.5rem;
  }
  
  .members {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .member-card {
    min-height: 280px;
  }
  
  .member-card :deep(.el-image) {
    height: 150px;
  }
  
  .summary {
    padding: 0 1rem;
  }
}
</style>