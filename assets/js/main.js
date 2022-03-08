// Add loading screen and wait cursor to page
$('body').css('cursor', 'wait');

import { loadOS, generateSquares } from './os-load.js';
import { displayLoginModal } from './login-modal.js';
import { getUserInfo, getData, getUserSettings } from './data.js';

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