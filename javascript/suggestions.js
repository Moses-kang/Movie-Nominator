var searchWrapper = document.querySelector(".search-input");
var inputValue = searchWrapper.querySelector("input");
var suggest = searchWrapper.querySelector(".auto-box");
var titleList = [];
var yearList = [];
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

inputValue.onkeyup = (e) => {
    let current_search = e.target.value;
    const suggestionList = [];
    titleList = [];
    yearList = [];
    if(current_search){
        fetch(`http://www.omdbapi.com/?s=${current_search}&apikey=3da543c7`)
        .then(response => response.json())
        .then(data => {
            var i;
            for(i = 0; i < 7; i++){
                suggestionList.push("<a href='detailed.html'><li>"+data['Search'][i]['Title']+" "+data['Search'][i]['Year']+"</li></a>");
                titleList.push(data['Search'][i]['Title']);
                yearList.push(data['Search'][i]['Year']);
                searchWrapper.classList.add("active");
            }
            show_suggestions(suggestionList);
            var currList = suggest.querySelectorAll("li");
            var a = suggest.querySelectorAll("a");
            a.href = "index.html";
            for(i = 0; i < currList.length; i++){
                currList[i].setAttribute("onclick", "select(this,"+i+")")
            }
        })
        .catch(err => console.log("please enter a valid movie title"))
    }
}

function select(element, index){
    let userData = element.textContent;
    const mov_title = titleList[index].replace(/\s/g, '+')
    const mov_year = yearList[index];
    localStorage.setItem("mov_title", mov_title)
    localStorage.setItem("mov_year", mov_year)
}

function show_suggestions(list){
    console.log(list);
    let listData;
    if(!list.length){
    }
    else{
        listData = list.join('');
        suggest.innerHTML = listData;
    }
}
//search movies
