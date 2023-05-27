import { searchImages } from './js/api.js';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a');

let page = 1;
let currentSearchQuery = '';

// Після пошуку з'являється кнопка "Load More"
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchQuery = form.searchQuery.value.trim();

  if (searchQuery === '') {
    return;
  }

  if (searchQuery !== currentSearchQuery) {
    page = 1;
    gallery.innerHTML = '';
  }

  currentSearchQuery = searchQuery;

  const images = await searchImages(searchQuery, page);

  if (images.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  } else {
    images.forEach((image) => {
      const card = createImageCard(image);
      gallery.appendChild(card);
    });

    lightbox.refresh();

    if (images.length === 20 && page === 1) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
    }

    page++;
  }
});

loadMoreBtn.addEventListener('click', async () => {
  const images = await searchImages(currentSearchQuery, page);

  images.forEach((image) => {
    const card = createImageCard(image);
    gallery.appendChild(card);
  });

  lightbox.refresh();

  if (images.length === 20) {
    showLoadMoreButton();
  } else {
    hideLoadMoreButton();
    Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
  }

  page++;
});

function createImageCard(image) {
  const card = document.createElement('div');
  card.classList.add('photo-card');

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;
  img.loading = 'lazy';

  const info = document.createElement('div');
  info.classList.add('info');

  const likes = document.createElement('p');
  likes.classList.add('info-item');
  likes.innerHTML = `<b>Likes:</b> ${image.likes}`;

  const views = document.createElement('p');
  views.classList.add('info-item');
  views.innerHTML = `<b>Views:</b> ${image.views}`;

  const comments = document.createElement('p');
  comments.classList.add('info-item');
  comments.innerHTML = `<b>Comments:</b> ${image.comments}`;

  const downloads = document.createElement('p');
  downloads.classList.add('info-item');
  downloads.innerHTML = `<b>Downloads:</b> ${image.downloads}`;

  info.appendChild(likes);
  info.appendChild(views);
  info.appendChild(comments);
  info.appendChild(downloads);

  card.appendChild(img);
  card.appendChild(info);

  return card;
}

function showLoadMoreButton() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}
