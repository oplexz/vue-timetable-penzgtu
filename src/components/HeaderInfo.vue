<script setup lang="ts">
import { ref, watchEffect } from "vue";
import axios from "axios";

interface ApiResponse {
    status: string;
    data: {
        weeknum: number;
    };
}

const data = ref<ApiResponse | null>(null);

const days = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];

const weekWords = {
    1: "первой",
    2: "второй",
};

const now = new Date();

const url = "http://localhost:3000/getWeekNum";

const fetchData = async () => {
    try {
        const response = await axios.post<ApiResponse>(url);
        data.value = response.data;
    } catch (error) {
        console.error(error);
    }
};

const weekNumber = ref<number>(0);

watchEffect(() => {
    if (data.value && data.value.data.weeknum) {
        weekNumber.value = data.value.data.weeknum;
    }
});

await fetchData();
</script>

<template>
    <div>
        <div>Сегодня {{ days[now.getDay()] }}, {{ now.toLocaleDateString("ru") }}</div>
        <div v-if="weekNumber > 0">
            занятия проводятся по
            <span class="font-semibold">{{ weekWords[weekNumber] || `${weekNumber}` }}</span>
            неделе
        </div>
        <div v-else>Не удалось получить текущую неделю</div>
    </div>
</template>
