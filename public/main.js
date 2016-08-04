$(() =>{

  getContacts();

  $('#newContact').submit(addContact);
  $('#addNew').click(openAddModal);
  /*$('#editContactForm').submit(saveUpdate);
  $('#append').on('click', '.edit', openEditModal);*/
  $('#append').on('click', '.delete', removeContact);

})

function removeContact(event){
  let divArrs = ('.newDiv');
  let parentDiv = $(event.target).closest('.newDiv');
  let parentDiv.addClass('remove');
  $.ajax({
    type: 'DELETE',
    url: `/addressBook/${index.dataset.id}` ,
    data: function(updatedPerson){
      //return updated person object with the uuid

      //updateContact(person)
    },
    error: function(response){
      console.log(response);
    }
  });
  let index = $('.remove').index()
}

function getContacts(){
  $.get(`/addressBook`)
   .done(allContacts =>{
     addContacts(allContacts)
   })
   .fail(err =>{
     console.log("err:", err)
   })
}

function addContacts(people){
  let $peopleDivs = people.map(person => {
    return createContactCard(person);
  });
  $('#append').append($peopleDivs);
}

function createContactCard(person){
  let $div = $('#template').clone();
  $div.removeAttr('id');
  $div.find('.name').text(person.name)
  $div.find('.email').text(person.email)
  $div.find('.newImg').attr('src', person.img);
  $div.attr('data-id', person.id)
  return $div;
}

function openAddModal(){
  $('#newName').val("");
  $('#newEmail').val("");
  $('#newImg').val("");

  $('#newContactModal').modal();
}

function openEditModal(){
  $('.editDiv').removeClass('editDiv');
  $(this).parent().parent().parent().addClass('editDiv');

  let name = $('.editDiv').find(".name").text();
  let email = $('.editDiv').find(".email").text();
  let newImg = $('.editDiv').find(".newImg").attr('src');

  $('#updateName').val(name);
  $('#updateEmail').val(email);
  $('#updateDiv').val(newImg);

  $('#editContactModal').modal();
}

/*

  MAKE SURE TO SOLVE THE PROBLE OF TARGETING THE INDEX
  OF THE HTML OBJECT WITH THE ACTUAL DATA-ID

function saveUpdate(event){
  event.preventDefault();
  let index = $('editDiv').index();

  let checkImg = $('#updateImg').val("")
  let newImg = checkImg || 'unknownProfle.jpg';

  let updatePerson = {
    name: $('#updateName').val(),
    email: $('#updateEmail').val(),
    img: newImg
  }
  updatePerson.id = index.dataset.id //should be the special UUID

  $.ajax({
    type: 'PUT',
    url: `/addressBook/${index.dataset.id}` ,
    data: function(updatedPerson){
      //return updated person object with the uuid

      //updateContact(person)
    },
    error: function(response){
      console.log(response);
    }
  });
}

*/

function addContact(event){
  event.preventDefault();

  let checkImg = $('#newImg').val();
  let newImg = checkImg || './unknownProfile.png';

  let newPerson = {
    name: $('#newName').val(),
    email: $('#newEmail').val(),
    img: newImg
  }

  $.post(`/addressBook`, newPerson)
   .done(newcontact => {
    $('#append').append(createContactCard(newcontact));
   })
   .fail(err =>{
     console.log('err:', err)
   })
   $('#closeModalAdd').click();
}

/*
function updateContact(person){
  //update the person in the HTML

}
*/
