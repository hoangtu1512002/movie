
import axios from 'axios';

export const apiKey = '8712e8c17441c701fbc30bb822616eef';

export const imageConfig = {
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
}

export default axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        'content-type': 'application/json',
    },
});