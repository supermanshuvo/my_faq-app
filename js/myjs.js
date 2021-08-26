// De-clearing Variable
let faq_input_data      = document.querySelector('#add_to_faq_list'),
    faq_list_item       = document.querySelector('#faq-list'),
    faq_list_question   = document.getElementById('question'),
    faq_list_answer     = document.getElementById('answer'),
    faq_add_btn         = document.getElementById('create');
const url = "https://jsonplaceholder.typicode.com/posts";

// Add Data to server
faq_add_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    add_faq();
});