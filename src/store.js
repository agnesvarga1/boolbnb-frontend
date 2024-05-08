import { reactive } from "vue";

export const store = reactive({
  apiBaseUrl: "http://127.0.0.1:8000",
  map: null,
  homeLat: 0,
  homeLong: 0,
  homeInput: "",
});
