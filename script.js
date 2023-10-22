let input=document.querySelector(".search_input");
console.log(input.value);
let btn=document.querySelector(".button");
let card =document.querySelector(".card");
let showDetail=document.querySelectorAll(".phonebutton");
let feature=document.querySelector(".features");
feature.style.display="none";


btn.addEventListener("click",(e)=>{
  
   async function fetch_data(){
      let link =await fetch(  `https://openapi.programming-hero.com/api/phones?search=${input.value}`);
      let value=await link.json();
      let arr=value.data;
      console.log(arr);
       createcard(arr); 

    }
    fetch_data();


    
});
let phone_arr=[]

function createcard(arr){
    arr.forEach(element => {
        // console.log(element);
        let newcard =document.createElement("div")
   newcard.innerHTML=
   ` <img src=${element.image}>
   <h4>${element.phone_name}</h4>
   <p>There are many variations of passages of available, but the majority have suffered</p>
   <button class="phonebutton">
       SHOW DETAILS
   </button>
   
   <span class="slug">${element.slug}</span>
   `
   newcard.classList.add("phonecard");

   phone_arr.push(newcard);
    });
    
    card.replaceChildren(...phone_arr);
    
   showDetail=document.querySelectorAll(".phonebutton");  

    details(showDetail);

    phone_arr=[];
   
}

function details(showDetail){
    showDetail.forEach(e=>{
        
        e.addEventListener("click",async(ele)=>{
            ele.preventDefault()
            let result=ele.target.parentElement.children[4].innerText;
            let link =await fetch(  `https://openapi.programming-hero.com/api/phone/${result}`);
            let value=await link.json();
            let mainfeature=value.data.mainFeatures;
            let data2=value.data;
            let showbtn=document.createElement("div");
            showbtn.innerHTML=
            
            `<img src=${data2.image}>
            <h4>${data2.name}</h4>
            <h5>Brand:${data2.brand}</h5>
            <p>Storage:${mainfeature.storage}</p>
            <p>displaySize:${mainfeature.
                displaySize}</p>
            <p>chipSet:${mainfeature.
                chipSet}</p>
            <p>memory:${mainfeature.
                memory}</p>
                <p>sensors:${mainfeature.
                    sensors}</p>
                <button class="close phonebutton" >Close</button>    
     `      
           
            feature.replaceChildren(showbtn);
            feature.style.display="block";
            let close=document.querySelector(".close");
            close.addEventListener("click",(cls)=>{
                cls.preventDefault();
                feature.style.display="none";
            })
        });

    })
}