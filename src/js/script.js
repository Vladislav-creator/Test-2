import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './fetchImages';
import axios from "axios";
import { renderGallery } from './renderGallery';
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
    return Promise.reject(error);
  },
);


const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
export {gallery}
let query = '';
let page = 1;
// let simpleLightBox;
const perPage = 30;

searchForm.addEventListener('submit', onSearchForm);




function onSearchForm(e) {
  e.preventDefault();
//   window.removeEventListener('scroll', showLoadMorePage);
  page = 1;
  query = e.currentTarget.elements.searchQuery.value.trim();
  gallery.innerHTML = '';

  if (query === '') {
    Notiflix.Notify.failure(
      'The search string cannot be empty. Please specify your search query.',
    );
    return;
  }

  fetchImages(query, page, perPage)
    .then(resp=> {
      if (resp.results === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
      } else {
        renderGallery(resp.results);
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        Notiflix.Notify.success(`Hooray! We found ${resp.total} images.`);
        if (perPage < resp.total) {
        //   window.addEventListener('scroll', showLoadMorePage);
          // Додати подію на прокручування сторінки, яка викликає функцію showLoadMorePage
        }
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      searchForm.reset();
    });
}

function onloadMore() {
  page += 1;
  simpleLightBox.destroy();
  // simpleLightBox.refresh();

  fetchImages(query, page, perPage)
    .then(resp => {
      renderGallery(resp.results);
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();

      if (page >= resp.total_pages) {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results.",
        );
        window.removeEventListener('scroll', showLoadMorePage);
      }
    })
    .catch(error => console.log(error));
     // Цей код дозволяє автоматично прокручувати сторінку на висоту 2 карток галереї, коли вона завантажується
     const { height: cardHeight } = document
     .querySelector('.gallery')
     .firstElementChild.getBoundingClientRect();

     window.scrollBy({
     top: cardHeight * 2,
     behavior: 'smooth',
     });
}

function checkIfEndOfPage() {
  return (
    window.innerHeight + window.pageYOffset >=
    document.documentElement.scrollHeight
  );
}

// Функція, яка виконуеться, якщо користувач дійшов до кінця сторінки
function showLoadMorePage() {
  if (checkIfEndOfPage()) {
    onloadMore();
  }
}

// Додати подію на прокручування сторінки, яка викликає функцію showLoadMorePage
window.addEventListener('scroll', showLoadMorePage);

// кнопка “вгору”->
arrowTop.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // після scrollTo відбудеться подія "scroll", тому стрілка автоматично сховається
};

window.addEventListener('scroll', function () {
  arrowTop.hidden = scrollY < document.documentElement.clientHeight;
});