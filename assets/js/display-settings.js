import { setData, getData, getUserSettings } from "./data.js";
import { checkFileExists } from './utils.js';

const addDisplayModalItems = (target) => {
    const table = $(`<table class="settings-table"></table>`);
    
    $(table).append(`<tr><td>Window Top Color</td><td><input type="color" value="${getData('modal_top_color')}" id="windowTopColorSetting"></td></tr>`);

    $(table).append(`<tr><td>Taskbar Color</td><td><input type="color" value="${getData('taskbar_color')}" id="taskbarColorSetting"></td></tr>`);

    $(table).append(`<tr><td>Background</td><td><input type="text" value="${getData('bg_url')}" id="backgroundSetting"></td></tr>`);

    const bgType = getData('bg_style');
    $(table).append(`<tr><td>Background Style</td><td><select id="bgStyleSetting">
        <option ${(bgType == 'contain' ? 'selected' : '')} value="contain">Contain</option>
        <option ${(bgType == 'fill' ? 'selected' : '')} value="fill">Fill</option>
        <option ${(bgType == 'cover' ? 'selected' : '')} value="cover">Cover</option>
        <option ${(bgType == 'revert' ? 'selected' : '')} value="revert">Revert</option>
    </select></td><tr>`);


    $(target).find('.main').append(table);

    $(target).find('.main').append(`<div class="buttons-container">
        <button id="saveDisplaySettings">Save</button>
        <button id="resetDisplaySettings">Reset</button>
    </div>`);

    $('#windowTopColorSetting').on('input', (e) => {
        setData('modal_top_color', e.currentTarget.value);
    });
    $('#taskbarColorSetting').on('input', (e) => {
        setData('taskbar_color', e.currentTarget.value);
    });
    $('#backgroundSetting').change(async (e) => {
        const val = e.currentTarget.value;
        if(await checkFileExists(val)) {
            const arrVal = val.split('.');
            const filetype = arrVal[arrVal.length - 1].toLowerCase();
            switch(filetype) {
                case 'jpg':
                case 'png':
                case 'gif':
                case 'jpeg': {
                    setData('bg_type', 'img');
                    setData('bg_url', val);
                    break;
                }
                case 'mp4':
                case 'avi': {
                    setData('bg_type', 'vid');
                    setData('bg_url', val);
                    break;
                }
                default: {
                    alert('Invalid file type provided.');
                    break;
                }
            }
        }
        else {
            e.currentTarget.value = getData('bg_url');
            alert('Url to file is invalid.');
        }
    });
    $('#bgStyleSetting').change((e) => {
        setData('bg_style', e.currentTarget.value);
    });
    $('#resetDisplaySettings').click((e) => {
        getUserSettings();
    });
}

export {
    addDisplayModalItems
}