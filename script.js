const cards  = document.querySelector('.cards');

const dropdown = document.querySelector("#course");


const status = document.querySelector('#status');

const image = document.querySelector('#image')


const btn = document.querySelector('.btn');

const form = document.querySelector('form');

let mbtn = document.querySelector('#mbtn');

const pform = document.querySelector('.pform')

mbtn.addEventListener('click',()=>{
    pform.style.display = 'flex';
})



const id = ()=>{
    let random_id = Math.floor(Math.random()*109);
    return random_id;
}



let taskArr = JSON.parse(localStorage.getItem("Task_data")) || [];

const ui = ()=>{
    cards.innerHTML="";
    taskArr.forEach((e,index)=>{
cards.innerHTML +=`<div class="card" data-task-id='${e.i}' data-status='${e.s} data-category='${e.v}'>
        <div class="img">
        <img src="${e.image}" alt="${e.v}" >
        </div>
        <div class="card-info">
                 <div class="data-id">Task-id:${e.i}</div>
                <div class="data-status">status:${e.s}</div>
                <div class="data-category">category:${e.v}</div>
                <div class="upde">
                    <button class="up" onclick="update(${e.i})">Update</button>
                    <button onclick="del(${index})">Delete</button>
                </div>
        </div>
    </div>`
     cards.style.display = "flex";
})
}


ui();
let Update= null;    
form.addEventListener('submit',(e)=>{
    cards.textContent = ""
    e.preventDefault();
    let v = dropdown.options[dropdown.selectedIndex].text;
    let s =status.options[status.selectedIndex].text;
    let i = image.value;

    if(i === ""){
        alert("please field image url:");
        return
    }
   
    


    let obj = {
        i:`${id()}`,
        s:`${s}`,
        v:`${v}`,
        image:`${i}`

    }
     if(Update !== null){
        taskArr[Update] = obj;
        localStorage.setItem("Task_data",JSON.stringify(taskArr))
        Update = null;
    }else{
        taskArr.push(obj)
        localStorage.setItem("Task_data",JSON.stringify(taskArr))
    }
    
    

    ui()

   cards.style.display = "flex";
   form.reset()
})

btn.addEventListener('click',()=>{
     pform.style.display = 'none';
})

const update = (id) =>{
   let edit = taskArr.find((e)=> e.i === String(id));

   Update = taskArr.findIndex((e)=> e.i === String(id));
   
   console.log(Update)
   pform.style.display = 'flex';
    

    dropdown.options[dropdown.selectedIndex].text = edit.v;
    status.options[status.selectedIndex].text= edit.s;
    image.value = edit.image;
}

const del =(index)=>{
    taskArr.splice(index,1);
    localStorage.setItem("Task_data",JSON.stringify(taskArr))
    ui()
}
