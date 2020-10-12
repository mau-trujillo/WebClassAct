const get_element_li = (name, id, weight, image, types, height, base_experience) => {
    return `<li class="added-pokemon">name: ${name}<br>id: ${id}<br>height: ${height}<br>base experience: ${base_experience} <div class="weight">weight: ${weight}<br>types: ${types.map(element => " " + element.type.name)} </div> <img src=${image} ><button class="remove-pokemon">remove</button></li>`
}

const add_item_to_list_with_template = (template_function) => {
    return (event) => {
        document.getElementById("error").innerText = "";
        const req = document.getElementById("pokemon-name").value;
        document.getElementById("pokemon-name").value = "";

        axios.get(`http://localhost:3000/getPokemon/${req}`).then(({ data: { name, id, weight, types, height, base_experience } }) => {
            const items = document.getElementsByClassName('items')[0];
            const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id.toString().padStart(3, '0')}.png`;
            items.insertAdjacentHTML('beforeend', template_function(name, id, weight, image, types, height, base_experience));

            const removeArray = document.getElementsByClassName("remove-pokemon");
            const newRemove = removeArray[removeArray.length - 1];
            newRemove.addEventListener("click", remove_element_event)
        }).catch(catchable_handle_for_the_error)
    }
}

const remove_element_event = (event) => {
    const padre = event.target.parentNode;
    padre.parentNode.removeChild(padre);
}

const catchable_handle_for_the_error = (err) => {
    console.error(err)
    document.getElementById("error").innerText = "\nEse pokemon no existe."
}
