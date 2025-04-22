import { defineStore } from "pinia";
import { ref } from "vue";

export const imgStore = defineStore("imgStore", () => {
 
   interface ImageInfo {
        textimage: string
        tamperingimg: string
    }

    const imgSet = ref<ImageInfo>()

    
});