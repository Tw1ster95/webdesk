import { loadOS } from './main.js';
import { setData } from './data.js';
import { displayQuickMessage } from './utils.js';

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

        const username = $(form).find('[name="username"]').val();
        const password = $(form).find('[name="password"]').val();

        if(username.length == 0 || password.length == 0) {
            displayQuickMessage('Please fill in all fields.');
            return;
        }
        
        const fd = new FormData();
        
        fd.append('username', username);
        fd.append('password', password);

        $.ajax({
            url: 'inc/user/login_user.php',
            type: 'POST',
            data: fd,
            contentType: false,
            processData: false,
            success: async (response) => {
                const result = JSON.parse(response);

                if(result.status == 'ok') {
                    setData('user', 'userid', result.id);
                    setData('user', 'username', result.username);

                    removeLoginWindow();

                    loadOS();
                }
                else {
                    displayQuickMessage(result.message);
                }
            },
        });
    });
    $('#registerForm').submit((e) => {
        e.preventDefault();
        const form = e.target;

        const username = $(form).find('[name="username"]').val();
        const password = $(form).find('[name="password"]').val();
        const password2 = $(form).find('[name="password2"]').val();

        if(username.length == 0 || password.length == 0 || password2.length == 0) {
            displayQuickMessage('Please fill in all fields.');
            return;
        }
        
        const fd = new FormData();
        
        fd.append('username', username);
        fd.append('password', password);
        fd.append('password2', password2);

        $.ajax({
            url: 'inc/user/register_user.php',
            type: 'POST',
            data: fd,
            contentType: false,
            processData: false,
            success: async (response) => {
                const result = JSON.parse(response);

                if(result.status == 'ok') {
                    setData('user', 'userid', result.id);
                    setData('user', 'username', result.username);

                    loadOS();
                }
                else {
                    displayQuickMessage(result.message);
                }
            },
        });
    });
}

export {
    displayLoginModal
}