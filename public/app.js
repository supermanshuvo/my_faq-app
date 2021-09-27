"use strict"
let question = document.querySelector('#question'),
    answer = document.querySelector('#answer'),
    save = document.querySelector('#save'),
    faq_list_item = document.querySelector('#faq-list'),
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
        <td><button>Edit</button> <button onclick="deleteFAQ(${data.id})">Delete</button></td>
        </tr>`
    });
    faq_list_item.innerHTML = item;
}

// Add Faq in list
save.addEventListener('click',function(e){
    e.preventDefault();
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
})

// Delete Faq Function 
function deleteFAQ(datId){
    let deleteBtn = event.target;
    let item = deleteBtn.parentElement;
    // let id = item.dataset.id;
    // console.log(id)
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
