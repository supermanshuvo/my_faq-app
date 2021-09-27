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
        <td><button>Edit</button><button>Delete</button></td>
        </tr>`
    });
    faq_list_item.innerHTML = item;
}

// Add Faq in list
save.addEventListener('click',function(){
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
        console.log('Success');
    });
})