<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { defineAsyncComponent } from "vue";

const HeaderInfo = defineAsyncComponent(() => import("@/components/HeaderInfo.vue"));
</script>

<template>
    <header class="flex items-center justify-between mb-4">
        <RouterLink :to="{ name: 'levelpicker', params: {} }" class="flex items-center gap-x-3">
            <img
                alt="Логотип университета"
                class="rounded-full shadow-lg"
                src="https://placekitten.com/48/48"
                width="48"
                height="48"
            />
            <div class="text-2xl font-bold text-sky-600">Расписание</div>
        </RouterLink>
        <div class="text-right font-extralight">
            <Transition
                enter-from-class="opacity-0"
                leave-to-class="opacity-0"
                enter-active-class="transition duration-300"
                leave-active-class="transition duration-300"
                mode="out-in"
            >
                <Suspense>
                    <template #default>
                        <HeaderInfo />
                    </template>
                    <template #fallback>
                        <div>Загрузка... (HeaderInfo)</div>
                    </template>
                </Suspense>
            </Transition>
        </div>
    </header>

    <RouterView v-slot="{ Component }">
        <template v-if="Component">
            <Transition
                enter-from-class="opacity-0"
                leave-to-class="opacity-0"
                enter-active-class="transition duration-300"
                leave-active-class="transition duration-300"
                mode="out-in"
            >
                <Suspense>
                    <component :is="Component"></component>
                    <template #fallback>
                        <div class="text-xl mb-2">Загрузка... (RouterView)</div>
                    </template>
                </Suspense>
            </Transition>
        </template>
    </RouterView>
</template>
