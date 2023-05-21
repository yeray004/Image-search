const accessKey = '85KCCrY4Ao3hRNWjY4Fym2bidrWMj1NCCuhDwY0eBUU';

const formEl = document.querySelector('form');
const searchImputEl = document.getElementById('search-id');
const searchResultsEl = document.querySelector('.search-results');
const showMore = document.getElementById('show-more');

let inputData = '';
let page = 1;

async function searchImages(){
    inputData = searchImputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    const res = await fetch(url);
    const resJSON = await res.json();
    const results = resJSON.results;

    if(page === 1){
        searchResultsEl.innerHTML = '';
    }

    results.map((result)=>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search-result');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResultsEl.appendChild(imageWrapper);
    })

    page++;

    if(page > 1){
        showMore.style.display = 'block';
    }
}

formEl.addEventListener('submit', (e)=>{
    e.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener('click', ()=>{
    searchImages();
})