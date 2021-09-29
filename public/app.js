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
        <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${data.id}</td>
        <td id="questionTd" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${data.question}</td>
        <td id="answerTd" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${data.answer}</td>
        <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"><button onclick="editFAQ(${data.id})">Edit</button> <button onclick="deleteFAQ(${data.id})">Delete</button></td>
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
    question.value='';
    answer.value = '';
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
    save.className = "hidden";
    update_btn.className = "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
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
    update_btn.className = "hidden";
    save.className = "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
    question.value='';
    answer.value = '';
})