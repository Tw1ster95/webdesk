import { updateImageUrl } from "./data.js";

const askForImageUrl = ({ id, name }) => {
    let el = $(`.img-url-ask-modal[for-icon-id="${id}"]`);
    if(el.length == 0) {
        el = $(`<div class="img-url-ask-modal" for-icon-id="${id}">
            <label for="img${id}UrlInput">Paste a URL for the image you want to import to <span>${name}</span>.</label>
            <input type="text" id="img${id}UrlInput"></input>
            <button type="button">Close</button>
        </div>`);
        $('body').append(el);

        $(el).find('button').click((e) => {
            $(el).remove();
        });
        $(`#img${id}UrlInput`).change(async (e) => {
            const url = $(`#img${id}UrlInput`).val();
            if((await updateImageUrl({
                id: id,
                url: url
            }))) {
                console.log($(`.icon[icon-id="${id}"]`));
                
                $(`.icon[icon-id="${id}"]`).css({
                    'background-image': `url(${url})`
                });
                $(el).remove();
            }
        });
    }
}

const displayQuickMessage = (message) => {
    let el = $('#quickMsgBlock');
    if(el.length == 0) {
        el = $(`<div id="quickMsgBlock" class="quick-msg-block" style="display: none;">${message}</div>`);
        $('body').append(el);
    }
    else
        $(el).stop().hide().text(message);
    
    $(el).show(100).delay(2500).fadeOut();
}

export {
    askForImageUrl, displayQuickMessage
}