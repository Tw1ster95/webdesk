import { displayLoginModal } from './login-modal.js';
import { getUserInfo, getData, getUserSettings, loadWebsiteData } from './data.js';
import { updateFolderGrid, loadDesktop } from './desktop.js';
import { loadRightClickMenu } from './rightclick-menu.js';
import { loadTaskbar } from './taskbar.js';
import { loadModals } from './modal.js';
import { loadBackground } from './background.js';

const loadOS = () => {
    loadBackground();
    loadRightClickMenu();
    loadDesktop();
    loadTaskbar();
    loadModals();
}

// Load os on window load
$(window).on('load', async () => {
    await getUserInfo();

    if(getData('user', 'userid')) {
        await loadWebsiteData();
        await getUserSettings();
        
        loadOS();
    }
    else
        displayLoginModal();
});

// On window resize change desktop grid
$(window).resize(() => {
    if(getData('user', 'userid'))
        updateFolderGrid('#desktop');
});

export {
    loadOS
}