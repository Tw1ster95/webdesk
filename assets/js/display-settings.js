import { setData, getData } from "./data.js";
import { checkFileExists } from './utils.js';

const addDisplayModalItems = (target) => {
    const table = $(`<table class="settings-table"></table>`);
    let tr = $(`<tr></tr>`);

    insertTd(tr, 'Window Top Color');
    const modalTopColorSetting = $(`<input type="color"
    value="${getData('modal_top_color')}">`);
    insertTd(tr, modalTopColorSetting);
    $(table).append(tr);

    tr = $(`<tr></tr>`);

    insertTd(tr, 'Taskbar Color');
    const taskbarColorSetting = $(`<input type="color"
    value="${getData('taskbar_color')}">`);
    insertTd(tr, taskbarColorSetting);
    $(table).append(tr);

    tr = $(`<tr></tr>`);

    insertTd(tr, 'Background');
    const backgroundSetting = $(`<input type="text"
    value="${getData('bg_url')}">`);
    insertTd(tr, backgroundSetting);
    $(table).append(tr);

    tr = $(`<tr></tr>`);

    insertTd(tr, 'Background Style');
    const bgStyleSetting = $(`<select></select>`);
    const bgType = getData('bg_style');
    $(bgStyleSetting).append(`<option ${(bgType == 'contain' ? 'selected' : '')} value="contain">Contain</option>`);
    $(bgStyleSetting).append(`<option ${(bgType == 'fill' ? 'selected' : '')} value="fill">Fill</option>`);
    $(bgStyleSetting).append(`<option ${(bgType == 'cover' ? 'selected' : '')} value="cover">Cover</option>`);
    $(bgStyleSetting).append(`<option ${(bgType == 'revert' ? 'selected' : '')} value="revert">Revert</option>`);
    insertTd(tr, bgStyleSetting);
    $(table).append(tr);


    $(target).find('.main').append(table);

    $(modalTopColorSetting).on('input', (e) => {
        setData('modal_top_color', e.currentTarget.value);
    });
    $(taskbarColorSetting).on('input', (e) => {
        setData('taskbar_color', e.currentTarget.value);
    });
    $(backgroundSetting).change(async (e) => {
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
    $(bgStyleSetting).change((e) => {
        setData('bg_style', e.currentTarget.value);
    });
}

const insertTd = (tr, el, span = 1) => {
    const td = $(`<td colspan="${span}"></td>`);
    $(td).append(el);
    $(tr).append(td);
}

export {
    addDisplayModalItems
}