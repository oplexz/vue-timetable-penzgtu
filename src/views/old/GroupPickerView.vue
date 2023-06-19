<script setup lang="ts">
import { watch, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import axios from "axios";
import PickerItem from "@/components/PickerItem.vue";

const url = "http://localhost:3000/getGroups";

const route = useRoute();

let level: string, form: string, type: string, year: string;
const data = ref({});

const updateContent = async () => {
    level = route.params.level?.toString();
    form = route.params.form?.toString();
    type = route.params.type?.toString();
    year = route.params.year?.toString();
    if (level && form && type && year) data.value = await fetchData();
};

watch(
    () => [route.params?.level, route.params?.form, route.params?.type, route.params?.year],
    async () => await updateContent()
);

const fetchData = async () => {
    let response;
    const data = { level, form, type, year };

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
            <div class="text-xl mb-2">Выберите группу</div>
            <div class="flex gap-2 flex-wrap">
                <div v-for="(name, index) in data" :key="index">
                    <router-link
                        :to="{
                            name: 'schedule',
                            params: { level, form, type, year, group: index },
                        }"
                    >
                        <PickerItem :name="name" />
                    </router-link>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="text-xl mb-2">
                Произошла ошибка при загрузке групп. Попробуйте перезагрузить страницу.
            </div>
        </div>
    </main>
</template>
