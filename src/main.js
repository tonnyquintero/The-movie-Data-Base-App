import {API_KEY} from "./secret.js";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
        "language": "es-ES",
    }
});

async function getTrendingMoviesPreview() {
    const { data } = await api('trending/tv/day?')
    const series = data.results;

    series.forEach(serie => {
        const trendingPreviewMoviesContainer = document.querySelector
        ('#trendingPreview .trendingPreview-movieList')

        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')

        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', serie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300'
        + serie.poster_path);

        movieContainer.appendChild(movieImg)
        trendingPreviewMoviesContainer.appendChild(movieContainer)
    });
}

async function getCategoriesMoviesPreview() {
    const { data } = await api('genre/tv/list?' + '&language=es')

    const categories = data.genres;

    categories.forEach(category => {
        const previewCategoriesContainer = document.querySelector
        ('#categoriesPreview .categoriesPreview-list')

        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('category-container')

        const categoryTitle = document.createElement('h3')
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        const categoryTitleText = document.createTextNode(category.name)

        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryTitle)
        previewCategoriesContainer.appendChild(categoryContainer)
    });
}

getTrendingMoviesPreview();
getCategoriesMoviesPreview()