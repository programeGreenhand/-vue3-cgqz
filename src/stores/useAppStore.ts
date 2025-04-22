import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("appStore", () => {
  // 检测结果状态
  const detectionResult = ref({
    imageWidth: 0,
    imageHeight: 0,
    tamperedPositions: [],
    isTampered: false,
    tamperedScores: 0,
    resultImage: "",
  });

  // 设置检测结果
  const setDetectionResult = (result: any) => {
    detectionResult.value = result;
  };

  // 设置处理后的结果图片
  const setResultImage = (image: any) => {
    detectionResult.value.resultImage = image;
  };

  
  

  return {
    detectionResult,
    setDetectionResult,
    setResultImage,
  };
});