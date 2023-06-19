<script setup lang="ts">
import { toRefs } from "vue";
import PickerItem from "@/components/PickerItem.vue";

const props = defineProps<{ data: {}; nextView: string; params: {} }>();

const { nextView, params } = toRefs(props);

const getLinkParams = (index) => {
    const linkParams: {
        level?: string;
        form?: string;
        type?: string;
        year?: string;
        group?: string;
    } = { ...params.value };

    switch (nextView.value) {
        case "formpicker":
            linkParams.level = index;
            break;
        case "typepicker":
            linkParams.form = index;
            break;
        case "yearpicker":
            linkParams.type = index;
            break;
        case "grouppicker":
            linkParams.year = index;
            break;
        case "schedule":
            linkParams.group = index;
            break;
    }

    console.log(`Params for RouterLink: `, linkParams);

    return { name: nextView.value, params: linkParams };
};
</script>

<template>
    <div class="flex gap-2 flex-wrap">
        <template v-for="(name, index) in data" :key="index">
            <RouterLink
                :to="getLinkParams(index)"
                class="text-lg font-semibold px-6 py-2 rounded-3xl text-white bg-gradient-to-r from-cyan-500 to-blue-500"
            >
                <PickerItem :name="name" />
            </RouterLink>
        </template>
    </div>
</template>
