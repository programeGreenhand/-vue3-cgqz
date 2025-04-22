<template>
  <div class="container">
    <!-- 瀑布流布局 -->
    <div 
      class="waterfall"
      :style="{ columnCount: columnCount }"
    >
      <div 
        v-for="(pair, index) in imagePairs"
        :key="index"
        class="card"
        @click.stop
      >
        <ImageCompare
          :original="pair.textimage"
          :processed="pair.tamperingimg"
          @compare-click="handleCompareClick(pair)"
        />
      </div>
    </div>

    <!-- 大图遮罩层 -->
    <div 
      v-if="showOverlay" 
      class="overlay"
      @click.self="closeOverlay"
    >
      <div class="overlay-content">
        <div class="comparison-view">
          <div class="image-wrapper">
            <img :src="currentPair.textimage" class="full-image">
            <div class="image-caption">Original</div>
          </div>
          <div class="image-divider"></div>
          <div class="image-wrapper">
            <img :src="currentPair.tamperingimg" class="full-image">
            <div class="image-caption">Processed</div>
          </div>
          <button class="close-btn" @click.stop="closeOverlay">×</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ImageCompare from '@/components/itdl/function/ImageCompare.vue'
import {getStoreImg} from '@/apis/getStoreImg'

interface ImagePair {
  id: number
  textimage: string
  tamperingimg: string
}

// 响应式数据
const imagePairs = ref<ImagePair[]>([])
const showOverlay = ref(false)
const currentPair = ref<ImagePair>({
  id: -1,
  textimage: '',
  tamperingimg: ''
})
import type { Ref } from 'vue'

// 显式声明响应式变量的类型
const columnCount: Ref<number> = ref(3)

// 确保更新函数有类型标注
const updateColumnCount = (): void => {
  const width = window.innerWidth
  columnCount.value = width < 768 ? 1 : width < 1200 ? 2 : 3
}
// 处理对比点击
const handleCompareClick = (pair: ImagePair) => {
  currentPair.value = pair
  showOverlay.value = true
  document.body.style.overflow = 'hidden'
}

// 关闭遮罩层
const closeOverlay = () => {
  showOverlay.value = false
  document.body.style.overflow = 'auto'
}

// 获取数据（保持原有逻辑）
// ... fetchImagePairs 函数保持不变 ...

// 获取历史记录

interface ImagePair {
  id: number
  textimage: string
  tamperingimg: string
}


const userName = localStorage.getItem("userName")


// 获取历史记录
const fetchImagePairs = async () => {
  try {
    if (!userName) {
      console.error('userName not found in localStorage')
      return
    }

    // const response = await axios.get('/api/images/getStoreImg', {
    //   params: { userName }
    // })     
    //转换为api
    const response = await getStoreImg(userName)

    // console.log(response)

    // 使用可靠的唯一键作为key
    imagePairs.value = response.data.data.map((item: any, index: number) => ({
      id: index, // 添加id作为备用唯一标识
      textimage: `https://onepiece-spiderman.oss-cn-shenzhen.aliyuncs.com/${item.originImg}`,
      tamperingimg: `https://onepiece-spiderman.oss-cn-shenzhen.aliyuncs.com/${item.processedImg}`
    }))



    console.log(imagePairs.value)
  } catch (error) {
    console.error('获取图片数据失败:', error)
  }
}




onMounted(() => {
  fetchImagePairs()

})

</script>

<style scoped>
/* 新增大图样式 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay-content {
  max-width: 90vw;
  max-height: 90vh;
  padding: 2rem;
}

.comparison-view {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  position: relative;
}

.image-wrapper {
  position: relative;
  max-height: 80vh;
}

.full-image {
  max-width: 40vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.image-divider {
  width: 2px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 1rem;
}

.image-caption {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1.1rem;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.close-btn:hover {
  opacity: 0.8;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .comparison-view {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .full-image {
    max-width: 80vw;
  }
  
  .image-divider {
    display: none;
  }
}
</style>