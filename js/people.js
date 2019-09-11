
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "http://api.open-notify.org/astros.json",
        dataType: 'json',
        success: function (data) {

            for (let i = 0; i < data.people.length;  i++) {

                let name = data.people[i].name;
                let people = document.getElementById('people')
                people.append(name)

            }
        }
    });
});