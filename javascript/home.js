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