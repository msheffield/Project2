$("#create-tutor-form").on("submit", function (event) {
    event.preventDefault();
    let userTutorData = {
        firstName: $("#userFirstName").val().trim(),
        lastName: $("#userLastName").val().trim(),
        phoneNumber: $("#userPhoneNumber").val().trim(),
        skillLevel: $("#userSkillLevel").val().trim(),
        description: $("#userDescription").val().trim(),
        grade: $("#userGrade").val().trim(),
        photo: $("#userPhoto").val().trim()
    }
    console.log(userTutorData);
    $.ajax('api/create-tutor', {
        type: 'POST',
        data: userTutorData
    }).then(function (data) {
        window.location.replace(data);
    }).catch(function (error) {
        console.log(error);
    });
});