"use strict";
// De-clearing Variable
let faq_input_data      = document.querySelector('#add_to_faq_list'),
    faq_list_item       = document.querySelector('#faq-list'),
    faq_list_question   = document.getElementById('question'),
    faq_list_answer     = document.getElementById('answer'),
    faq_add_btn         = document.getElementById('create'),
    faq_update_btn      = document.getElementById('update'),
    faq_success_sms     = document.getElementById('success_sms'),
    item = '';
const url = "https://jsonplaceholder.typicode.com/posts";

// Add Data to server
faq_add_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    add_faq();
});
// FAQ Add function
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
}
// Show faq Function
function show_faq(data){
    data.forEach(data => {
        item+=`<tr>
                <td>${data.id}</td>
                <td id="questionTd">${data.title}</td>
                <td id="answerTd">${data.body}</td>
                <td><button class="btn btn-warning btn-sm m-2" onclick="editFAQ(${data.id})">Edit</button><button class="btn btn-danger btn-sm" onclick="deleteFAQ(${data.id})">Delete</button></td>
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
// Delete Function Work
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
};
function editFAQ(id){
    faq_add_btn.className = 'd-none';
    faq_update_btn.className = 'btn btn-warning';
    let passId = id;
    let id_Store = document.getElementById('id_value');
    id_Store.value = passId;
    fetch(url)
    .then((response)=>response.json())
    .then((items)=>{
        items.map((item)=>{
            if(passId === item.id){
                faq_list_question.value = item.title;
                faq_list_answer.value = item.body;
            }
        });
    })
    .catch((err)=>{
        faq_success_sms.innerHTML=`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                        FAQ found ${err}!
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>`;
    })
};

faq_update_btn.addEventListener('click',function(e,data){
    e.preventDefault();
    let faq_update_question = faq_list_question.value;
    let faq_update_answer = faq_list_answer.value;
    let item_id = document.getElementById('id_value').value;
    fetch(`${url}/${item_id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: faq_update_question,
          body: faq_update_answer,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((item) => {
            /* if(parseInt(item_id) == item.id){
                document.querySelector('#questionTd').innerHTML= item.title;
                document.querySelector('#answerTd').innerHTML= item.body;
            } */
            for(let keys in item[item_id]){
                console.log(keys);
            }
        })
        .catch((err)=>{
            faq_success_sms.innerHTML=`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                            FAQ found ${err}!
                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>`;
        })
    faq_add_btn.className = 'btn btn-success';
    faq_update_btn.className = 'd-none';
    faq_list_answer.value = '';
    faq_list_question.value = '';
})