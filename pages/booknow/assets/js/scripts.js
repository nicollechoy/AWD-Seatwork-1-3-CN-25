document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".ticket-options button");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            alert("Feature coming soon!");
        });
    });

    const signUpBtn = document.querySelector(".signup");
    signUpBtn.addEventListener("click", function () {
        alert("Sign-up functionality will be available soon!");
    });

    const activateBtn = document.querySelector(".activate");
    activateBtn.addEventListener("click", function () {
        alert("Card activation coming soon!");
    });
});
