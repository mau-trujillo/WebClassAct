let total = 0;

let total_calc = (prix) => {
    total += prix;
    document.getElementById("total-show").innerText = parseFloat(total).toFixed(2);
}

let deleteItem = (event) => {
    let ele = event.target.parentNode;
    let num_aux = Number(ele.getElementsByClassName("Weight")[0].name);
    total_calc(-num_aux);
    ele.parentNode.removeChild(ele);
}

document.getElementById("add-poke").addEventListener("click", () => {
    let iName = document.getElementById("pokeName").value;

    axios.get(`https://pokeapi.co/api/v2/pokemon/${iName.toLowerCase()}`)
        .then((res) => {
            const pokemon = res.data;
            
            let nPoke = document.createElement("li");
            let sName = document.createElement("div");
            let sWeight = document.createElement("div");
            let sImg = document.createElement("img");
            let delBut = document.createElement("button");

            delBut.innerText = "Delete";

            sName.className = "Name";
            sWeight.className = "Weight";

            sName.innerHTML = pokemon.name;
            sWeight.innerHTML = pokemon.weight;
            sImg.src = pokemon.sprites.front_default;

            sWeight.name = pokemon.weight;

            document.getElementById("pokeList").appendChild(nPoke);
            nPoke.appendChild(sName);
            nPoke.appendChild(sWeight);
            nPoke.appendChild(sImg);
            nPoke.appendChild(delBut);

            delBut.addEventListener("click", deleteItem);
            total_calc(Number(sWeight.name));

        }).catch((err) => {
            alert("Please enter a valid Pokemon");
        });
})