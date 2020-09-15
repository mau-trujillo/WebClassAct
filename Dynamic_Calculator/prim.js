let count = 0;
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

document.getElementById("add-item").addEventListener("click", () => {
    let iName = document.getElementById("item-name").value;
    let isPrice = document.getElementById("item-price").value;
    let iPrice = parseFloat(isPrice);

    if(iName == "" || isPrice == "" || isNaN(isPrice) || iPrice < 0){
        document.getElementById("container").style = "border: 5px solid red";
    } else {
        document.getElementById("container").style = "";
        document.getElementById("items").insertAdjacentHTML("beforeend", `<li id="ele_${count}">Name: ${iName} Price: ${iPrice} <button id="del_${count}">delete</button></li>`);
        document.getElementById(`del_${count}`).addEventListener("click", del_gen(count, iPrice));
        total_calc(iPrice);
        count++;
    }
})