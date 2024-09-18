import { getCookie } from './Controller/auth.controller.js';

const authToken = getCookie('Authorization');


if (authToken != "") {
    window.location.href = "View/landingPage.html";
} else {
    window.location.href = "View/register.html";
}
