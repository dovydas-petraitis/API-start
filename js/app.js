document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(document.querySelector('input').value)}&apikey=18c1a865`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Klaida: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.Title) {
        showMovie(data);
    }else{
        showError(data);
    }
})
    
});


const showMovie = (data)=> {
    document.querySelector('.title').textContent = data.Title;
    document.querySelector('.time').textContent = data.Runtime;
    document.querySelector('.director').textContent = data.Director;
    document.querySelector('.year').textContent = data.Year;
    document.querySelector('.imdb').textContent = data.imdbRating;
    document.querySelector('.poster').src = data.Poster;
    document.querySelector('.other').textContent = data.Plot;
}

const showError = (data)=>{
    document.querySelector('table').style.display='none';
    document.querySelector('.alert').style.display='block';
    document.querySelector('.alert-danger').textContent= data.Error;
}



fetch('https://api.meteo.lt/v1/places')
.then(response => response.json())
.then(data => {
    // Gauti vietovių sąrašą
    const places = data.map(place => place.name);

    // Surasti dataList elementą
    const dataList = document.getElementById('places');

    // Įterpti vietoves į dataList
    places.forEach(place => {
        const option = document.createElement('option');
        option.value = place;
        dataList.appendChild(option);
    });
})
.catch(error => console.error('Klaida gaudant duomenis iš API:', error));
