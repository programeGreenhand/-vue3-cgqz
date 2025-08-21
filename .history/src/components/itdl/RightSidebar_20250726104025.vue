<template>
  <div class="right-sidebar">
    <!-- 加载状态 -->
    <div v-if="loading" class="skeleton-container">
      <!-- JSON 面板骨架 -->
      <div class="skeleton-section">
        <div class="skeleton-header"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
      </div>
      
      <!-- 图片区域骨架 -->
      <div class="skeleton-section">
        <div class="skeleton-header"></div>
        <div class="skeleton-image"></div>
      </div>
    </div>
    
    <!-- 实际内容 -->
    <div v-else>
      <!-- 原有的 RightSidebar 内容 -->
      <el-collapse>
        <el-collapse-item title="JSON 结果" name="json">
          <h3>{{ appStore.detectionResult }}</h3>
        </el-collapse-item>
      </el-collapse>

      <div class="result-image-container">
        <h3 class="image-title" style="margin: 0;">识别结果</h3>
        <div class="processed-image-wrapper">
          <div class="processed-image">
            <img src="@/assets/proccedimg.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/useAppStore";
import { ref, onMounted } from "vue";

const appStore = useAppStore();
const loading = ref(true);

// 模拟异步加载延迟
onMounted(() => {
  // 实际项目中这里会是真实的 API 请求
  setTimeout(() => {
    loading.value = false;
  }, 1500); // 1.5秒延迟模拟网络请求
});
</script>

<style scoped>
/* 骨架屏样式 */
.skeleton-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 16px;
}

.skeleton-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}

.skeleton-header {
  height: 24px;
  background: #e9ecef;
  border-radius: 4px;
  margin-bottom: 16px;
  width: 40%;
}

.skeleton-line {
  height: 16px;
  background: #e9ecef;
  border-radius: 4px;
  margin-bottom: 12px;
}

.skeleton-line:nth-child(2) {
  width: 95%;
}

.skeleton-line:nth-child(3) {
  width: 85%;
}

.skeleton-line:nth-child(4) {
  width: 90%;
}

.skeleton-image {
  height: 300px;
  background: #e9ecef;
  border-radius: 4px;
}

/* 骨架屏动画 */
.skeleton-header,
.skeleton-line,
.skeleton-image {
  position: relative;
  overflow: hidden;
}

.skeleton-header::after,
.skeleton-line::after,
.skeleton-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.6),
    transparent
  );
  animation: loading 1.5s infinite;
}

@keyframes loading {
  100% {
    left: 100%;
  }
}

/* 原有样式保持不变 */
.right-sidebar {
  width: var(--container-width);
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

/* 其他原有样式... */
</style>