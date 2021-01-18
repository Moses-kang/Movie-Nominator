var nom_list = [];
var nom_year = [];
var movies = [];
var new_nom =[];
var new_year = [];
var suggest = document.querySelector(".true-list");

if(JSON.parse(localStorage.getItem("nom_title")) != null){
    nom_list = JSON.parse(localStorage.getItem("nom_title"));
    nom_year = JSON.parse(localStorage.getItem("nom_year"));
}
if(nom_list.length == 5){
    var banner = document.getElementById("banner");
    banner.innerHTML = "Five Movies Have been Nominated!";
    banner.classList.add("full");
}

//checking if there is at least one nomination already selected
const tempText = document.getElementById('nom-checker');
if (nom_list.length > 0){
    tempText.innerHTML = "";
    var j = 0;
    for(var i = 0; i < nom_list.length; i++){
        fetch(`http://omdbapi.com/?t=${nom_list[i]}&y=${nom_year[i]}&plot=full&apikey=3da543c7`)
        .then(response => response.json())
        .then(data => {
            movies.push("<li><img src="+data["Poster"]+" alt='image' class='movie-image'>" + data["Title"]+ " " + data["Year"] + "<span class='delete fa fa-trash-o' onclick='deleteBtn(this,"+j+")'></span></li> ");
            j++;
            new_nom.push(data["Title"]);
            new_year.push(data["Year"]);
            if(i == nom_list.length){
                show_suggestions(movies);
                
            }
        })
        .catch(err => console.log("please enter a valid movie title"));
    }
} else {tempText.innerHTML = "Add a nomination to begin!";}

function show_suggestions(list){
    let listData;
    if(!list.length){
    }
    else{
        listData = list.join('');
        suggest.innerHTML = listData;  
    }
}

//script for nomList.html
function deleteBtn(del, i){
    var title = new_nom[i];
    var year = new_year[i];
    let li = del.parentNode;

    for(var i = 0; i < nom_list.length; i++){
        var str = title.replace(/\s/g, '+');
        var comp = str.localeCompare(nom_list[i]);
        if (comp == 0){
            const index = nom_list.indexOf(str);
            if(index > -1){
                nom_list.splice(index,1);
            }
        }
    }
    for(var i = 0; i < nom_year.length; i++){
        var comp = nom_year[i].localeCompare(year);
        if (comp == 0){
            const index = nom_year.indexOf(year);
            if(index > -1){
                nom_year.splice(index,1);
            }
        }
    }
    li.parentNode.removeChild(li);
    localStorage.setItem("nom_title",JSON.stringify(nom_list));
    localStorage.setItem("nom_year",JSON.stringify(nom_year));
    if(nom_list.length < 5){
        var banner = document.getElementById("banner");
        banner.innerHTML = "";
        banner.classList.remove("full");
    }
    if (nom_list.length == 0){
        tempText.innerHTML = "Add a nomination to begin!";
    }

    //add functionality to reduce number of items in list and notify to unlock movie.
}