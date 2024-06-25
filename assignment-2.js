let count = 0;
const display_first = () =>{
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=a`)
        .then(res=>res.json())
        .then(data=>{
            display_first_two(data);
        })
}

const display_first_two = (players) =>{
    const container = document.getElementById("display-first");
    const displayArray = players.player;

    displayArray.forEach(person => {
        const div = document.createElement("div");
        div.classList.add("child");
        div.innerHTML=`
        <img src="${person.strThumb}" alt="player image">
        <p>Name: ${person.strPlayer}</p>
        <p>Nationality: ${person.strNationality}</p>
        <p>Team: ${person.strTeam}</p>
        <p>Sport: ${person.strSport}</p>
        <p>Income: ${person.strWage}</p>
        <p>Description: ${person.strDescriptionEN.slice(0,7)}</p>
        <button class="card-button" onclick="addToTeam('${person.strPlayer}')">Add To team</button>
        <button class="card-button">Details</button>
        `;
        container.appendChild(div);
    });

}
display_first();

const handleSearch = () =>{
    const allChildren = document.getElementsByClassName("child");
    for(const element of allChildren){
        element.parentNode.removeChild(element);
    }
    const container = document.getElementById("search-box").value;
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${container}`)
        .then(res=>res.json())
        .then(data=>{
            displayData(data);
        })
    document.getElementById("search-box").value = "";
}

const displayData = (players) =>{
    const container_two = document.getElementById("searched-data");
    const searchArray = players.player;

    searchArray.forEach(person => {
        const div_two = document.createElement("div");
        div_two.classList.add("child");
        div_two.innerHTML=`
        <img src="${person.strThumb}" alt="player image">
        <p>Name: ${person.strPlayer}</p>
        <p>Nationality: ${person.strNationality}</p>
        <p>Team: ${person.strTeam}</p>
        <p>Sport: ${person.strSport}</p>
        <p>Income: ${person.strWage}</p>
        <p>Description: ${person.strDescriptionEN.slice(0,7)}</p>
        <button class="card-button" onclick="addToTeam('${person.strPlayer}')">Add To team</button>
        <button class="card-button">Details</button>
        `;
        container_two.appendChild(div_two);
    });
}

const addToTeam =(name)=>{
    const cartCount = document.getElementById("count").innerText;
    let convertedCount = parseInt(cartCount);
    convertedCount+=1;
    if(convertedCount>11){
        alert("Only 11 players can be added to your team!")
        return;
    }
    document.getElementById("count").innerText = convertedCount; 
    
    const container_three = document.getElementById("cart-main-container");
    
    const div = document.createElement("div");
    div.classList.add("cart-info");
    div.innerHTML = `
    <p>${name.slice(0,7)}</p>
    `;
    container_three.appendChild(div);

    // console.log(name);
    
};
