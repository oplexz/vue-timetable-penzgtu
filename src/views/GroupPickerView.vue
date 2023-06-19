<script setup lang="ts">
import PickerComponent from "@/components/PickerComponent.vue";
</script>

<template>
    <PickerComponent
        urlPath="getGroups"
        title="Выберите группу"
        errorText="групп"
        nextView="schedule"
    />
</template>
