<template>
  <div class="container">
    <!-- 原始图片展示区 -->
    <h3>原始图片</h3>
    <div class="showImage" title="原始图片">
      <div v-if="isScanning" class="scan-effect"></div>
      <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" class="preview-image">
      <div v-else class="placeholder">请上传图片</div>
    </div>

    <!-- 检测结果展示区 -->
    <h3>检测结果</h3>
    <div class="showResult" title="检测结果">
      <img v-if="processedImageUrl" :src="processedImageUrl" alt="Result Image" class="preview-image">
      <div v-else class="placeholder">结果展示区</div>
    </div>

    <!-- 上传按钮区 -->
    <div class="updateImage">
      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        @change="handleFileChange"
        style="display: none;"
      >
      <el-button
        type="danger"
        :disabled="uploadLimit === 0"
        @click="triggerFileInput"
        :loading="isUploading"
      >
        {{ buttonText }}
      </el-button>
      <div v-if="uploadLimit === 0" style="color: red; margin-top: 8px;">
        上传次数已用尽
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { useAppStore } from '@/stores/useAppStore'
import { testCard } from '@/apis/testCard'

const imageUrl = ref<string>('')
const processedImageUrl = ref<string>('')
const uploadLimit = ref<number>(9)  // 修改为LeftSidebar的9次限制
const fileInput = ref<HTMLInputElement | null>(null)
const isScanning = ref(false)
const isUploading = ref(false)
const appStore = useAppStore()

const buttonText = computed(() => {
  const remaining = uploadLimit.value
  return `上传图片👆 (剩余 ${remaining} 次机会)`
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.[0] || uploadLimit.value <= 0) return

  const file = input.files[0]
  imageUrl.value = URL.createObjectURL(file)
  isUploading.value = true
  startScanEffect()

  try {
    const formData = new FormData()
    formData.append('file', file)

    // 发送请求并接收JSON响应
    // const { data } = await axios.post('/api/images/upload', formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' },
    // })

    const {data} = await testCard(file);

    //实际其只返回了一个图片 base64
    const processImg:string = data.data

    // 解析新版JSON结构
    const { image_property } = data
    const ps = image_property.ps

    // 存储检测结果到store
    appStore.setDetectionResult({
      imageWidth: data.image_width,
      imageHeight: data.image_height,
      tamperedPositions: ps.tampered_positions,
      isTampered: ps.is_tampered,
      tamperedScores: ps.tampered_scores,
      resultImage: `data:image/png;base64,${ps.image}`,
    })

    // 更新处理后的图片URL
    processedImageUrl.value = appStore.detectionResult.resultImage
    uploadLimit.value--

  } catch (error) {
    console.error('上传失败:', error)
  } finally {
    isUploading.value = false
    input.value = ''
  }
}

const startScanEffect = () => {
  isScanning.value = true
  setTimeout(() => {
    isScanning.value = false
  }, 6000)
}
</script>

<style scoped>
/* 保持原有样式不变 */
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.showImage,
.showResult {
  width: 100%;
  height: 40%;
  position: relative;
  overflow: hidden;
  border: solid 1px gray;
}

.updateImage {
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-size: 1.2em;
}

.scan-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: linear-gradient(
    to right,
    rgba(0, 123, 255, 0) 0%,
    rgba(0, 123, 255, 0.3) 50%,
    rgba(0, 123, 255, 0) 100%
  );
  animation: scan 2s linear infinite;
  pointer-events: none;
}

@keyframes scan {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>