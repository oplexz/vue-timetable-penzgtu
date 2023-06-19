<script setup lang="ts">
import PickerComponent from "@/components/PickerComponent.vue";
</script>

<template>
    <PickerComponent
        urlPath="getLevels"
        title="Выберите уровень образования"
        errorText="уровней образования"
        nextView="formpicker"
    />
</template>
