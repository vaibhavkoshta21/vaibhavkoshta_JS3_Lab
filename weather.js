const api = {
    key:"7e3f21edee540e6110af347b55eb1ab2",
    base:"https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResult(searchBox.value);
    }
}

function getResult(query){
    const url = `${api.base}weather?q=${query}&units=metric&appid=${api.key}`;
    fetch(url).then(weather => {
        return weather.json();
    }).then(response =>{
       displayResults(response); 
    });

}

function displayResults(weather){
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    
    let d = new Date
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(d);

    let temp = document.querySelector('.current .temp');
    temp.innerText = `${Math.round(weather.main.temp)}°c`;

    let weather_m = document.querySelector('.current .Weather');
    weather_m.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.current .hi-low');
    hilow.innerText = `${Main.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(D){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octoer", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[D.getDay()];
    let date = D.getDate();
    let month = months[D.getMonth()]
    let year = D.getFullYear();

    return `${day} ${date} ${month} ${year}`
}
