<template>
  <div class="right-sidebar">
    <!-- 使用 Element Plus 折叠面板 -->
    <el-collapse>
      <el-collapse-item title="JSON 结果" name="json">

       <h3>{{  appStore.detectionResult }}</h3>

      </el-collapse-item>
    </el-collapse>

    <!-- 检测结果图片展示 -->
    <div class="result-image-container">
      <div class="image-header">
        <h3 class="image-title">识别结果</h3>
      </div>

      <div class="processed-image-wrapper">
        <div class="processed-image">
          <img
            v-if="appStore.detectionResult.resultImage"
            :src="`data:image/jpeg;base64,${appStore.detectionResult.resultImage}`"
            alt="检测结果图片"
            class="result-image"
          />
          <!-- {{ appStore.detectionResult.resultImage }} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/useAppStore"; // 引入 Composition API 风格的 store
import { ref } from "vue";
const appStore = useAppStore();


const jsonData = ref({ /* 数据同上 */ })

const handleNodeClick = (node:any) => {
  if (node.type === 'key') {
    copyToClipboard(node.path)
  }
}

const copyToClipboard = (text:any) => {
  navigator.clipboard.writeText(text)
}
</script>

<style scoped>

.result-image-container {
  --container-width: 800px;  /* 🔴 容器宽度（直接修改这个值） */
  --container-height: 600px; /* 🔴 容器高度（直接修改这个值） */
}
/* 用户自定义区域 END */

.right-sidebar {
  width: var(--container-width);
  /* 其他样式保持不变 */
}

.result-image-container {
  width: 100%;
  height: var(--container-height);
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.processed-image-wrapper {
  flex: 1;
  min-height: 0; /* 关键修复项 */
  padding: 12px;
}

.processed-image {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
}

.result-image {
  max-width: 100%;  /* 限制图片最大宽度 */
  max-height: 100%; /* 限制图片最大高度 */
  object-fit: contain;
  padding: 8px;
  transition: transform 0.2s ease;
}

/* 优化滚动条 */
.processed-image::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background: #f1f1f1;
}

.processed-image::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.processed-image::-webkit-scrollbar-track {
  background: #f1f1f1;
}



.result-image-container {
  flex: 0 0 300px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; /* 改为垂直排列 */
  align-items: start;     /* 可选：控制水平对齐方式 */
  
}

.processed-image {
  overflow: scroll;
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  padding: 8px;
  margin-top: 10px;
}

.image-title {
  margin: 0;               /* 清除默认边距 */
  color: #303133;
  font-size: 1.2em;
  margin-top:42px
}

:deep(.el-collapse) {
  border: none;
  margin-bottom: 0; 
}

:deep(.el-collapse-item__header) {
  font-weight: 500;
  color: #303133;
  background: #f8fafc;
  border-radius: 6px;
  margin-bottom: 4px;
}

:deep(.el-collapse-item__content) {
  padding: 16px;
  background: white;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
}

pre {
  background: #f1f5f9;
  padding: 12px;
  border-radius: 8px;
  white-space: pre-wrap;
  margin: 0;
  font-size: 0.9em;
}

.main-operations {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
  padding-bottom: 5px;
  gap: 24px 24px 24px 9px;
  
}
</style>