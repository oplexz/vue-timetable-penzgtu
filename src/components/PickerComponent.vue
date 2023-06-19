<script setup lang="ts">
import { watch, ref, toRefs } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import PickerList from "@/components/PickerList.vue";

const baseUrl = "http://localhost:3000";

const props = defineProps<{
    urlPath: string;
    title: string;
    errorText: string;
    nextView: string;
}>();

const { urlPath, nextView } = toRefs(props);

const route = useRoute();

let params = {};

const data = ref({});

const updateContent = async () => {
    params = { ...route.params };
    data.value = await fetchData();
};

watch(
    () => route.params,
    async () => await updateContent()
);

const fetchData = async () => {
    let response;
    try {
        response = await axios.post(getUrl(), params);
        console.log(`Axios response:`, response);
    } catch (error) {
        alert(error);
    }
    return response?.data.data;
};

const getUrl = () => `${baseUrl}/${urlPath.value}`;

await updateContent();
</script>

<template>
    <main>
        <div v-if="data">
            <div class="text-xl mb-2">{{ title }}</div>
            <PickerList :data="data" :nextView="nextView" :params="params" />
        </div>
        <div v-else>
            <div class="text-xl mb-2">
                Произошла ошибка при загрузке {{ errorText }}. Попробуйте перезагрузить страницу.
            </div>
        </div>
    </main>
</template>
