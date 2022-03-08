import { loadOS } from './os-load.js';
import { setData, getUserSettings } from './data.js';

const displayLoginModal = () => {
    $('body').append(`<div class="login-container">
        <div class="login-wrapper">
            <form class="login-form" id="loginForm">
                <h2>Login</h2>
                <input type="text" name="username" autocomplete="off" placeholder="Username">
                <input type="password" name="password" placeholder="******">

                <button type="submit" class="small">Login</button>

                <p>or <span class="button small js-switch-login">Register</span></p>
            </form>

            <form class="register-form" id="registerForm">
                <h2>Register</h2>
                <input type="text" name="username" autocomplete="off" placeholder="Username">
                <input type="password" name="password" placeholder="******">
                <input type="password2" name="password2" placeholder="******">

                <button type="submit" class="small">Register</button>

                <p>or <span class="button small js-switch-login">Login</span></p>
            </form>
        </div>
    </div>`);

    // Load login event listeners
    loadLoginEvents();
}

const removeLoginWindow = () => {
    $('body .login-container').remove();
}

const loadLoginEvents = () => {
    $('.js-switch-login').click((e) => {
        $('.login-wrapper').toggleClass('login-form-transition');
    });

    $('#loginForm').submit((e) => {
        e.preventDefault();
        const form = e.target;

        // Remove previous error messages
        $(form).find('.err-msg').remove();

        const username = $(form).find('[name="username"]').val();
        const password = $(form).find('[name="password"]').val();

        if(username.length == 0 || password.length == 0) {
            $(form).prepend(`<div class="err-msg">Please fill in all fields.</div>`);
            return;
        }
        
        const fd = new FormData();
        
        fd.append('username', username);
        fd.append('password', password);

        $.ajax({
            url: 'inc/login_user.php',
            type: 'POST',
            data: fd,
            contentType: false,
            processData: false,
            success: async (response) => {
                const result = JSON.parse(response);

                if(result.status == 'ok') {
                    setData('userid', result.id);
                    setData('username', result.username);

                    removeLoginWindow();

                    await getUserSettings();

                    loadOS();
                }
                else {
                    $(form).prepend(`<div class="err-msg">${result.message}</div>`);
                }
            },
        });
    });
    $('#registerForm').submit((e) => {
        e.preventDefault();
        const form = e.target;

        // Remove previous error messages
        $(form).find('.err-msg').remove();

        const username = $(form).find('[name="username"]').val();
        const password = $(form).find('[name="password"]').val();
        const password2 = $(form).find('[name="password2"]').val();

        if(username.length == 0 || password.length == 0 || password2.length == 0) {
            $(form).prepend(`<div class="err-msg">Please fill in all fields.</div>`);
            return;
        }
        
        const fd = new FormData();
        
        fd.append('username', username);
        fd.append('password', password);
        fd.append('password2', password2);

        $.ajax({
            url: 'inc/register_user.php',
            type: 'POST',
            data: fd,
            contentType: false,
            processData: false,
            success: async (response) => {
                const result = JSON.parse(response);

                if(result.status == 'ok') {
                    setData('userid', result.id);
                    setData('username', result.username);

                    await getUserSettings();

                    loadOS();
                }
                else {
                    $(form).prepend(`<div class="err-msg">${result.message}</div>`);
                }
            },
        });
    });
}

export {
    displayLoginModal
}