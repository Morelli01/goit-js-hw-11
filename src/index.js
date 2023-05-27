import { LoadMoreBtn } from './js/load-more-btn';
import { createMarkup } from './js/createMarkup';
import { ImagesApiService } from './js/ImagesApiService';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');

const imagesApiService = new ImagesApiService();

const loadMoreBtn = new LoadMoreBtn('.load-more');
loadMoreBtn.hide();

searchFormRef.addEventListener('submit', onSearch);
loadMoreBtn.button.addEventListener('click', onLoadMoreClick);

function onSearch(event) {
  event.preventDefault();

  imagesApiService.searchQuery = event.currentTarget.elements.searchQuery.value;

  imagesApiService.resetPage();
  clearPage();
  fetchImages();
}

function onLoadMoreClick() {
  imagesApiService.incrementPage();
  fetchImages();
}

function fetchImages() {
  imagesApiService.fetchImages().then(({ data }) => {
    const totalPages = Math.ceil(data.totalHits / imagesApiService.per_page);

    if (imagesApiService.searchQuery.length === 0) {
      Notiflix.Notify.failure('Please enter your search keyword.');
      return;
    }
    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    if (imagesApiService.page === totalPages) {
      loadMoreBtn.hide();
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      loadMoreBtn.show();
    }

    if (imagesApiService.page === 1) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
    const markup = createMarkup(data.hits);
    galleryRef.insertAdjacentHTML('beforeend', markup);

    const simpleLightbox = new SimpleLightbox('.gallery a');
    simpleLightbox.refresh();

    enableSmoothScrolling();
  });
}

function clearPage() {
  galleryRef.innerHTML = '';
  loadMoreBtn.hide();
}

function enableSmoothScrolling() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}