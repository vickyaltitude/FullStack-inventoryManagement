const lists = document.getElementById('prod-lists');

let products;

async function fetchProd(){

    try{

        const data = await fetch('http://localhost:3600/getproducts');
        const converted = await data.json();
        products = converted;
        loadPage(converted);

    }catch(err){
        console.log(err)
    }
  
}

fetchProd();

function loadPage(conv){

    if(conv.length){

        for(let i = 0;i<conv.length;i++){
           
            let li = document.createElement('li');
            let pName = document.createElement('span');
            let pDescription = document.createElement('span');
            let pPrice = document.createElement('span');
            let pQty = document.createElement('span');
            let btn1 = document.createElement('button');
            btn1.className = `${conv[i].id}-1`
            btn1.type = 'button';
            btn1.addEventListener('click',buyItem)
            let btn2 = document.createElement('button');
            btn2.className = `${conv[i].id}-2`
            btn2.type = 'button';
            btn2.addEventListener('click',buyItem);
            let btn3 = document.createElement('button');
            btn3.type = 'button';
            btn3.addEventListener('click',buyItem)
            btn3.className = `${conv[i].id}-3`

            pName.innerText = `${conv[i].product_name}   `;
            pDescription.innerText = `${conv[i].description}   `;
            pPrice.innerText = `${conv[i].price}   `;
            pQty.innerText = `${conv[i].quantity}   `;
            btn1.innerText = 'Buy 1 quantity';
            btn2.innerText = 'Buy 2 quantity';
            btn3.innerText = 'Buy 3 quantity';
            li.appendChild(pName);
            li.appendChild(pDescription);
            li.appendChild(pPrice);
            li.appendChild(pQty);
            li.appendChild(btn1);
            li.appendChild(btn2);
            li.appendChild(btn3);
            lists.appendChild(li);
            
        }
    }
}

async function buyItem(ev){
    ev.preventDefault();
    const tar = ev.target.className;
    let val = tar.split('-');
    if(products.length){
        let getItem = products.find(items => items.id == val[0]);
        if(getItem.quantity > 0){
            let updatedQty = getItem.quantity - Number(val[1]);
            if(updatedQty < 0) updatedQty = 0;
            let updateDat = await fetch('http://localhost:3600/updateqty',{
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({updatedQty,val:val[0]})
            })
            let resp = await updateDat.json();
            console.log(resp)
        
    
        if (resp.message) {
            window.location.href = '/';
        }
    
    }
    
}
}