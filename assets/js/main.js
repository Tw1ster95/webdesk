import { loadOS, generateSquares, startLoading, endLoading } from './os-load.js';
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
});

// On window resize change desktop grid
$(window).resize(() => {
    if(getData('userid'))
        generateSquares();
});