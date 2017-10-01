function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

$("#user-birthdate").change(function () {
  var selectedDate = $(this).val();
  var age = 0;
  if(selectedDate != ""){
    var reformatDate = new Date(selectedDate.replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
    age = calculateAge(reformatDate);
    $("#user-age").val(age);
  }else{
    $("#user-age").val(age);
  }
});

$("#save-user").click(function (e) {
  e.preventDefault();
  $('#create-user-form .validate').each(function(){
    if($(this).val() == ''){
      $(this).addClass("invalid");
        return false;
    }
  });

  var data = {
    "id":$("#user-id").val(),
    "name":$("#user-first-name").val(),
    "lastName":$("#user-last-name").val(),
    "age":$("#user-age").val(),
    "position":$("#user-position").val(),
    "salary":$("#user-salary").val(),
    "birthdate":$("#user-birthdate").val(),
    "companyEntryDate":$("#user-company-entry-date").val()
  };

  $.ajax({
    method: "POST",
    url: BASE_URL+"/user",
    data: JSON.stringify(data),
    contentType:"application/json",
    dataType:"json",
    success: function (response) {
      alert("Employee added");
      location.reload();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      if(xhr.status===500){
        alert("Employee with ID: " + data.id + " already exist.");
      }
    }
  });
});
