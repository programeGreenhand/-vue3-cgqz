<template>
  <div class="right-sidebar">
    <!-- 使用 Element Plus 折叠面板 -->
    <el-collapse v-model="activeName" accordion>
      
      <el-collapse-item title="JSON 结果" name="json" >
        <template #title>
          <div class="custom-title"> <!-- 自定义标题容器 -->
            <span style="font-weight: bold">JSON 结果</span>
          </div>
        </template>
        <div class="jsonResult"> 
          <h3>{{  appStore.detectionResult }}</h3>
        </div>
      </el-collapse-item>

      <el-collapse-item name="result" title="检测结果" >
          <template #title>
          <div class="custom-title"> <!-- 自定义标题容器 -->
             <span style="font-weight: bold">检测结果</span>
          </div>
          </template>

          <template v-if="isProcessing">

          </template>

          <template>
            <div class="processed-image-wrapper">
            <div class="processed-image">
              <!-- <img
                v-if="appStore.detectionResult.resultImage"
                :src="`data:image/jpeg;base64,${appStore.detectionResult.resultImage}`"
                alt="检测结果图片"
                class="result-image"
              /> -->
              <img src="@/assets/proccedimg.png">
              <!-- {{ appStore.detectionResult.resultImage }} -->
            </div>
          </div>
          </template>

          

      </el-collapse-item>
    </el-collapse>

  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/useAppStore"; // 引入 Composition API 风格的 store
import { ref } from "vue";
const appStore = useAppStore();
const activeName = ref(['result'])

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

/* 用户自定义区域 END */

.right-sidebar {
  width: var(--container-width);
  /* 其他样式保持不变 */
  height:80vh;
}


.processed-image-wrapper {
  flex: 1;
  min-height: 0; /* 关键修复项 */
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 62vh;
}

.processed-image {
  width: 100%;
  height: 100%;
  overflow: scroll;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  
}

.result-image {
  max-width: 100%;  /* 限制图片最大宽度 */
  max-height: 100%; /* 限制图片最大高度 */
  object-fit: contain;
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


.processed-image {
  overflow: scroll;
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  padding: 8px;
  margin-top: 10px;
}

.processed-image img {
    display: block;
  }

.image-title {
  margin: 0;               /* 清除默认边距 */
  color: #303133;
  font-size: 1.2em;
  margin-top:calc(1.2*var(--space-md))
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
  padding: var(--space-sm);
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
  padding: var(--space-sm);
  border-radius: var(--space-xs);
  white-space: pre-wrap;
  margin: 0;
  font-size: 0.9em;
}

.main-operations {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: calc(1.5 * var(--space-sm));
  padding-bottom: var(--space-xs);
  gap: var(--space-md) var(--space-md) var(--space-md) 9px;
  
}

.jsonResult{
  width: 35vw;
  height: 62vh;
}
</style>