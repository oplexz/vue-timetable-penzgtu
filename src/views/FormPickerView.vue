<script setup lang="ts">
import PickerComponent from "@/components/PickerComponent.vue";
</script>

<template>
    <PickerComponent
        urlPath="getForms"
        title="Выберите форму образования"
        errorText="форм образования"
        nextView="typepicker"
    />
</template>
