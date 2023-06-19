<script setup lang="ts">
import { watch, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import axios from "axios";
import PickerItem from "@/components/PickerItem.vue";

const url = "http://localhost:3000/getTypes";

const route = useRoute();

let level: string, form: string;
const data = ref({});

const updateContent = async () => {
    level = route.params.level?.toString();
    form = route.params.form?.toString();
    if (level && form) data.value = await fetchData();
};

watch(
    () => [route.params?.level, route.params?.form],
    async () => await updateContent()
);

const fetchData = async () => {
    let response;
    const data = { level, form };

    try {
        response = await axios.post(url, data);
    } catch (error) {
        alert(error);
    }
    return response?.data.data;
};

await updateContent();
</script>

<template>
    <main>
        <div v-if="data">
            <div class="text-xl mb-2">Выберите тип расписания</div>
            <div class="flex gap-2 flex-wrap">
                <div v-for="(name, index) in data" :key="index">
                    <router-link
                        :to="{
                            name: 'yearpicker',
                            params: { level, form, type: index },
                        }"
                    >
                        <PickerItem :name="name" />
                    </router-link>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="text-xl mb-2">
                Произошла ошибка при загрузке типов расписания. Попробуйте перезагрузить страницу.
            </div>
        </div>
    </main>
</template>
