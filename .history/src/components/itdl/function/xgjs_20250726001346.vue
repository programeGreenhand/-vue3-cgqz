<template>
  <div class="container">
    <el-card style="max-width: 480px" shadow="always" @click="show1">
    <template #header>人工智能</template>
    <img
      src="@/assets/ai.jpg"
      style="width: 100%"
    />
    </el-card>

    <el-card style="max-width: 480px" shadow="always" @click="show2">
    <template #header>卷积神经网络</template>
    <img
    src="@/assets/danao.jpg"
    style="width: 100%"
    />
    </el-card>

    <el-card style="max-width: 480px" shadow="always" @click="show3">
    <template #header>篡改取证</template>
    <img
      src="@/assets/cgqz.png"
      style="width: 100%"
    />
    </el-card>

    <el-drawer
    v-model="drawerVisible1"
    title="人工智能"
    direction="btt"  
    :size="'30%'"    
    >
    <span>{{context1}}</span>
    </el-drawer>

    <el-drawer
    v-model="drawerVisible2"
    title="卷积神经网络"
    direction="btt"  
    :size="'30%'"    
    >
    <span>{{context2}}</span>
    </el-drawer>

    <el-drawer
    v-model="drawerVisible3"
    title="篡改取证"
    direction="btt"  
    :size="'30%'"    
    >
    <span>{{context3}}</span>
    </el-drawer>


  </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue'


const drawerVisible1 = ref(false)
const drawerVisible2 = ref(false)
const drawerVisible3 = ref(false)

const context1 = ref('‌人工智能（Artificial Intelligence，简称AI）是一种模拟人类智能的技术，旨在使机器能够像人类一样学习和思考。‌它通过计算机系统实现学习、推理、问题解决、感知和语言理解等功能，涵盖了深度学习、机器学习、计算机视觉、自然语言处理等多种技术和算法')
const context2 = ref('卷积神经网络（Convolutional Neural Networks, CNN）是一类包含卷积计算且具有深度结构的前馈神经网络（Feedforward Neural Networks），是深度学习（deep learning）的代表算法之一 [1-2]。卷积神经网络具有表征学习（representation learning）能力，能够按其阶层结构对输入信息进行平移不变分类（shift-invariant classification），因此也被称为“平移不变人工神经网络（Shift-Invariant Artificial Neural Networks, SIANN）')
const context3 = ref('利用AI鉴别图片造假主要依赖于图像篡改检测技术，这项技术基于深度学习和计算机视觉领域，通过分析图像的细节和特征来判断其是否经过篡改')

const show1 = ()=>{
  drawerVisible1.value = true
}

const show2 = ()=>{
  drawerVisible2.value = true
}

const show3 = ()=>{
  drawerVisible3.value = true
}

</script>

<style scoped>
.container{
  width: 100%;
  height: 650px;
  background-image: url("@/assets/img01.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  opacity: 95%;
}

img{
  width: 10rem;
  height: 10rem;
}

@media screen and (max-width:786px) {
  .container{
    flex-direction: column;
  }

  img{
    width: 80vw!important;
    height: 80vh!important;
  }
}

</style>