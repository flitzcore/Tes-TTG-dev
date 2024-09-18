const registrationForm = document.getElementById('registration-form')
registrationForm?.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username')?.value;
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    const confirmPassword = document.getElementById('password-conf')?.value;
    const errorMessages = document.getElementById('error-message');

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!username || !email || !password || !confirmPassword) {
        const usernameError = 'Harus mengisi semua bagian';
        errorMessages.innerText = usernameError;
    }
    else if (!emailPattern.test(email)) {
        const emailError = 'Alamat email tidak valid';
        errorMessages.innerText = emailError;
    }
    else if (password.length < 8) {
        const passwordError = 'Password minimal 8 karakter';
        errorMessages.innerText = passwordError;
    }
    else if (password !== confirmPassword) {
        const confirmPasswordError = 'Konfirmasi password tidak sesuai';
        errorMessages.innerText = confirmPasswordError;
    }
    else {
        alert('Registration successful!');
    }
});


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cookie_name) {
    let name = cookie_name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
export { setCookie, getCookie };