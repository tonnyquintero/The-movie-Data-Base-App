import {API_KEY} from "./secret.js";
import { headerSection, trendingPreviewSection,
    categoriesPreviewSection, genericSection,
    movieDetailSection, searchForm,
    trendingMoviesPreviewList, categoriesPreviewList,
    movieDetailCategoriesList, relatedMoviesContainer,
    headerTitle, arrowBtn, headerCategoryTitle, 
    searchFormInput, searchFormBtn, trendingBtn,
    movieDetailTitle, movieDetailDescription, movieDetailScore } from './nodes.js'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
        "language": "es-MX",
    }
});

export async function getTrendingMoviesPreview() {
    const { data } = await api('trending/tv/day?')
    const series = data.results;

    trendingMoviesPreviewList.innerHTML = '';

    series.forEach(serie => {
        
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')

        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', serie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300'
        + serie.poster_path);

        movieContainer.appendChild(movieImg)
        trendingMoviesPreviewList.appendChild(movieContainer)
    });
}

export async function getCategoriesMoviesPreview() {
    const { data } = await api('genre/tv/list?' + '&language=es')

    const categories = data.genres;

    categoriesPreviewList.innerHTML = '';

    categories.forEach(category => {
       
        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('category-container')

        const categoryTitle = document.createElement('h3')
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        const categoryTitleText = document.createTextNode(category.name)

        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryTitle)
        categoriesPreviewList.appendChild(categoryContainer)
    });
}

export async function getMoviesByCategory(id) {
    const { data } = await api('discover/tv', {
        params: {
            with_genres: id,
        }
    })
    const series = data.results;

    genericSection.innerHTML = '';

    series.forEach(serie => {
        
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')

        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', serie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300'
        + serie.poster_path);

        movieContainer.appendChild(movieImg)
        genericSection.appendChild(movieContainer)
    });
}
