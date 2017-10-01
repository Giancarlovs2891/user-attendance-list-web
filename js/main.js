var BASE_URL = "http://localhost:8080";

function deleteUser(id) {
  $.ajax({
    method: "DELETE",
    url: BASE_URL+"/user/"+id,
    success: function (response) {
      alert("Employee removed");
      listUsers();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      if (xhr.status === 404) {
        alert("Employee with ID: "+ data.userId + " does not exist. Please try again.");
      }
      if(xhr.status===500){
        alert("Error while deleting user. Please try again.");
      }
    }
  });
}

function listUsers() {
  $.ajax({
    method: "GET",
    url: BASE_URL+"/user",
    success: function (response) {
      $("#main-user-list").html("");
      for (var i = 0; i < response.length; i++) {
        var user = '<li class="collection-item avatar">' +
          '<img src="images/profile.png" alt="" class="circle">' +
          '<h5 class="title">' + response[i].name + ' ' + response[i].lastName + '</h5>' +
          '<p>ID: ' + response[i].id + ' <br>' +
             'Age: ' + response[i].age + ' <br>' +
             'Position: ' + response[i].position + ' <br>' +
             'Salary: $' + response[i].salary + ' <br>' +
             'Birthdate: ' + response[i].birthdate + ' <br>' +
             'Company Entry Date: ' + response[i].companyEntryDate +
          '</p>' +
          '<a class="delete-user" href="javascript:void(0);" data-user-id="' + response[i].id + '" class="secondary-content"><i class="material-icons">Remove User</i></a>' +
        '</li>';
        $("#main-user-list").append(user);
      }
      $(".delete-user").click(function () {
        var id = $(this).attr("data-user-id");
        deleteUser(id);
      });
    },
    error: function (xhr, ajaxOptions, thrownError) {
      if (xhr.status === 404) {
      }
      if(xhr.status===500){
      }
    }
  });
}

$( document ).ready(function() {

  $("#show-create-user-section").click(function () {
    $(".section").hide();
    $("#create-user").show();
  });

  $("#show-create-attendance-list-section").click(function () {
    $(".section").hide();
    $("#create-attendance-list").show();
  });

  $("#show-attendance-list-report-section").click(function () {
    $(".section").hide();
    $("#attendance-list-report").show();
  });

  listUsers();

});
