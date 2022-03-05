import { loadOS, generateSquares, getData, setData, getUserSettings, getUserInfo } from './os-load.js';
import { displayLoginWindow } from './login-window.js';

// Add loading screen and wait cursor to page
$('body').css('cursor', 'wait');

// Load os on window load
$(window).on('load', async () => {
    await getUserInfo();

    if(getData('userid')) {
        await getUserSettings();
        loadOS();
    }
    else
        displayLoginWindow();

    $('body').css('cursor', 'auto');
    $('#loadingScreen').remove();
});

// On window resize change desktop grid
$(window).resize(() => {
    if(getData('userid'))
        generateSquares();
});