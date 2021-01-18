var mov_title = localStorage.getItem("mov_title");
var mov_year = localStorage.getItem("mov_year");
var nom_list = [];
var nom_year = [];
if(JSON.parse(localStorage.getItem("nom_title")) != null){
    nom_list = JSON.parse(localStorage.getItem("nom_title"));
    nom_year = JSON.parse(localStorage.getItem("nom_year"));
}
if(nom_list.length == 5){
    var banner = document.getElementById("banner");
    banner.innerHTML = "Five Movies Have been Nominated!";
    banner.classList.add("full");
}

var plot = document.querySelector(".movie-plot");
var image = document.querySelector(".mov-img");
var cast = document.querySelector(".m-staring");
var director = document.querySelector(".m-director");
var title = document.querySelector(".m-title");
var btn = document.querySelector("button");

    fetch(`http://omdbapi.com/?t=${mov_title}&y=${mov_year}&plot=full&apikey=3da543c7`)
    .then(response => response.json())
    .then(data => {
        plot.innerHTML = "<b>Plot: </b>"+ data["Plot"];
        image.src = data["Poster"];
        cast.innerHTML = "<b>Staring: </b>"+ data["Actors"];
        director.innerHTML = "<b>Directed By: </b>"+ data["Director"];
        title.innerHTML = "</b>"+data["Title"]+"</b> (" + data["Year"] + ")";
        console.log(nom_list);
        console.log(mov_title);
        console.log(nom_list)
        nom_list.forEach(element => {
            if (mov_title == element || nom_list.length >= 5){
                btn.classList.add("active");
                btn.disabled = true;
                btn.innerHTML = "Unable to Nominate"
            } else{
                btn.disabled = false;
                btn.innerHTML = "Nominate";
                btn.classList.remove("active");
            }    
        })
        btn.onclick = () => {
            console.log(mov_title);
            btn.disabled = false;
            btn.innerHTML = "Nominate";
            btn.classList.remove("active");
            nom_list.push(mov_title);
            nom_year.push(mov_year);
            localStorage.setItem("nom_title",JSON.stringify(nom_list));
            localStorage.setItem("nom_year",JSON.stringify(nom_year));
            btn.classList.add("added");
            btn.disabled = true;
            btn.innerHTML = "Nominated"
        }
        if(nom_list.length == 5){
            var banner = document.getElementById("banner");
            banner.innerHTML = "Five Movies Have been Nominated!";
            banner.classList.add("full");
        }
    })
    .catch(err => console.log("please enter a valid movie title"))