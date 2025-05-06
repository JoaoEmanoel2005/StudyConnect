import { API_URL } from './globalVar.js';
const BASE_URL = API_URL;

window.openSidebar = function () {
    document.getElementById("sidebar").classList.add("open");
    document.body.classList.add("content-shift");
};

window.closeSidebar = function () {
    document.getElementById("sidebar").classList.remove("open");
    document.body.classList.remove("content-shift");
};
