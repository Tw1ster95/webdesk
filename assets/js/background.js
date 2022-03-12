import { getData } from './data.js';

const loadBackground = () => {
    const bg_type = getData('settings', 'bg_type');
    const bg_style = getData('settings', 'bg_style');
    const bg_url = getData('settings', 'bg_url');

    // Remove current background
    $('#desktopBackground').empty();

    // Insert background image/video
    $('#desktopBackground').append(
        (bg_type == 'img') ?
        $(`<img class="${bg_style}" src="${bg_url}" alt="Background Image">`) :
        $(`<video class="${bg_style}" muted autoplay loop src="${bg_url}" alt="Background Video">`)
    );
}

export {
    loadBackground
}