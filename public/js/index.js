// // Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
 var $submitBtn = $("#btn-submitProfile");
// var $exampleList = $("#example-list");
var $searchBtn = $("#searchButton");

// The API object contains methods for each kind of request we'll make
var API = {
  //   saveExample: function(example) {
  //     return $.ajax({
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       type: "POST",
  //       url: "api/examples",
  //       data: JSON.stringify(example)
  //     });
  //   },
  //   getExamples: function() {
  //     return $.ajax({
  //       url: "api/examples",
  //       type: "GET"
  //     });
  //   },
  //   deleteExample: function(id) {
  //     return $.ajax({
  //       url: "api/examples/" + id,
  //       type: "DELETE"
  //     });
  //   }
  getTutors: function (queryData) {
    $.ajax({
      url: "/tutors",
      type: "POST",
      data: queryData
    }).then(function () {
      location.reload();
    });
  },

  createTutors: function(tutorData){
    $.ajax({
      url: "/api/tutors",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: tutorData
    }).then(function(result){
      console.log(result);

    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var handleSearchSubmit = function () {
  event.preventDefault();
  var querySubjects = [];
  var checkedElements = $(".custom-control-input:checked");
  for(var i = 0; i < checkedElements.length; i++)
  {
    console.log(checkedElements[i]);
    console.log($(checkedElements[i]).val());
    querySubjects.push($(checkedElements[i]).val());
  }
  
  var queryData = {
    grade: $("#gradeDropdown").val(),
    skillLevel: $("#skillsDropdown").val(),
    location: $("#locationDropdown").val(),
    subject: JSON.stringify(querySubjects)
  };
  console.log(queryData);
  API.getTutors(queryData);
};

var handleSubmitProfile = function(){
  event.preventDefault();
  var tutorObj = {
    firstName: "Jane",
    lastName: "Doe",
    phoneNumber: "1234567890",
    location: "Seattle",
    skillLevel: "8",
    description: "I love teaching math",
    grade: 3,
    subjects: ["math", "music"],
    accountId: 1
  };
  API.createTutors({tutor:JSON.stringify(tutorObj)});
}
//refresh subject dropdown items
var refreshSubjects = function () {
  $("#subjectDropdown").empty();
  $.get("/api/subjects").then(function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      var newDropdownItem = $("<a>").addClass("dropdown-item");
      var newDiv = $("<div>").addClass("custom-control custom-checkbox");
      var newInput = $("<input>").addClass("custom-control-input");
      newInput.attr("type", "checkbox");
      newInput.attr("value", data[i].name);
      newInput.attr("id", data[i].name);
      var newLabel = $("<label>").addClass("custom-control-label");
      newLabel.attr("for", data[i].name);
      newLabel.text(data[i].name);
      newDiv.append(newInput);
      newDiv.append(newLabel);
      newDropdownItem.append(newDiv);
      $("#subjectDropdown").append(newDropdownItem);
    }
  });
};

// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// Add event listeners to the submit and delete buttons
$searchBtn.on("click", handleSearchSubmit);
$submitBtn.on("click", handleSubmitProfile);
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
refreshSubjects();

$('#signup-form').on('submit', function (event) {
  event.preventDefault();
  let userData = {
    email: $('#signup_email').val().trim(),
    password: $('#signup_password').val().trim(),
    first_name: $('#signup_first_name').val().trim(),
    last_name: $('#signup_last_name').val().trim()
  }
  console.log(userData)
  $.ajax('/api/signup', {
    type: 'POST',
    data: userData
  }).then(function (data) {
    window.location.replace(data);
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
  $.ajax('/api/login', {
    type: 'POST',
    data: userData
  }).then(function (data) {
    window.location.replace(data);
  }).catch(function (error) {
    console.log(error);
  });
});


