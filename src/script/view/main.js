//api key
const KeyAPI = 'api_key=bc1b8bb0f0ecf13c5063877695075b3a';
const BaseURL = 'https://api.themoviedb.org/3/';
const UrlAPI =  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bc1b8bb0f0ecf13c5063877695075b3a';
const UrlGambar =  'https://image.tmdb.org/t/p/w500/';
const CariFilmAPI =  'https://api.themoviedb.org/3/search/movie?api_key=bc1b8bb0f0ecf13c5063877695075b3a&query="';
const main = document.getElementById('main');
const form = document.getElementById('form-search');
const Cari = document.getElementById('search-title');
const TagGenre = document.getElementById('genre-tag');

//data genre film dari api
const genreMovie= [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
]

/*custom element webname*/
class WelcomeMessage extends HTMLElement {
  connectedCallback(){
      const webname = "VFMovies";
      this.innerHTML = `<h1>${webname}</h1>`;
  }
}
customElements.define('web-name',WelcomeMessage);

//memunculkan film sesuai genre
let GenreDipilih = [];
let aturGenre;
aturGenre = () => {
    TagGenre.innerHTML = '';
    genreMovie.forEach(genre => {
        const x = document.createElement('div');
        x.classList.add('tag');
        x.id = genre.id;
        x.innerText = genre.name;
        x.addEventListener('click', () => {
            if (GenreDipilih.length == 0) {
                GenreDipilih.push(genre.id);
            } else {
                if (GenreDipilih.includes(genre.id)) {
                    GenreDipilih.forEach((id, idx) => {
                        if (id == genre.id) {
                            GenreDipilih.splice(idx, 1);
                        }
                    })
                } else {
                    GenreDipilih.push(genre.id);
                }
            }
            console.log(GenreDipilih);
            dapatFilm(`${UrlAPI}&with_genres=${encodeURI(GenreDipilih.join(','))}`);
            SudahDiklik();
        })
        TagGenre.append(x);
    })
};
aturGenre();

/*memberikan warna sebagai tanda ke genre yang diklik*/
let SudahDiklik;
SudahDiklik = () => {
  const tagsmovie= document.querySelectorAll('.tag');
  tagsmovie.forEach(tag => {
      tag.classList.remove('highlight');
  })
  if(GenreDipilih.length !=0){
      GenreDipilih.forEach(id => {
          const TagSudahDiklik = document.getElementById(id);
          TagSudahDiklik.classList.add('highlight');
      })
  }
}


/*mendapat data film*/
let dapatFilm;
dapatFilm = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    if(data.results.length !== 0){
    tampilkanFilm(data.results);
    } else {
      main.innerHTML = `<h1>Film Tidak Ditemukan</h1>`;
    }
  }
dapatFilm(UrlAPI);


/*menampilkan film*/
let tampilkanFilm;
tampilkanFilm = (data) => {
    main.innerHTML='';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML =` 
         <img src="${UrlGambar+poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class=rating>${vote_average}</span>
        </div>

        <div class="overview">
            <h3>Deskripsi</h3>
            ${overview}
        </div> 
        `;
        main.appendChild(movieElement);
    });
}

  /*searchbar*/
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const NilaiSearch = Cari.value;
    GenreDipilih = [];
    aturGenre();
    if (NilaiSearch && NilaiSearch !== '') {
      dapatFilm(CariFilmAPI + NilaiSearch);
      Cari.value = '';
    } else {
      window.location.reload();
    }
});


