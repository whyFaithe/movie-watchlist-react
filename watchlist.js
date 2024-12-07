
//import { addToWatchList, removeFromWatchList } from './index.js'
const infoContainer = document.getElementById("info-container")
infoContainer.innerHTML = `<div class="result-placeholder">
                                <p>Loading Your Watch List...</p>
                            </div>`
watchListRender()
            
async function watchListRender(){
    const watchList = await fetchFilmData()
    
    let tempHtml = ``  
    if(Array.isArray(watchList) && watchList.length > 0){
        for(const film of watchList){
            tempHtml += `
            <div class="film-block">  
                <img src="${film.poster}">
                <div>
                    <div class="film-block-row film-block-title">
                        <h3>${film.title}</h3>
                        <div class="rating-block">
                            <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                            <p>${film.imdbRating}</p>
                        </div>
                    </div>
                    <div class="film-block-row info-block">
                        <p>${film.runtime}</p>
                        <p>${film.genre}</p>
                        <button data-add="${film.imdbID}" class="watch-list ${film.isAdded ? "hidden":""}">
                            <i class="fa-solid fa-circle-plus"></i>
                            WatchList
                        </button>
                        <button data-remove="${film.imdbID}" class="watch-list ${!film.isAdded ? "hidden":""}">
                            <i class="fa-solid fa-circle-minus"></i>
                            Remove
                        </button>
                    </div>
                    <div class="film-block-row">
                        <p>${film.plot}</p>
                    </div>
                </div>
            </div>
            `
        }    
    }else {
        tempHtml = `
            <div class="result-placeholder">
                <p>Your watchlist is looking a little empty...</p>
                <a href="/index.html" class="subtext">
                    <i class="fa-solid fa-circle-plus"></i>
                    Let's add some movies!
                </a>
            </div>`
    }
    infoContainer.innerHTML = tempHtml
    //attachEventListeners()
    
}

async function fetchFilmData() {  
    const watchListIDs = await checkForWatchListArray()
    let movieData = watchListIDs.map(ID => 
            fetch(`https://www.omdbapi.com/?apikey=1fc5a7d3&plot&type=movie&i=${ID}`)
                .then(res => res.json())
                //console.log(data)
                .then(data => ({
                    title:data.Title,
                    poster: data.Poster.includes("http") ? data.Poster : "/images/No_image.jpg",
                    plot: data.Plot,
                    imdbRating: data.imdbRating,
                    imdbID: data.imdbID,
                    runtime: data.Runtime,
                    genre: data.Genre,
                    ratings: data.Ratings,
                    isAdded: watchListIDs.includes(data.imdbID) ? true : false
                }))
    )     
    return Promise.all(movieData)
}


function checkForWatchListArray(){
    //returns array -- either empty or full movie objects
    if( localStorage.getItem("myWatchlistIDs")){
        return  JSON.parse(localStorage.getItem("myWatchlistIDs"))
    } else {
        return []
    }
}
function addToWatchList(imdbID){
    const watchListIDArray = checkForWatchListArray()
    //if watchlist DOES NOT have movie in it already
    if(!watchListIDArray.includes(imdbID)){
        //send object to local storage
        watchListIDArray.unshift(imdbID)
        localStorage.setItem("myWatchlistIDs", JSON.stringify(watchListIDArray))
    }
}
function removeFromWatchList(filmID){
    let watchListIDArray = checkForWatchListArray()
    watchListIDArray = watchListIDArray.filter((ID) => {
        return ID !== filmID
    })
    localStorage.setItem("myWatchlistIDs", JSON.stringify(watchListIDArray))
}

infoContainer.addEventListener('click', async function(e){
    let imdbID = e.target.dataset.add || e.target.dataset.remove
    if(e.target.dataset.add){
        addToWatchList(imdbID)
    } else if(e.target.dataset.remove){
        removeFromWatchList(imdbID)
    }
    watchListRender()
})

