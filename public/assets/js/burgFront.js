$(function() {
    $(".devour").on("click", function(event) {
        let id = $(this).data("id");

        $.ajax("/api/burgers/" + id, {type: "PUT"})
        .then(function() {
            console.log("devoured " + id);
            location.reload();
        });
    });

    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        if ($("#burg").val().trim() !== "") {

            let newBurgy = {
                burger_name: $("#burg").val().trim()
            };

            $.ajax("/api/burgers", { type: "POST", data: newBurgy })
            .then(function() {
                console.log("new burger : " + newBurgy.burger_name);
                location.reload();
            });
        }
    });
});