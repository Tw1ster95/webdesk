import { iconAllowDrop, iconDrop, loadIcons } from './icons.js';
import { getData } from './data.js';

const loadDesktop = () => {
    $('body').append(`<div class="desktop-grid" id="desktop"></div>`);
    generateFolderGrid('#desktop');
    loadIcons(0);
}

const generateFolderGrid = (selector) => {
    const target = $(selector);

    const icon_size = getData('settings', 'icon_size');
    const width = window.innerWidth;
    const height = window.innerHeight;
    const cols = Math.floor(width / icon_size);
    const rows = Math.floor(height / icon_size);
    let fileSpaceEl;

    $(target).css({
        "grid-template-columns": `repeat(${cols}, auto)`,
        "grid-template-rows": `repeat(${rows}, auto)`
    });

    for(let r = 1; r <= rows; r++) {
        for(let c = 1; c <= cols; c++) {
            fileSpaceEl = $(`<div class="flex-file-space" data-row="${r}" data-col="${c}" style="grid-area: ${r} / ${c} / auto / auto;"></div>`);
            $("#desktop").append(fileSpaceEl);
            $(fileSpaceEl).on('dragover', iconAllowDrop);
            $(fileSpaceEl).on('drop', iconDrop);
        }
    }

    $('.flex-file-space').css('width', `${icon_size}px`);
    $('.flex-file-space').css('height', `${icon_size}px`);
    $('.flex-file-space').css('font-size', `${Math.floor(icon_size/6)}px`);
}

const updateFolderGrid = (selector) => {
    const target = $(selector);

    const icon_size = getData('settings', 'icon_size');
    const width = window.innerWidth;
    const height = window.innerHeight;
    const cols = Math.floor(width / icon_size);
    const rows = Math.floor(height / icon_size);
    let fileSpaceEl;

    const oldCols = $(target).css('grid-template-columns').split(' ').length;
    const oldRows = $(target).css('grid-template-rows').split(' ').length;

    if(cols > oldCols) {
        for(let r = 1; r <= rows; r++) {
            for(let c = oldCols; c <= cols; c++) {
                fileSpaceEl = $(`<div class="flex-file-space" data-row="${r}" data-col="${c}" style="grid-area: ${r} / ${c} / auto / auto;"></div>`);
                $("#desktop").append(fileSpaceEl);
                $(fileSpaceEl).on('dragover', iconAllowDrop);
                $(fileSpaceEl).on('drop', iconDrop);
            }
        }
    }
    else if(oldCols > cols && cols > 1) {
        for(let c = cols; c <= oldCols; c++) {
            $(target).find(`[data-col=${c}]`).remove();
        }
    }

    if(rows > oldRows) {
        for(let c = 1; c <= cols; c++) {
            for(let r = oldRows; r <= rows; r++) {
                fileSpaceEl = $(`<div class="flex-file-space" data-row="${r}" data-col="${c}" style="grid-area: ${r} / ${c} / auto / auto;"></div>`);
                $("#desktop").append(fileSpaceEl);
                $(fileSpaceEl).on('dragover', iconAllowDrop);
                $(fileSpaceEl).on('drop', iconDrop);
            }
        }
    }
    else if(oldRows > rows && rows > 1) {
        for(let r = rows; r <= oldRows; r++) {
            $(target).find(`[data-row=${r}]`).remove();
        }
    }

    $(target).css({
        "grid-template-columns": `repeat(${cols}, auto)`,
        "grid-template-rows": `repeat(${rows}, auto)`
    });

    $('.flex-file-space').css('width', `${icon_size}px`);
    $('.flex-file-space').css('height', `${icon_size}px`);
    $('.flex-file-space').css('font-size', `${Math.floor(icon_size/6)}px`);
}

export {
    loadDesktop, generateFolderGrid, updateFolderGrid
}