import { ref, type Ref } from "vue";
import { defineStore } from "pinia";

export const useLocationStore = defineStore("location", () => {
    const level: Ref<string | null> = ref(null);
    const form: Ref<string | null> = ref(null);
    const type: Ref<string | null> = ref(null);
    const year: Ref<string | null> = ref(null);

    const clear = () => {
        level.value = null;
        form.value = null;
        type.value = null;
        year.value = null;
    };

    return { level, form, type, year, clear };
});
