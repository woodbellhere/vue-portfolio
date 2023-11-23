<template>
  <!-- 监听modal组件的emit来关闭发帖弹窗 -->
  <TheModal @close="store.commit('changeShowPostUpload', false)">
    <div class="postUpload">
      <label class="upload">
        <img v-if="imageUrl" :src="imageUrl" class="preview" />
        <TheIcon v-else icon="upload-image" />
        <input
          type="file"
          accept="image/*"
          class="fileChooser"
          @change="handleImageUpload"
        />
      </label>
      <div class="postContent">
        <textarea
          placeholder="写点啥吧"
          class="postContentInput"
          v-model="description"
        ></textarea>
        <TheButton class="pubBtn" @click="publishPost">发布</TheButton>
      </div>
    </div>
  </TheModal>
</template>

<script setup>
import TheModal from "./TheModal.vue";
import TheIcon from "./TheIcon.vue";
import TheButton from "./TheButton.vue";
import { useStore } from "vuex";
import { ref } from "vue";

const store = useStore();
const imageUrl = ref("");

const image = ref(null);
const description = ref("");
// 图片发布时的路径处理
async function handleImageUpload(e) {
  const imageFile = e.target.files[0];
  if (imageFile) {
    imageUrl.value = URL.createObjectURL(imageFile);
    image.value = imageFile;
  }
}
// 真正的图片上传
function publishPost() {
  store.dispatch("uploadPost", {
    image: image.value,
    description: description.value,
  });
}
// 也记得strapi的图片是关联字段，返回时似乎默认没信息
</script>

<style scoped>
.postUpload {
  width: 50vw;
  height: 70vh;
  display: grid;
  grid-template-rows: 4fr 1fr;
}

.preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 0;
}
.upload {
  display: grid;
  place-items: center;
  cursor: pointer;
  min-height: 0;
}
.upload > svg {
  width: 254px;
  height: 316px;
}

.fileChooser {
  opacity: 0;
  position: absolute;
}

.postContent {
  display: grid;
}
.postContentInput {
  border-bottom: none;
  resize: none;
  padding: 12px 24px;
}

.postContentInput::placeholder {
  color: #757575;
}

.pubBtn {
  align-self: end;
  justify-self: end;
  position: relative;
  right: 24px;
  bottom: 18px;
}
/* .button {
  border-radius: 8px;
  padding: 10px 32px;
  border: none;
  color: white;
  font-size: 16px;
  background: #1da0ff;
} */
</style>
