<template>
  <svg>
    <!-- #结果还是id选择器，一下还没反应过来 -->
    <use :href="`${sprite}#icon-${icon}`"></use>
  </svg>
</template>

<script setup>
import sprite from "../assets/icons/sprite.svg";

defineProps({
  icon: String,
});
</script>
