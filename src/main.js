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

// utils 

function createSeries(series, container) {
    container.innerHTML = '';

    series.forEach(serie => {
        
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + serie.id;
        })

        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', serie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300'
        + serie.poster_path);

        movieContainer.appendChild(movieImg)
        container.appendChild(movieContainer)
    });
}

function createCategories(categories, container) {
    container.innerHTML = '';

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
        container.appendChild(categoryContainer)
    });
}

//llamados a la api

export async function getTrendingMoviesPreview() {
    const { data } = await api('trending/tv/day?')
    const series = data.results;
    console.log(series);

    createSeries(series, trendingMoviesPreviewList);
}

export async function getCategoriesMoviesPreview() {
    const { data } = await api('genre/tv/list?' + '&language=es')

    const categories = data.genres;

    createCategories(categories, categoriesPreviewList);

}

export async function getMoviesByCategory(id) {
    const { data } = await api('discover/tv', {
        params: {
            with_genres: id,
        }
    })
    const series = data.results;

    createSeries(series, genericSection)
}

export async function getMoviesBySearch(query) {
    const { data } = await api('search/tv', {
        params: {
            query,
        }
    })
    const series = data.results;

    createSeries(series, genericSection);
}

export async function getTrendingSeries() {
    const { data } = await api('trending/tv/day?')
    const series = data.results;

    createSeries(series, genericSection);
}

export async function getMovieById(id) {
    const { data: serie } = await api('tv/' + id);

    const serieImgUrl = 'https://image.tmdb.org/t/p/w500'
     + serie.poster_path;
     headerSection.style.background = `
     linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
        ),
     url(${serieImgUrl})`;

    movieDetailTitle.textContent = serie.name;
    movieDetailDescription.textContent = serie.overview;
    movieDetailCategoriesList.textContent = serie.vote_average;

    createCategories(serie.genres, movieDetailCategoriesList);

    getRelatedMoviesById(id)
}

async function getRelatedMoviesById(id) {
    const { data } = await api(`tv/${id}/similar`);
    const SimilarSerie = data.results;

    createSeries(SimilarSerie, relatedMoviesContainer);
    relatedMoviesContainer.scrollTo(0, 0);
}

