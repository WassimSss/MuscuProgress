const variablesScss = {
    "red" : "#F24646",
    "redplus" : "#AF1717",
    "green" : "#009B4A",
    "white" : "#ffffff",
    "grey" : "#898989",
    "greyplus" : "#272727",
    "black" : "#121212"
}

console.log(variablesScss["red"]);

const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
console.log(inputs)
const usernameChecker = (elem) => {
    var idElem = new String("#" + elem.id);
    console.log(elem);
    console.log(idElem);
    if(!elem.value.match(/^[a-zA-Z]*$/) || elem.value.length > 20) { /*Si le nom a autre que lettres /^[a-zA-Z]*$/ */
        $("#label_username").css("color", variablesScss["red"]);
        $("#username").css("color", variablesScss["redplus"]);
    } else {
        $("#label_username").css("color", variablesScss["grey"]);
        $("#username").css("color", variablesScss["white"]);
    }
}

// var verify_once = 0; // Cela va permettre d'appliquer le style que si l'email a déja etait valide une fois
const emailChecker = (elem) => {
    if(!elem.value.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
        // if(verify_once == 1){
            $("#label_email").css("color", variablesScss["red"]);
            $("#email").css("color", variablesScss["redplus"]);
        // }
        
    } else {
        // verify_once = 1;
        $("#label_email").css("color", variablesScss["grey"]);
        $("#email").css("color", variablesScss["white"]);

    }
}
const verifyConditionsPassword = (str) => {
    console.log(str.length)
    console.log(str.search(/[a-z]/))
    if (str.length >= 6 && str.length <= 20) {
        $(".verify_between").css("color", variablesScss["green"]);
    } else {
        $(".verify_between").css("color", variablesScss["grey"]);
    }
    if (str.search(/[0-9]/) != -1) {
        $(".verify_number").css("color", variablesScss["green"]);
    } else {
        $(".verify_number").css("color", variablesScss["grey"]);
    }
    if (str.search(/[a-z]/) != -1) {
        $(".verify_lowercase").css("color", variablesScss["green"]);
    }  else {
        $(".verify_lowercase").css("color", variablesScss["grey"]);
    }
    if (str.search(/[A-Z]/) != -1) {
        $(".verify_uppercase").css("color", variablesScss["green"]);
    } else {
        $(".verify_uppercase").css("color", variablesScss["grey"]);
    }
}

const passwordChecker = (elem) => { 
    verifyConditionsPassword(elem.value);
    if(!elem.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) { /*  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/   -> Entre 6 et 20, 1 chiffre 1 maj et 1 minusc minimum*/

    $("#label_passord").css("color", variablesScss["red"]);
    $("#password").css("color", variablesScss["redplus"]);
    } else {
    $("#label_password").css("color", variablesScss["grey"]);
    $("#password").css("color", variablesScss["white"]);

        if($("#confirm_password").val().length === 0) { //si confirmpassword vide
       
        } 
        else { //si pas vide
            if($("#confirm_password").val() === elem.value) { // on test si pass et conffirm pass pareil
                $("#label_password").css("color", variablesScss["grey"]);
                $("#password").css("color", variablesScss["white"]);
    
                $("#label_confirm_password").css("color", variablesScss["grey"]);
                $("#confirm_password").css("color", variablesScss["white"]);
            } else {
                $("#label_passord").css("color", variablesScss["red"]);
                $("#password").css("color", variablesScss["redplus"]);
    
                $("#label_confirm_passord").css("color", variablesScss["red"]);
                $("#confirm_password").css("color", variablesScss["redplus"]);
            }
        }
    } 

    

    
}

const confirmPasswordChecker = (elem) => {

    if(elem.value != $("#password").val()) {
        $("#label_passord").css("color", variablesScss["red"]);
        $("#password").css("color", variablesScss["redplus"]);
            //console.log(elem); 
        } else {
        $("#label_password").css("color", variablesScss["grey"]);
        $("#password").css("color", variablesScss["white"]);

        if($("#password").val().length === 0) { //si confirmpassword vide
       
        } 
        else { //si pas vide
            if($("#confirm_password").val() === elem.value) { // on test si pass et conffirm pass pareil
                $("#label_password").css("color", variablesScss["grey"]);
                $("#password").css("color", variablesScss["white"]);
    
                $("#label_confirm_password").css("color", variablesScss["grey"]);
                $("#confirm_password").css("color", variablesScss["white"]);
            } else {
                $("#label_passord").css("color", variablesScss["red"]);
                $("#password").css("color", variablesScss["redplus"]);
    
                $("#label_confirm_passord").css("color", variablesScss["red"]);
                $("#confirm_password").css("color", variablesScss["redplus"]);
            }
        }
    }

    
}

inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
        console.log(e.target)
    switch (e.target.id) {
        case "username":
            usernameChecker(e.target);
            break;
        case "email":
            emailChecker(e.target);
            break;
        case "password":
            passwordChecker(e.target);
            break;
        case "confirm_password":
            confirmPasswordChecker(e.target);
            break;
        default:
            null;  
    }

})
});

