function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-');
}

$("#save-attendance").click(function (e) {
  e.preventDefault();
  $('#create-attendance-form .validate').each(function(){
    if($(this).val() == ''){
      $(this).addClass("invalid");
        return false;
    }
  });

  var data = {
    "userId":$("#attendance-user-id").val(),
    "date":convertDate(new Date())
  };

  console.log(data);

  $.ajax({
    method: "POST",
    url: BASE_URL+"/attendance",
    data: JSON.stringify(data),
    contentType:"application/json",
    dataType:"json",
    success: function (response) {
      alert("Attendance added");
      document.getElementById("create-attendance-form").reset();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      if (xhr.status === 404) {
        alert("Employee with ID: "+ data.userId + " does not exist. Please try again.");
      }
      if(xhr.status===500){
        alert("Duplicaded attendance. Check employee ID or date.");
      }
    }
  });
});

function attendanceReport(dateFrom, dateTo) {
  $("#attendance-list-report-response").html("");
  $.ajax({
    method: "GET",
    url: BASE_URL+"/attendance/from/"+dateFrom+"/to/"+dateTo,
    success: function (response) {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        var li = '<li class="collection-item">' + response[i].date + ' --- Employee ID:' + response[i].userId + '</li>'
        $("#attendance-list-report-response").append(li);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      if (xhr.status === 404) {
      }
      if(xhr.status===500){
      }
    }
  });
}

$("#monthly-attendance-report").change(function () {
  $("#weekly-attendance-report").val("");
  var month = $(this).val();
  var dateFrom = "01-"+ month +"-2017";
  var dateTo = "31-"+ month +"-2017";

  attendanceReport(dateFrom, dateTo);

  console.log($(this).val());
});

$("#weekly-attendance-report").change(function () {
  $("#monthly-attendance-report").val("");
  var week = $(this).val();
  console.log(week);
  var dateFrom, dateTo;
  var weeks = {
    1: {
      dateFrom: "01-01-2017",
      dateTo: "08-01-2017"
    },

    2: {
      dateFrom: "09-01-2017",
      dateTo: "15-01-2017"
    },

    3: {
      dateFrom: "16-01-2017",
      dateTo: "22-01-2017"
    },

    4: {
      dateFrom: "23-01-2017",
      dateTo: "29-01-2017"
    },

    5: {
      dateFrom: "30-01-2017",
      dateTo: "05-02-2017"
    },

    6: {
      dateFrom: "06-02-2017",
      dateTo: "12-02-2017"
    },

    7: {
      dateFrom: "13-02-2017",
      dateTo: "19-02-2017"
    },

    8: {
      dateFrom: "20-02-2017",
      dateTo: "26-02-2017"
    },

    9: {
      dateFrom: "27-02-2017",
      dateTo: "05-03-2017"
    },

    10: {
      dateFrom: "06-03-2017",
      dateTo: "12-03-2017"
    },

    11: {
      dateFrom: "13-03-2017",
      dateTo: "19-03-2017"
    },

    12: {
      dateFrom: "20-03-2017",
      dateTo: "26-03-2017"
    },

    13: {
      dateFrom: "27-03-2017",
      dateTo: "02-04-2017"
    },

    14: {
      dateFrom: "03-04-2017",
      dateTo: "09-04-2017"
    },

    15: {
      dateFrom: "10-04-2017",
      dateTo: "16-04-2017"
    },

    16: {
      dateFrom: "17-04-2017",
      dateTo: "23-04-2017"
    },

    17: {
      dateFrom: "24-04-2017",
      dateTo: "30-04-2017"
    },

    18: {
      dateFrom: "01-05-2017",
      dateTo: "07-05-2017"
    },

    19: {
      dateFrom: "08-05-2017",
      dateTo: "14-05-2017"
    },

    20: {
      dateFrom: "15-05-2017",
      dateTo: "21-05-2017"
    },

    21: {
      dateFrom: "22-05-2017",
      dateTo: "28-05-2017"
    },

    22: {
      dateFrom: "29-05-2017",
      dateTo: "04-06-2017"
    },

    23: {
      dateFrom: "05-06-2017",
      dateTo: "11-06-2017"
    },

    24: {
      dateFrom: "12-06-2017",
      dateTo: "18-06-2017"
    },

    25: {
      dateFrom: "19-06-2017",
      dateTo: "25-06-2017"
    },

    26: {
      dateFrom: "26-06-2017",
      dateTo: "02-07-2017"
    },

    27: {
      dateFrom: "03-07-2017",
      dateTo: "09-07-2017"
    },

    28: {
      dateFrom: "10-07-2017",
      dateTo: "16-07-2017"
    },

    29: {
      dateFrom: "17-07-2017",
      dateTo: "23-07-2017"
    },

    30: {
      dateFrom: "24-07-2017",
      dateTo: "30-07-2017"
    },

    31: {
      dateFrom: "31-07-2017",
      dateTo: "06-08-2017"
    },

    32: {
      dateFrom: "07-08-2017",
      dateTo: "13-08-2017"
    },

    33: {
      dateFrom: "14-08-2017",
      dateTo: "20-08-2017"
    },

    34: {
      dateFrom: "21-08-2017",
      dateTo: "27-08-2017"
    },

    35: {
      dateFrom: "28-08-2017",
      dateTo: "03-09-2017"
    },

    36: {
      dateFrom: "04-09-2017",
      dateTo: "10-09-2017"
    },

    37: {
      dateFrom: "11-09-2017",
      dateTo: "17-09-2017"
    },

    38: {
      dateFrom: "18-09-2017",
      dateTo: "24-09-2017"
    },

    39: {
      dateFrom: "25-09-2017",
      dateTo: "01-10-2017"
    },

    40: {
      dateFrom: "02-10-2017",
      dateTo: "08-10-2017"
    },

    41: {
      dateFrom: "09-10-2017",
      dateTo: "15-10-2017"
    },

    42: {
      dateFrom: "16-10-2017",
      dateTo: "22-10-2017"
    },

    43: {
      dateFrom: "23-10-2017",
      dateTo: "29-10-2017"
    },

    44: {
      dateFrom: "30-10-2017",
      dateTo: "05-11-2017"
    },

    45: {
      dateFrom: "06-11-2017",
      dateTo: "12-11-2017"
    },

    46: {
      dateFrom: "13-11-2017",
      dateTo: "19-11-2017"
    },

    47: {
      dateFrom: "20-11-2017",
      dateTo: "26-11-2017"
    },

    48: {
      dateFrom: "27-11-2017",
      dateTo: "03-12-2017"
    },

    49: {
      dateFrom: "04-12-2017",
      dateTo: "10-12-2017"
    },

    50: {
      dateFrom: "11-12-2017",
      dateTo: "17-12-2017"
    },

    51: {
      dateFrom: "18-12-2017",
      dateTo: "24-12-2017"
    },

    52: {
      dateFrom: "25-12-2017",
      dateTo: "21-12-2017"
    }
  };
  console.log(weeks[week].dateFrom);
  attendanceReport(weeks[week].dateFrom, weeks[week].dateTo);


});
