import { createRouter, createWebHistory } from "vue-router";
import LevelPickerView from "../views/LevelPickerView.vue";
import FormPickerView from "../views/FormPickerView.vue";
import TypePickerView from "../views/TypePickerView.vue";
import YearPickerView from "../views/YearPickerView.vue";
import GroupPickerView from "../views/GroupPickerView.vue";
import ScheduleView from "../views/ScheduleView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "levelpicker",
            component: LevelPickerView,
        },
        {
            path: "/level/:level",
            name: "formpicker",
            component: FormPickerView,
        },
        {
            path: "/level/:level/form/:form",
            name: "typepicker",
            component: TypePickerView,
        },
        {
            path: "/level/:level/form/:form/type/:type",
            name: "yearpicker",
            component: YearPickerView,
        },
        {
            path: "/level/:level/form/:form/type/:type/year/:year",
            name: "grouppicker",
            component: GroupPickerView,
        },
        {
            path: "/level/:level/form/:form/type/:type/year/:year/group/:group",
            name: "schedule",
            component: ScheduleView,
        },
        // {
        //     path: "/about",
        //     name: "about",
        //     // route level code-splitting
        //     // this generates a separate chunk (About.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () => import("../views/AboutView.vue"),
        // },
    ],
});

export default router;
