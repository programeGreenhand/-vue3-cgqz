<template>
  <div class="container">
    <div class="left-sidebar">
      <!-- 缩略图列表 -->
      <div class="thumbnail-scroll-container">
        <div class="thumbnail-list">
          <div
            v-for="(img, index) in images"
            :key="index"
            :class="{ active: currentImage === img.originalUrl }"
            @click="handleThumbnailClick(img.originalUrl, img.processedUrl)"
            class="thumbnail-item"
          >
            <img :src="img.originalUrl" alt="缩略图" />
          </div>
        </div>
      </div>

      <!-- 大图展示 -->
      <div class="image-viewport">
        <div
          class="scaled-image"
          :style="{ transform: `scale(${scale}) rotate(${rotate}deg)` }"
        >
          <img :src="currentImage" alt="检测图片" />
          <div class="scan-line" v-if="isScanning"></div>
        </div>

        <!-- 悬浮操作控件 -->
        <div class="floating-controls">
          <button @click="zoomIn" class="control-btn">
            <span class="icon">➕</span>
            <span class="tooltip">放大</span>
          </button>
          <button @click="zoomOut" class="control-btn">
            <span class="icon">➖</span>
            <span class="tooltip">缩小</span>
          </button>
          <button @click="rotate += 90" class="control-btn">
            <span class="icon">🔄</span>
            <span class="tooltip">旋转</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 文件上传 -->
    <div class="upload-section">
      <div class="upload-container">
        <input
          type="file"
          accept="image/*"
          @change="handleUpload"
          hidden
          ref="fileInput"
        />
        <button @click="uploadFile" class="upload-btn" style="font-size: 0.5rem;">
          📤 上传图片
        </button>
        <h3 class="or-text">或</h3>
        
        <div class="upload-input"
          @dragover.prevent="isDragging = true"
          @dragleave="isDragging = false"
          @drop.prevent="handleDrop"
          :class="{ 'dragging': isDragging }"
        >
          <span class="drag-icon">📁</span>
          <span class="drag-text">请将文件拖拽至此处</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";
import { useAppStore } from "@/stores/useAppStore"; // 引入 Composition API 风格的 store
import originimg from "@/assets/originimg.jpg";
import proccedimg from "@/assets/proccedimg.png";
import {upload} from "@/apis/upload"

const isDragging = ref(false);
const isUploading = ref(false); // 上传状态
const isScanning = ref(false);

const handleDrop = (e: DragEvent) => {
  isDragging.value = false;
  if (!e.dataTransfer?.files) return;

  const files = Array.from(e.dataTransfer.files);
  const validFiles = files.filter(file => 
    file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024)

  if (validFiles.length === 0) {
    alert('请上传有效的图片文件（不超过10MB）');
    return;
  }

  // 模拟input change事件
  const dataTransfer = new DataTransfer();
  validFiles.forEach(file => dataTransfer.items.add(file));
  if (fileInput.value) {
    fileInput.value.files = dataTransfer.files;
    handleUpload({ target: fileInput.value } as unknown as Event);
  }
};

// 图片数据
const images = ref([
  { id: 1, originalUrl: originimg, processedUrl: proccedimg },
]);

// 当前操作状态
const currentImage = ref(originimg);
const scale = ref(1);
const rotate = ref(0);

const fileInput = ref<HTMLInputElement | null>(null);

// 使用 Pinia Store
const appStore = useAppStore();

appStore.detectionResult.resultImage = proccedimg

// 上传图片
const uploadFile = () => {
  if (fileInput.value) fileInput.value.click();
};

