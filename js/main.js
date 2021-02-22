        /* variables */

const form = document.querySelector('.searchform');

const input = document.querySelector('.main-search');
const searchBtn = document.querySelector('.main-btn');

        /* events */
searchBtn.addEventListener('click',searchWiki);
form.addEventListener('submit', searchWiki);

        /* functions */

/* Search Wiki function */
function searchWiki(event){
    event.preventDefault(); 
    showGif('show');
    let searchValue = input.value;
    updateSearch(searchValue)
    .then(displayData)
    .catch(function(error){
        console.log(error);
        showGif('hide');
    });
}

/* function for gettimg the response using API  */

const updateSearch = async(searchValue)=>{
    const base = 'https://en.wikipedia.org';
    const query = `/w/api.php?action=query&origin=*&format=json&list=search&srsearch=${searchValue}`;
    const response  = await fetch(base+query);
    const data = await response.json();
    return data;
}
/* function for Show/Hide Gif */
function showGif(value){
    if(value === 'show'){
        document.querySelector('.wait-icon').classList.add('show');
    }
    else if(value === 'hide'){
        document.querySelector('.wait-icon').classList.remove('show');
    }
} 

/* function for updating the UI part */
function displayData(data){
    //console.log(data);
    
    showGif('hide');
    let result = data.query.search;
    //console.log(result)
    let output = '';
    result.forEach(function(item){
        output += `<li class="searchItem">
        <h2 class="searchItem-title">${item.title}</h2>
        <p class="searchItem-text">${item.snippet}</p>
        <a href="http://en.wikipedia.org/?curid=${item.pageid}" class="searchItem-link" target="_blank">Read More</a>
    </li>`;
    });
    document.querySelector('.results').innerHTML = output;
}

        /*  funtion for Adding a google translate to the page  */

function googleTranslateElementInit(){
    new google.translate.TranslateElement({pageLanguage:'en'},'google_translate_element');
}
