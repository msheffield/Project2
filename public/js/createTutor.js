$("#create-tutor-submit").on('click', function (event) {
    event.preventDefault();
    console.log('submit clicked');

    var checkedSubjects = [];

    $(".form-check-input").each(function () {
        if ($(this).is(":checked")) {
            checkedSubjects.push($(this).val());
        }
    });

    let userTutorData = {
        firstName: $("#userFirstName").val().trim(),
        lastName: $("#userLastName").val().trim(),
        phoneNumber: $("#userPhoneNumber").val().trim(),
        location: $("#userLocation").val().trim(),
        skillLevel: $("#userSkillLevel").val().trim(),
        description: $("#userDescription").val().trim(),
        grade: $("#userGrade").val().trim(),
        photo: $("#userPhoto").val().trim(),
        accountId: 1,
        subjects: checkedSubjects
    };

    console.log("User Tutor Data:");
    console.log(userTutorData);

    $.ajax('api/tutors', {
        type: "POST",
        data: userTutorData
    }).then(function (data) {
        window.location.replace(data);
    }).catch(function (error) {
        console.log(error);
    });
});