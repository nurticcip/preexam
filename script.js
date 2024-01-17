// https://jsonplaceholder.typicode.com/users
let users = document.querySelector(".users");
let searchInput = document.querySelector("input");
let searchBtn = document.querySelector(".search-btn");
let searchAllCountries = document.querySelector(".all-btn");
let up = document.querySelector(".up");
let za = document.querySelector('.za')
let az = document.querySelector('.az')
let area = document.querySelector('.area')
let population = document.querySelector('.population')
let selectSort = document.querySelector('.select')
const get = document.querySelector('.get')

selectSort.addEventListener('change', (e) => {
    switch (e.target.value) {
        case 'Population':
            sortPopulate() 
            break;
        case 'A-Z':
            sortAz()
            break
        case 'Z-A':
            sortZa()
            break
        case 'Area':
            sortArea()
            break
        default:
            getCountries()
            break;
    }
})
up.addEventListener('click', () => {
    window.scroll(0, 0)
})

getCountries();
function getCountries() {
  fetch("https://restcountries.com/v3.1/all")
    .then((user) => user.json())
    .then((res) => {
      console.log(res);
      createDiv(res)
    });
}

let n = 1
get.addEventListener('click', () => {
    users.innerHTML = "";
    fetch('https://restcountries.com/v3.1/all')
        .then(flags => flags.json())
        .then(flag => {
            flag.sort((a, b) => b.population - a.population)
            flag.sort((a, b) => (a.name.common < b.name.common ? -1 : 1))
            oneFlag(flag.slice(0, n))
            n += 1
        })
})

function oneFlag(one) {
    one.map((el) => {
        let userImg = document.createElement("img");
        let countrieName = document.createElement("h3");
        let countriePopulation = document.createElement("span");
        let countrieArea = document.createElement("span");
        let div = document.createElement("div");
        userImg.src = el.flags.png;
        countrieName.innerText = el.name.common;
        countriePopulation.innerText = `population: ${el.population}`;
        countrieArea.innerText = `area: ${el.area} km²`;
        div.append(userImg);
        div.append(countrieName);
        div.append(countriePopulation);
        div.append(countrieArea);
        users.append(div)
      });
}

function getSearchCountries() {
  fetch(`https://restcountries.com/v3.1/name/${searchInput.value}`)
    .then((user) => user.json())
    .then((res) => {
      console.log(res);
      createDiv(res)
    });
  searchInput.value = "";
}
searchAllCountries.addEventListener("click", () => {
  users.innerHTML = "";
  getCountries();
});
searchBtn.addEventListener("click", () => {
  users.innerHTML = "";
  getSearchCountries();
});

searchInput.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        users.innerHTML = "";
        getSearchCountries();
    }
});

function sortPopulate() {
    users.innerHTML = "";
    fetch(`https://restcountries.com/v3.1/all`)
        .then((user) => user.json())
        .then((res) => {
          res.sort((a, b) => b.population - a.population)
          createDiv(res)
      });
}

function sortArea() {
    users.innerHTML = "";
    fetch(`https://restcountries.com/v3.1/all`)
        .then((user) => user.json())
        .then((res) => {
          res.sort((a, b) => b.area - a.area)
          createDiv(res)
      });
}

function sortAz() {
    users.innerHTML = "";
    fetch(`https://restcountries.com/v3.1/all`)
        .then((user) => user.json())
        .then((res) => {
          res.sort((a, b) => (a.name.common < b.name.common ? -1 : 1))
          createDiv(res)
      });
}
function sortZa() {
    users.innerHTML = "";
    fetch(`https://restcountries.com/v3.1/all`)
        .then((user) => user.json())
        .then((res) => {
          res.sort((a, b) => (b.name.common < a.name.common ? -1 : 1))
          createDiv(res)
      });
}
  
function createDiv(res) {
    res.map((el) => {
        let userImg = document.createElement("img");
        let countrieName = document.createElement("h3");
        let countriePopulation = document.createElement("span");
        let countrieArea = document.createElement("span");
        let div = document.createElement("div");
        userImg.src = el.flags.png;
        countrieName.innerText = el.name.common;
        countriePopulation.innerText = `population: ${el.population}`;
        countrieArea.innerText = `area: ${el.area} km²`;
        div.append(userImg);
        div.append(countrieName);
        div.append(countriePopulation);
        div.append(countrieArea);
        users.append(div);
      });
}