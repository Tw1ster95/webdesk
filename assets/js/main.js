import { loadOS, generateSquares, getUserSettings } from './os-load.js';
import { displayLoginModal } from './login-modal.js';
import { getUserInfo, getData } from './data.js';

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
        displayLoginModal();

    $('body').css('cursor', 'auto');
    $('#loadingScreen').remove();
});

// On window resize change desktop grid
$(window).resize(() => {
    if(getData('userid'))
        generateSquares();
});