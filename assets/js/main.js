// Imports
import { loadBackground, generateSquares } from '../js/os-load.js';
import { iconAllowDrop, iconDragStart, iconDrop, onFolderClick } from '../js/events.js';
import { createModal, toggleModal } from '../js/modal.js';

// Add loading screen and wait cursor to page
$('body').css('cursor', 'wait');

// Global Variables
let lastClickTime = new Date().getTime();

let userinfo = {
    id: null,
    username: ''
}

let settings = {
    icon_size: 100,
    bg_type: '',
    bg_style: '',
    bg_url: ''
}

// Global Variables End

$(window).on('load', async () => {
    await getUserInfo();

    if(userinfo.id) {
        await getUserSettings();
        loadOS();
    }
    else {
        displayLoginWindow();
    }

    $('body').css('cursor', 'auto');
    $('#loadingScreen').remove();
});

function setIconSize(size) {
    settings.icon_size = size;
    generateSquares(settings, iconAllowDrop, iconDrop);
}

async function getUserInfo() {
    await $.ajax({
        url: 'inc/get_user_info.php',
        type: 'post',
        contentType: false,
        processData: false,
        success: function(response){
            const result = JSON.parse(response);

            if(result.status == 'ok') {
                userinfo.id = result.id;
                userinfo.username = result.username;
            }
        },
    });
}

async function getUserSettings() {
    await $.ajax({
        url: 'inc/get_settings.php',
        type: 'post',
        contentType: false,
        processData: false,
        success: function(response){
            const result = JSON.parse(response);

            if(result.status == 'ok') {
                Object.keys(settings).forEach(key => {
                    settings[key] = result[key];
                });
            }
            else {
                alert(result.message);
                location.href = location;
            }
        },
    });
}

function loadOS() {
    loadBackground(settings);

    // Insert Desktop Menu
    $('body').append(`<ul class='desktop-menu'>
        <li data-action="submenu">View<i class="fa fa-angle-right"></i>
            <ul class='desktop-submenu'>
                <li data-action="l-icons">Large Icons</li>
                <li data-action="m-icons">Medium Icons</li>
                <li data-action="s-icons">Small Icons</li>
            </ul>
        </li>
        <li data-action="submenu">Sort by<i class="fa fa-angle-right"></i>
            <ul class='desktop-submenu'>
                <li data-action="l-icons">Name</li>
                <li data-action="m-icons">Size</li>
                <li data-action="s-icons">Item type</li>
            </ul>
        </li>
        <li data-action="refresh">Refresh</li>
        <li data-action="submenu">New<i class="fa fa-angle-right"></i>
            <ul class='desktop-submenu'>
                <li data-action="newfolder">Folder</li>
                <li data-action="newtxtdoc">Text Document</li>
                <li data-action="newimage">Image</li>
            </ul>
        </li>
        <li data-action="display">Display</li>
    </ul>`);

    // Insert Desktop
    $('body').append(`<div class="desktop-flex" id="desktop"></div>`);

    // Insert Taskbar
    $('body').append(`<div class="taskbar" id="taskbar">
        <div class="os-logo">
            <img src="assets/img/win10logo.png" alt="OS Logo">
        </div>
    </div>`);

    // Insert Modals
    $('body').append(`<div class="modals" id="modals"></div>`);

    // Load event listeners
    loadEvents();
    generateSquares(settings, iconAllowDrop, iconDrop);
}

function loadEvents() {
    // On window resize change desktop grid
    $(window).resize(() =>{
        generateSquares(settings, iconAllowDrop, iconDrop);
    });
    
    // On right click open custom menu
    $(document).bind("contextmenu", (e) => {
        e.preventDefault();
    
        if($(e.target).hasClass('flex-file-space')) {
            $(".desktop-menu").finish().toggle(100).
                css({
                    top: e.pageY + "px",
                    left: e.pageX + "px"
                });
        }
    });
    
    // On mousedown hide desktop menu
    $(document).bind("mousedown", (e) => {
        if(!$(e.target).parents(".desktop-menu").length > 0)
            $(".desktop-menu").hide(100);
    });

    // Load Desktop right click menu items
    $(".desktop-menu li").click((e) => {
        const time = new Date().getTime();
        if(time - lastClickTime < 50) return;
        lastClickTime = time;
    
        switch($(e.target).attr("data-action")) {
            case "submenu": return;
            case "l-icons": {
                setIconSize(150);
                break;
            }
            case "m-icons": {
                setIconSize(100);
                break;
            }
            case "s-icons": {
                setIconSize(50);
                break;
            }
            case "newfolder": {
                const emptySpace = $('.flex-file-space:empty')[0];
                if(emptySpace) {
                    const folderEl = $('<div class="folder" draggable="true" folder-id="1"><span contenteditable="true">Folder Name</span></div>');
                    $(emptySpace).append(folderEl);
                    $(folderEl).click(onFolderClick);
                    $(folderEl).on('dragstart', iconDragStart);
                }
                else
                    alert('There is no space for a new folder!');
                break;
            }
            case "display": {
                if(!$('#displaySettingsModal').length) {
                    createModal('display');
                }
                else {
                    toggleModal('display');
                }
                break;
            }
        }
    
        $(".desktop-menu").hide(100);
    });
}

function displayLoginWindow() {
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

function loadLoginEvents() {
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
                    userinfo.id = result.id;
                    userinfo.username = result.username;

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
                    userinfo.id = result.id;
                    userinfo.username = result.username;

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