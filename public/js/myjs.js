"use strict";
// De-clearing Variable
let faq_input_data      = document.querySelector('#add_to_faq_list'),
    faq_list_item       = document.querySelector('#faq-list'),
    faq_list_question   = document.getElementById('question'),
    faq_list_answer     = document.getElementById('answer'),
    faq_add_btn         = document.getElementById('create'),
    faq_success_sms     = document.getElementById('success_sms'),
    item = '';
const url = "https://jsonplaceholder.typicode.com/posts";

// Add Data to server
faq_add_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    add_faq();
});
function add_faq(){
    fetch(url,{
        method:'POST',
        body: JSON.stringify({
            id : 404,
            title: faq_list_question.value,
            body: faq_list_answer.value,
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
        faq_success_sms.innerHTML=`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                    FAQ Successfully Added!
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>`;
    });
    faq_list_answer.value = '';
    faq_list_question.value = '';
    faqCustomId++;
}

function show_faq(data){
    data.forEach(data => {
        item+=`<tr>
                <td>${data.id}</td>
                <td>${data.title}</td>
                <td>${data.body}</td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteFAQ(${data.id})">Delete</button></td>
            </tr>`;
    });
    faq_list_item.innerHTML=item;
}
document.addEventListener('DOMContentLoaded',()=>{
    fetch(url)
    .then((response)=>response.json())
    .then((posts)=>show_faq(posts))
    .catch((err)=>{
        faq_success_sms.innerHTML=`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                        FAQ found ${err}!
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>`;
    })
});

function deleteFAQ(dataId){
    let deleteBtn = event.target;
    let item = deleteBtn.parentElement;
    let id = item.dataset.id;
    let ask = confirm('Do you want to delete the Item');
    if(ask){
        let itemParent = item.parentElement;
        let final = itemParent.parentElement;
        fetch(`${url}/${dataId}`,{
            method: 'DELETE',
        })
        .then(()=>{
            final.removeChild(itemParent);
            faq_success_sms.innerHTML=`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        FAQ Delete done SL number: ${dataId} !
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>`;
        })
    }
}