//  直接发起请求版
const requestformodel = async (formData:FormData) => {
  const response = await axios.post("http://172.22.121.29:5000/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  const data = response.data
  const image_property = data.image_property;
  console.log(image_property)
  const ps = image_property.ps;

  // 将检测结果存储到 appStore
  appStore.setDetectionResult({
    imageWidth: data.image_width,
    imageHeight: data.image_height,
    tamperedPositions: ps.tampered_positions,
    isTampered: ps.is_tampered,
    tamperedScores: ps.tampered_scores,
    resultImage: ps.image
  }) // Base64 图片 
}

// 向后端 间接请求版
const requestforfront = async (formData:FormData) => {
  const response = await axios.post("/api/images/OssUpload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  
  const data = response.data
  console.log(data)
  // 解析 JSON 响应
  
  const image_property = data.image_property;
  console.log(image_property)
  const ps = image_property.ps;
  
  // 将检测结果存储到 appStore
  appStore.setDetectionResult({
    imageWidth: data.image_width,
    imageHeight: data.image_height,
    tamperedPositions: ps.tampered_positions,
    isTampered: ps.is_tampered,
    tamperedScores: ps.tampered_scores,
    resultImage: ps.image
  }) // Base64 图片
}

// 文件上传处理
const handleUpload = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  
  if (!file) return;

  isUploading.value = true;

  const userName:string = localStorage.getItem("userName") || ''

  try {
    const formData = new FormData();
    formData.append("userName", userName)
    formData.append("file", file);
   
    console.log((file.size))
    
    // 上传图片并接收 JSON 响应
    const response = await axios.post("/api/images/OssUpload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    
    const data = response.data
    console.log(data)

    appStore.setDetectionResult({
      imageWidth: data.image_width,
      imageHeight: data.image_height,
      tamperedPositions: data.tampered_positions,
      isTampered: data.is_tampered,
      tamperedScores: data.tampered_scores,
      resultImage: data.processImg
    }) // Base64 图片

    // 创建新的图片记录
    const originalUrl = URL.createObjectURL(file);
    const newImage = {
      id: Date.now(),
      originalUrl,
      processedUrl: appStore.detectionResult.resultImage,
    };

    images.value.push(newImage);
    currentImage.value = newImage.originalUrl;

  } catch (error) {
    console.error("上传失败:", error);
  } finally {
    isUploading.value = false;
    if (fileInput.value) fileInput.value.value = "";
  }
};

// 缩略图点击处理
const handleThumbnailClick = (url: string, processedUrl: string) => {
  currentImage.value = url;
  appStore.setResultImage(processedUrl);
  scale.value = 1;
  rotate.value = 0;
};

// 图片操作逻辑
const zoomIn = () => (scale.value = Math.min(3, scale.value + 0.1));
const zoomOut = () => (scale.value = Math.max(0.5, scale.value - 0.1));
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* 左侧边栏 */
.left-sidebar {
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: 100%;
}

/* 缩略图容器 */
.thumbnail-scroll-container {
  width: 150px;
  border-right: 1px solid #e2e8f0;
  background: white;
  overflow-y: auto;
  height: 527px;
}

.thumbnail-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
}

.thumbnail-item {
  width: 100%;
  aspect-ratio: 1;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 12px;
}

.thumbnail-item.active {
  border-color: #3b82f6;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.3);
}

.thumbnail-list img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-viewport {
  flex: 1;
  position: relative;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  height: 527px;
}

.scaled-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.scaled-image img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  position: relative;
  z-index: 0;
}

.scan-line {
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 30px;
  background: linear-gradient(
    to bottom,
    rgba(0, 255, 255, 0) 0%,
    rgba(0, 255, 255, 0.6) 50%,
    rgba(0, 255, 255, 0) 100%
  );
  animation: scan 1.5s infinite;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  z-index: 1;
}

@keyframes scan {
  0%, 100% { top: -100%; }
  50% { top: 100%; }
}

/* 悬浮操作控件 */
.floating-controls {
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: rgba(255, 255, 255, 0.9);
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.control-btn {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: #3b82f6;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.control-btn:hover {
  background: #2563eb;
  transform: scale(1.1);
}

.tooltip {
  position: absolute;
  right: 50px;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.control-btn:hover .tooltip {
  opacity: 1;
}

/* 上传区域 */
.upload-section {
  border-top: 1px solid #e2e8f0;
  padding: 16px 0;
  margin-bottom: 0;
  color: #858c99;
  font-size: 13px;
  word-wrap: break-word;
}

.upload-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.upload-btn {
  min-width: 120px;
  padding: 12px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.or-text {
  margin: 0 10px;
  display: inline-block;
}

.upload-input {
  flex: 1;
  min-width: 200px;
  padding: 12px;
  background: rgb(192, 244, 192);
  color: #858c99;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.upload-input.dragging {
  background: rgb(162, 231, 162);
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
}

.drag-icon {
  font-size: 20px;
}

.upload-btn:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.upload-btn:hover:not(:disabled) {
  background: #059669;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .left-sidebar {
    flex-direction: column;
    max-width: 100%;
  }
  
  .thumbnail-scroll-container {
    width: 100%;
    height: auto;
    max-height: 150px;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .thumbnail-list {
    flex-direction: row;
    overflow-x: auto;
    padding: 10px;
    gap: 10px;
  }
  
  .thumbnail-item {
    width: 80px;
    min-width: 80px;
    margin-bottom: 0;
    margin-right: 10px;
  }
  
  .image-viewport {
    height: auto;
    min-height: 300px;
    max-height: 60vh;
  }
  
  .upload-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .upload-btn {
    width: 100%;
  }
  
  .or-text {
    display: none;
  }
  
  .upload-input {
    width: 100%;
    margin-top: 10px;
  }
  
  .drag-text {
    display: none;
  }
  
  .upload-input {
    padding: 15px;
  }
  
  .drag-icon {
    font-size: 24px;
  }
  
  .floating-controls {
    flex-direction: row;
    right: 10px;
    bottom: 10px;
    padding: 8px;
  }
  
  .control-btn {
    width: 36px;
    height: 36px;
  }
  
  .tooltip {
    display: none;
  }
}

/* 中等尺寸屏幕调整 */
@media (min-width: 769px) and (max-width: 1024px) {
  .left-sidebar {
    gap: 16px;
  }
  
  .thumbnail-scroll-container {
    width: 120px;
  }
  
  .upload-container {
    flex-wrap: wrap;
  }
  
  .upload-btn {
    min-width: 100px;
  }
  
  .upload-input {
    min-width: 180px;
  }
}
</style>