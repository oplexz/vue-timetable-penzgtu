<script setup lang="ts">
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const url = "http://localhost:3000/getTimetable";

const route = useRoute();

let level: string, form: string, type: string, year: string, group: string;
const data = ref({
    group: "",
    data: {
        dayIndex: { title: "", data: { subjectIndex: { time: "", time_style: "", subject: "" } } },
    },
});

const updateContent = async () => {
    level = route.params.level?.toString();
    form = route.params.form?.toString();
    type = route.params.type?.toString();
    year = route.params.year?.toString();
    group = route.params.group?.toString();
    if (level && form && type && year && group) data.value = await fetchData();
};

watch(
    () => [
        route.params?.level,
        route.params?.form,
        route.params?.type,
        route.params?.year,
        route.params?.group,
    ],
    async () => await updateContent()
);

const fetchData = async () => {
    let response;
    const data = { level, form, type, year, group };

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
            <div class="text-3xl py-2">Расписание группы {{ data.group }}</div>
            <div class="flex gap-2 flex-wrap">
                <div v-for="(day, index) in data.data" :key="index">
                    <div class="text-xl py-4">{{ day.title }}</div>
                    <table class="table-fixed border-collapse break-all">
                        <thead>
                            <tr>
                                <th class="border p-2">Время</th>
                                <th class="border">Дисциплина</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="({ time, subject }, index) in day.data" :key="index">
                                <tr v-if="subject.length > 0">
                                    <td class="border text-center p-2">
                                        <template v-if="time.indexOf(`,`) > 0">
                                            <div
                                                v-for="(line, index) in time.split(/, ?/)"
                                                :key="index"
                                            >
                                                {{ line }}
                                            </div>
                                        </template>
                                        <template v-else>
                                            {{ time }}
                                        </template>
                                    </td>
                                    <td class="border p-2">
                                        <div
                                            v-for="(line, index) in subject.split(`<br />`)"
                                            :key="index"
                                        >
                                            {{ line }}
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                    <div class="flex flex-col gap-y-2"></div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="text-xl mb-2">
                Произошла ошибка при загрузке расписания группы. Попробуйте перезагрузить страницу.
            </div>
        </div>
    </main>
</template>
