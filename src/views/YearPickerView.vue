<script setup lang="ts">
import PickerComponent from "@/components/PickerComponent.vue";
</script>

<template>
    <PickerComponent
        urlPath="getYears"
        title="Выберите курс"
        errorText="курсов"
        nextView="grouppicker"
    />
</template>
