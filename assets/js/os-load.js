import { loadEvents, iconAllowDrop, iconDrop } from './events.js';

let dataObj = {
    userid: null,
    username: '',
    icon_size: 100,
    bg_type: '',
    bg_style: '',
    bg_url: ''
}

const loadOS = () => {
    loadBackground();
    loadDesktopMenu();
    loadDesktop();
    loadTaskbar();
    loadModals();

    loadEvents();
    generateSquares(iconAllowDrop, iconDrop);
}

const getData = ($key) => {
    return dataObj[$key];
}
const setData = ($key, $val) => {
    if(dataObj[$key] !== undefined)
        dataObj[$key] = $val;
}

const loadBackground = () => {
    const bg_type = getData('bg_type');
    const bg_style = getData('bg_style');
    const bg_url = getData('bg_url');

    // Remove current background
    $('#desktopBackground').remove();

    // Insert background image/video
    if(bg_type == 'img')
        $('body').prepend(`<div id="desktopBackground" class="bgimage ${bg_style}"><img src="${bg_url}" alt="Background Image"></div>`);
    else
        $('body').prepend(`<div id="desktopBackground" class="bgvid ${bg_style}"><video src="${bg_url}" alt="Background Video"></div>`);
}

const loadDesktopMenu = () => {
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
}

const loadDesktop = () => {
    $('body').append(`<div class="desktop-flex" id="desktop"></div>`);
}

const loadTaskbar = () => {
    $('body').append(`<div class="taskbar" id="taskbar">
        <div class="os-logo">
            <img src="assets/img/win10logo.png" alt="OS Logo">
        </div>
    </div>`);
}

const loadModals = () => {
    $('body').append(`<div class="modals" id="modals"></div>`);
}

const generateSquares = () => {
    const icon_size = getData('icon_size');
    const width = window.innerWidth;
    const height = window.innerHeight;
    const cols = Math.floor(width / icon_size);
    const rows = Math.floor(height / icon_size);
    const squares = cols * rows;

    const desktopEl = $('#desktop');
    let squaresNum = $(desktopEl).children().length;

    if(squaresNum < squares) {
        let itemsNum = squares;
        let fileSpaceEl;

        for(let i = squaresNum; i < itemsNum; i++) {
            fileSpaceEl = $(`<div class="flex-file-space" data-desktop-pos="${i}"></div>`);
            $("#desktop").append(fileSpaceEl);
            $(fileSpaceEl).on('dragover', iconAllowDrop);
            $(fileSpaceEl).on('drop', iconDrop);
        }
    }
    else if(squaresNum > squares) {
        for(let i = squaresNum; i > squares; i--) {
            $(desktopEl).children()[i-1].remove();
        }
    }

    $('.flex-file-space').css('width', `${icon_size}px`);
    $('.flex-file-space').css('height', `${icon_size}px`);
    $('.flex-file-space').css('font-size', `${Math.floor(icon_size/6)}px`);
}

const getUserSettings = async () => {
    await $.ajax({
        url: 'inc/get_settings.php',
        type: 'post',
        contentType: false,
        processData: false,
        success: function(response){
            const result = JSON.parse(response);

            if(result.status == 'ok') {
                Object.keys(result).forEach(key => {
                    setData(key, result[key]);
                });
            }
            else {
                alert(result.message);
                location.href = location;
            }
        },
    });
}

const setIconSize = (size) => {
    setData('icon_size', size);
    generateSquares();
}

const getUserInfo = async () => {
    await $.ajax({
        url: 'inc/get_user_info.php',
        type: 'post',
        contentType: false,
        processData: false,
        success: function(response){
            const result = JSON.parse(response);

            if(result.status == 'ok') {
                setData('userid', result.id);
                setData('username', result.username);
            }
        },
    });
}

export {
    loadOS, loadBackground, loadDesktopMenu, loadDesktop, loadTaskbar, generateSquares, loadModals, getData, setData, getUserSettings, setIconSize, getUserInfo
}