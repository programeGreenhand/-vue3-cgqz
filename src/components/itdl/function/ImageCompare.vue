<template>
  <div class="image-compare-container" @click.stop="handleCompareClick">
    <!-- 对比布局容器 -->
    <div class="comparison-card">
      <!-- 原图容器 -->
      <div class="image-container original">
        <img 
          
          v-lazy="original"
          alt="Original Image"
          class="compare-image"
          @click.stop="handleImageClick('original')"
        >
        <div class="image-label">Original</div>
      </div>

      <!-- 对比分隔线 -->
      <div class="divider"></div>

      <!-- 处理图容器 -->
      <div class="image-container processed">
        <img 
          :src="processed" 
          alt="Processed Image"
          class="compare-image"
          @click.stop="handleImageClick('processed')"
        >
        <div class="image-label">Processed</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  original: { type: String, required: true },
  processed: { type: String, required: true }
})

const emit = defineEmits(['compare-click'])

// 处理图片点击（带类型参数）
const handleImageClick = (type: 'original' | 'processed') => {
  emit('compare-click', {
    original: props.original,
    processed: props.processed,
    activeType: type
  })
}

// 处理整个卡片点击
const handleCompareClick = (event: MouseEvent) => {
  event.stopPropagation()
  emit('compare-click', {
    original: props.original,
    processed: props.processed
  })
}
</script>

<style scoped>
.image-compare-container {
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.comparison-card {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  height: 300px;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.comparison-card:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.image-container {
  position: relative;
  overflow: hidden;
}

.compare-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  cursor: zoom-in;
}

.image-container:hover .compare-image {
  transform: scale(1.03);
}

.divider {
  width: 2px;
  background: #ffffff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}

.image-label {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9em;
  backdrop-filter: blur(2px);
}

.original .image-label { background: #4a90e2; }
.processed .image-label { background: #50e3c2; }

@media (max-width: 768px) {
  .comparison-card {
    grid-template-columns: 1fr;
    height: auto;
  }
  
  .divider {
    display: none;
  }
}
</style>


