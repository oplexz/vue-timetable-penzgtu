<script setup lang="ts">
import PickerComponent from "@/components/PickerComponent.vue";
</script>

<template>
    <PickerComponent
        urlPath="getTypes"
        title="Выберите тип расписания"
        errorText="типов расписания"
        nextView="yearpicker"
    />
</template>
