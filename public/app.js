"use strict"
let question = document.querySelector('#question'),
    answer = document.querySelector('#answer'),
    save = document.querySelector('#save'),
    faq_list_item = document.querySelector('#faq-list'),
    update_btn = document.getElementById('update'),
    item = '';

const url = "http://localhost:3000/faqs";

// Show Faq Function
document.addEventListener('DOMContentLoaded',()=>{
    fetch(url)
    .then((response)=>response.json())
    .then((faqs)=>show_faq(faqs))
    .catch((err)=>{
        console.log(`Fetch `+err);
    });
    question.value='';
    answer.value ='';
})
function show_faq(data){
    data.forEach(data=>{
        item+=`<tr>
        <td>${data.id}</td>
        <td id="questionTd">${data.question}</td>
        <td id="answerTd">${data.answer}</td>
        <td><button onclick="editFAQ(${data.id})">Edit</button> <button onclick="deleteFAQ(${data.id})">Delete</button></td>
        </tr>`
    });
    faq_list_item.innerHTML = item;
}

// Add Faq in list
save.addEventListener('click',function(e){
    e.preventDefault();
    if(question.value.length==0 && answer.value.length==0){
        alert('Kindly Enter Something');
    }else{
        fetch(url,{
            method:'POST',
            body:JSON.stringify({
                question:question.value,
                answer:answer.value
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => {
            let data = [];
            data.push(json);
            show_faq(data);
            console.log('Add Success');
        });
    }
})

// Delete Faq Function 
function deleteFAQ(datId){
    let deleteBtn = event.target;
    let item = deleteBtn.parentElement;
    let ask = confirm('Do you want to delete the Item');
    if(ask){
        let itemParent = item.parentElement;
        let final_item = itemParent.parentElement;
        fetch(`${url}/${datId}`,{
            method:'DELETE',
        })
        .then(()=>{
            final_item.removeChild(itemParent);
            console.log('Delete success');
        })
    }
};

// Edit Faq function
function editFAQ(dataId){
    save.style.display = "none";
    update_btn.style.display = "block";
    let hiddenId = document.getElementById('hiddenId');
    hiddenId.value = dataId;
    fetch(url)
    .then((response)=>response.json())
    .then((items)=>{
        items.map((item)=>{
            if(parseInt(hiddenId.value)===parseInt(item.id)){
                question.value = item.question;
                answer.value = item.answer;
            }
        });
    })
    .catch((err)=>console.log(err))
};

// let update_btn = document.getElementById('update');
update_btn.addEventListener('click',function(e){
    e.preventDefault();
    if(question.value.length==0 && answer.value.length==0){
        alert('Kindly Enter Something');
    }else{
        fetch(`${url}/${hiddenId.value}`,{
            method: 'PUT',
            body:JSON.stringify({
                question:question.value,
                answer:answer.value
            }),
            headers:{
                'Content-type':'application/json; charset=UTF-8',
            },
        })
        .then((response)=>response.json())
        .then((item)=>{
            console.log(item[hiddenId.value]);
        })
        .catch((err)=>console.log(err))
    }
    update_btn.style.display="none";
    save.style.display = "block";
    question.value='';
    answer.value = '';
})