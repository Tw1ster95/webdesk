import { iconAllowDrop, iconDrop } from '../js/events.js';

const loadBackground = (settings) => {
    // Remove current background
    $('#desktopBackground').remove();

    // Insert background image/video
    if(settings.bg_type == 'img')
        $('body').append(`<div id="desktopBackground" class="bgimage ${settings.bg_style}"><img src="${settings.bg_url}" alt="Background Image"></div>`);
    else
        $('body').append(`<div id="desktopBackground" class="bgvid ${settings.bg_style}"><video src="${settings.bg_url}" alt="Background Video"></div>`);
}

const generateSquares = (settings) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const cols = Math.floor(width / settings.icon_size);
    const rows = Math.floor(height / settings.icon_size);
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

    $('.flex-file-space').css('width', `${settings.icon_size}px`);
    $('.flex-file-space').css('height', `${settings.icon_size}px`);
    $('.flex-file-space').css('font-size', `${Math.floor(settings.icon_size/6)}px`);
}

export {
    loadBackground, generateSquares
}