let total = 0;

let total_calc = (prix) => {
    total += prix;
    document.getElementById("total-show").innerText = parseFloat(total).toFixed(2);
}

let del_gen = (aux, prix) => {
    return () => {
        let el = document.getElementById(`ele_${aux}`);
        el.parentNode.removeChild(el);
        total_calc(0-prix);
    }
}

let deleteItem = (event) => {
    let ele = event.target.parentNode;
    let num_aux = Number(ele.getElementsByClassName("Price")[0].name);
    total_calc(-num_aux);
    ele.parentNode.removeChild(ele);
}

document.getElementById("add-item").addEventListener("click", () => {
    let iName = document.getElementById("item-name").value;
    let isPrice = document.getElementById("item-price").value;
    let iPrice = parseFloat(isPrice);

    if(iName == "" || isPrice == "" || isNaN(isPrice) || iPrice < 0){
        document.getElementById("container").style = "border: 5px solid red";
    } else {
        document.getElementById("container").style = "";
        
        let item = document.createElement("li");
        let sName = document.createElement("div");
        let sPrice = document.createElement("div");
        let delBut = document.createElement("button");

        sName.innerText = `Name: ${iName}`;
        sPrice.innerText = `Price: ${iPrice}`;
        delBut.innerText = "Delete";

        sName.className = "Name";
        sPrice.className = "Price";
        sPrice.name = `${iPrice}`

        document.getElementById("items").appendChild(item);
        item.appendChild(sName);
        item.appendChild(sPrice);
        item.appendChild(delBut);

        delBut.addEventListener("click", deleteItem);
        total_calc(iPrice);
    }
})