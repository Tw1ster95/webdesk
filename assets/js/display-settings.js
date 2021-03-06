import { setData, getData, getUserSettings, saveUserSettings } from "./data.js";
import { checkFileExists } from './utils.js';
import { displayQuickMessage } from './popups.js';

const addDisplayModalItems = (target) => {
    const table = $(`<table class="settings-table"></table>`);
    
    $(table).append(`<tr><td>Window Top Color</td><td><input type="color" value="${getData('settings', 'modal_top_color')}" id="windowTopColorSetting"></td></tr>`);

    $(table).append(`<tr><td>Window Top Text Color</td><td><input type="color" value="${getData('settings', 'modal_top_text_color')}" id="windowTopTextColorSetting"></td></tr>`);

    $(table).append(`<tr><td>Taskbar Color</td><td><input type="color" value="${getData('settings', 'taskbar_color')}" id="taskbarColorSetting"></td></tr>`);

    $(table).append(`<tr><td>Background</td><td><input type="text" value="${getData('settings', 'bg_url')}" id="backgroundSetting"></td></tr>`);

    const bgType = getData('settings', 'bg_style');
    $(table).append(`<tr><td>Background Style</td><td><select id="bgStyleSetting">
        <option ${(bgType == 'contain' ? 'selected' : '')} value="contain">Contain</option>
        <option ${(bgType == 'fill' ? 'selected' : '')} value="fill">Fill</option>
        <option ${(bgType == 'cover' ? 'selected' : '')} value="cover">Cover</option>
        <option ${(bgType == 'revert' ? 'selected' : '')} value="revert">Revert</option>
    </select></td><tr>`);

    $(target).find('.main').append(table);

    $(target).find('.main').append(`<div class="buttons-container">
        <button id="saveDisplaySettings" disabled>Save</button>
        <button id="resetDisplaySettings" disabled>Reset</button>
    </div>`);

    $('#windowTopColorSetting').on('input', (e) => {
        setData('settings', 'modal_top_color', e.currentTarget.value);
        toggleDisableDisplaySettingButtons(false);
    });
    $('#windowTopTextColorSetting').on('input', (e) => {
        setData('settings', 'modal_top_text_color', e.currentTarget.value);
        toggleDisableDisplaySettingButtons(false);
    });
    $('#taskbarColorSetting').on('input', (e) => {
        setData('settings', 'taskbar_color', e.currentTarget.value);
        toggleDisableDisplaySettingButtons(false);
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
                    setData('settings', 'bg_type', 'img');
                    setData('settings', 'bg_url', val);
                    break;
                }
                case 'mp4':
                case 'avi': {
                    setData('settings', 'bg_type', 'vid');
                    setData('settings', 'bg_url', val);
                    break;
                }
                default: {
                    displayQuickMessage('Invalid file type provided.');
                    break;
                }
            }
        }
        else {
            e.currentTarget.value = getData('settings', 'bg_url');
            displayQuickMessage('Url to file is invalid.');
        }
        toggleDisableDisplaySettingButtons(false);
    });
    $('#bgStyleSetting').change((e) => {
        setData('settings', 'bg_style', e.currentTarget.value);
        toggleDisableDisplaySettingButtons(false);
    });
    $('#saveDisplaySettings').click((e) => {
        saveUserSettings();
        toggleDisableDisplaySettingButtons(true);
    });
    $('#resetDisplaySettings').click((e) => {
        getUserSettings(true);
        toggleDisableDisplaySettingButtons(true);
    });
}

const toggleDisableDisplaySettingButtons = (toggle) => {
    $('#saveDisplaySettings, #resetDisplaySettings').prop('disabled', toggle);
}

export {
    addDisplayModalItems, toggleDisableDisplaySettingButtons
}