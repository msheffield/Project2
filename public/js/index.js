// // Get references to page elements
var $searchBtn = $("#searchButton");

var API = {
  getTutors: function (queryData) {
    console.log("getTutors queryData.subject: " + queryData.subject);
    $.ajax({
      url: "/tutors/" + queryData.grade + "/" +queryData.skillLevel + "/" + queryData.location + "/" + queryData.subject,
      type: "GET",
    }).then(function (dbTutorData) {
      window.location.href = "/tutors/" + queryData.grade + "/" +queryData.skillLevel + "/" + queryData.location + "/" + queryData.subject;
    });
  }
};

var handleSearchSubmit = function () {
  event.preventDefault();
  var querySubjects = [];
  var checkedElements = $(".subject-dropdown-item:checked");
  for (var i = 0; i < checkedElements.length; i++) {
    console.log(checkedElements[i]);
    console.log($(checkedElements[i]).val());
    querySubjects.push($(checkedElements[i]).val());
  }

  console.log("querySubjects = " + querySubjects);
  var queryData = {
    grade: $("#gradeDropdown").val(),
    skillLevel: $("#skillsDropdown").val(),
    location: $("#locationDropdown").val(),
    subject: JSON.stringify(querySubjects)
  };
  console.log(queryData);
  API.getTutors(queryData);
};

//refresh subject dropdown items
// var refreshSubjects = function () {
//   $("#subjectDropdown").empty();
//   $.get("/api/subjects").then(function (data) {
//     console.log(data);
    
//     for (var i = 0; i < data.length; i++) {
//       var newDropdownItem = $("<a>").addClass("dropdown-item");
//       var newDiv = $("<div>").addClass("custom-control custom-checkbox");
//       var newInput = $("<input>").addClass("custom-control-input");
//       newInput.attr("type", "checkbox");
//       newInput.attr("value", data[i].name);
//       newInput.attr("id", data[i].name);
//       var newLabel = $("<label>").addClass("custom-control-label");
//       newLabel.attr("for", data[i].name);
//       newLabel.text(data[i].name);
//       newDiv.append(newInput);
//       newDiv.append(newLabel);
//       newDropdownItem.append(newDiv);
//       $("#subjectDropdown").append(newDropdownItem);
//     }
//   });
// };

var refreshTutorList = function (dbTutorData) {
  console.log(dbTutorData);
  $("#list-tutors").empty();
  for (var i = 0; i < dbTutorData.length; i++) {
    var displayText = dbTutorData[i].firstName + " " + dbTutorData[i].lastName + " " + dbTutorData[i].location + " ";
    var listItem = $("<li>").addClass("list-group-item");
    listItem.text(displayText);
    $("#list-tutors").append(listItem);
  }
}
// Sign-Up/Login

$('#signup-form').on('submit', function (event) {
  event.preventDefault();
  let userData = {
    role: $('#signup_role').val().trim(),
    email: $('#signup_email').val().trim(),
    password: $('#signup_password').val().trim(),
    username: $('#signup_username').val().trim()
  }
  $.ajax('/api/signup', {
    type: 'POST',
    data: userData
  }).catch(function (error) {
    console.log(error);
  });
});

$('#login-form').on('submit', function (event) {
  event.preventDefault();
  let userData = {
    email: $('#email').val().trim(),
    password: $('#password').val().trim()
  }
  console.log(userData)
  console.log('Before post request login')
  $.ajax('/api/login', {
    type: 'POST',
    data: userData
  }).then(function (data) {

    window.location.href = '/index';
  }).catch(function (error) {
    console.log(error)
  });
});

$searchBtn.on("click", handleSearchSubmit);


