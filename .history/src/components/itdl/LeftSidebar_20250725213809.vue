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
      <div style="display: flex; flex-direction: row;">
      <input
        type="file"
        accept="image/*"
        @change="handleUpload"
        hidden
        ref="fileInput"
      />
      <button @click="uploadFile" class="upload-btn" >
        📤 上传图片
      </button>
      <h3 style="display: inline-block; margin: 5px;">或</h3>
      
      <div class="uploard-input"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="handleDrop"
     
      >
      <span class="drag-icon">📁</span>
        请将文件拖拽至此处
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
  if (!e.dataTransfer?.files || uploadLimit.value <= 0) return;

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
const requestformodel=async (formData:FormData) =>{
  const response = await axios.post("http://172.22.121.29:5000/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const data = response.data
    const  image_property  = data.image_property;
    console.log(image_property)
    const ps = image_property.ps;

    // // // 将检测结果存储到 appStore
    appStore.setDetectionResult({
      imageWidth: data.image_width,
      imageHeight: data.image_height,
      tamperedPositions: ps.tampered_positions,
      isTampered: ps.is_tampered,
      tamperedScores: ps.tampered_scores,
      resultImage: ps.image}) // Base64 图片 
}

// 向后端 间接请求版
const requestforfront = async (formData:FormData) =>{
  const  response = await axios.post("/api/images/OssUpload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
// const response = await upload(file,userName);
const data = response.data
    console.log(data)
    // // 解析 JSON 响应
    
    const  image_property  = data.image_property;
    console.log(image_property)
    const ps = image_property.ps;
    

    // // // 将检测结果存储到 appStore
    appStore.setDetectionResult({
      imageWidth: data.image_width,
      imageHeight: data.image_height,
      tamperedPositions: ps.tampered_positions,
      isTampered: ps.is_tampered,
      tamperedScores: ps.tampered_scores,
      resultImage: ps.image}) // Base64 图片

}


// 文件上传处理
const handleUpload = async (e: Event) => {


  const file = (e.target as HTMLInputElement).files?.[0];
  
  if (!file ) return;

  isUploading.value = true;

  const userName:string = localStorage.getItem("userName") || ''

  try {
   
    const formData = new FormData();
    formData.append("userName",userName)
    formData.append("file", file);
   

    console.log((file.size))
    
    // await axios.post("/api/images/OssUpload", formData, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });

    // 上传图片并接收 JSON 响应
    const  response = await axios.post("/api/images/OssUpload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // const response = await upload(file,userName);
    const data = response.data
    console.log(data)

    

    appStore.setDetectionResult({
      imageWidth: data.image_width,
      imageHeight: data.image_height,
      tamperedPositions: data.tampered_positions,
      isTampered: data.is_tampered,
      tamperedScores: data.tampered_scores,
      resultImage: data.processImg}) // Base64 图片

  

    // //上传失败: TypeError: Cannot read properties of null (reading 'processImg')
    // const a = `data:image/png;base64,${im}`

  

    // 创建新的图片记录
    const originalUrl = URL.createObjectURL(file);
    const newImage = {
      id: Date.now(),
      originalUrl,
      processedUrl: appStore.detectionResult.resultImage,
    };

    images.value.push(newImage);
    currentImage.value = newImage.originalUrl;
    // uploadLimit.value--;

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
.container{
  display: flex;
  flex-direction: column;
}

/* 左侧边栏 */
.left-sidebar {
  
  display: flex;
  min-width: 850px;
  flex-direction: row;  /* 水平排列 */
  gap: 24px;           /* 间距 */
  
}

@media (max-width: 768px) {
  .left-sidebar { flex-direction: column !important; }
}


/* 垂直缩略图容器 */
.thumbnail-scroll-container {
  width: 150px;
  border-right: 1px solid #e2e8f0;
  background: white;
  overflow-y: scroll;
  height: 527px;  
 

}

.thumbnail-list {
  display: flex;
  flex-direction: column;
}

/* @media  screen and (max-width:768px) {
    .thumbnail-list {
      display: flex;
      flex-direction: row!important;
      gap: 12px;
      padding: 16px;
    }
} */

.thumbnail-list > div {
  width: 100%;
  aspect-ratio: 1;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.thumbnail-list > div.active {
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
}

.scaled-image img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
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
  animation: scan 1.5s infinite; /* 加快单次扫描速度 */
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  z-index: 1;
}

@keyframes scan {
  0%, 100% { top: -100%; }      /* 往返扫描 */
  50% { top: 100%; }            /* 中间点 */
}

.scaled-image {
  position: relative;
  overflow: hidden;
}

.scaled-image img {
  position: relative;
  z-index: 0;
}
.app-container {
  display: flex;
  height: 90vh;
  background: #f8fafc;
}

/* 左侧边栏 */
.left-sidebar {
  
  display: flex;
  min-width: 850px;
  flex-direction: row;  /* 水平排列 */
  gap: 24px;           /* 间距 */
  
}

/* 垂直缩略图容器 */
.thumbnail-scroll-container {
  width: 150px;
  border-right: 1px solid #e2e8f0;
  background: white;
  overflow-y: scroll;
  height: 527px;  
}

@media  screen and (max-width:768px) {
    .thumbnail-scroll-container {
        display: flex;
        flex-direction: row;
      }
}

.thumbnail-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
}

.thumbnail-list > div {
  width: 100%;
  aspect-ratio: 1;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.thumbnail-list > div.active {
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
}

.scaled-image img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
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
  padding-top: 1px;
  margin-bottom: 0;
  color: #858c99;
  font-size: 13px;
  word-wrap: break-word; /* 添加此行以确保长文字换行 */
  display: flex;
  flex-direction: column;
}

.upload-btn {
  width: 20%;
  padding: 12px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.uploard-input{
  width: 80%;
  padding: 12px;
  background:rgb(192, 244, 192);
  color: #858c99;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  

}



.upload-btn:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.upload-btn:hover:not(:disabled) {
  background: #059669;
}

.upload-btn:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.upload-btn:hover:not(:disabled) {
  background: #059669;
}
</style>