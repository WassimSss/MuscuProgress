var getHttpRequest = function () {
  var httpRequest = false;

  if (window.XMLHttpRequest) { // Mozilla, Safari,...
    httpRequest = new XMLHttpRequest();
    if (httpRequest.overrideMimeType) {
      httpRequest.overrideMimeType('text/xml');
    }
  }
  else if (window.ActiveXObject) { // IE
    try {
      httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
      try {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (e) { }
    }
  }

  if (!httpRequest) {
    alert('Abandon :( Impossible de créer une instance XMLHTTP');
    return false;
  }

  return httpRequest
}

var addMuscle = document.getElementById('choise_muscle');
var addExercise = document.getElementById('choise_exercise');
var addRepetition = document.getElementById('choise_repetition');
var addWeight = document.getElementById('choise_weight');
var buttonSumbitDay = document.getElementById('submit_day_session');
var testButton = document.getElementById('test');
var allContain = document.querySelector(".all_contain")
var dayRecap = document.querySelector('.all_for_muscle');
var idUser = document.getElementById('id_user');
var allForMuscleSolo = document.getElementsByClassName('all_for_muscle_solo');
var allForMuscleSoloQuery = document.querySelectorAll('.all_for_muscle_solo');
var jsonAllSessionDay;

var httpRequest = getHttpRequest();

function allUniqueValuesInArray(array) { // Créer un array sans les muscles en doublon de la bdd
  var uniqueValues = [];

  for (let i = 0; i < array.length; i++) {
    var input = Object.values(array[i]) //Cibler tout les inputs entrée (ligne dans base de donné) 
    if (!uniqueValues.includes(input[2])) { //Parcours tout les muscles et regarde si il est dans muscleBddUnique
      uniqueValues.push(input[2]) // Si il n'y est pas on l'ajoute
    }
  }
  return uniqueValues;
}

function addHTMLTitleMuscle(jsonObj) { // Fonction qui ajoute un titre en fonction du tableau json, avec les valeurs unique de allUniqueValuesInArray()
  var allUniqueMuscles = allUniqueValuesInArray(jsonObj);  // Tout les Muscles unique

  for (let j = 0; j < allUniqueMuscles.length; j++) { // Parcours tout les Muscles Unique et crée des div
    var allForMuscleDiv = document.createElement('div');
    allForMuscleDiv.classList.add('all_for_muscle_solo');
    var muscleNameCss = allUniqueMuscles[j].replaceAll(' ', '_'); //Permet d'avoir un nom lisible en css
    if (muscleNameCss.search("-")) {
      muscleNameCss = muscleNameCss.replaceAll('-', '_');
    }
    muscleNameCss = `muscle_${muscleNameCss}`;
    allForMuscleDiv.id = muscleNameCss;
    dayRecap.appendChild(allForMuscleDiv);

    var titleMuscle = document.createElement('h3');
    titleMuscle.classList.add('red');
    titleMuscle.innerHTML = allUniqueMuscles[j].replaceAll('_', ' ');
    allForMuscleDiv.appendChild(titleMuscle);
  }
}

function addOneHTMLTitleMuscle(postJsonObj) { //Ajoute seulement une ligne pour la methode post //fetchBdd -> result get / postJsonObj -> result post
  var allForMuscleDiv = document.createElement('div');
  allForMuscleDiv.classList.add('all_for_muscle_solo');
  var muscleNameCss = postJsonObj['muscle'].replaceAll(' ', '_'); //Permet d'avoir un nom lisible en css
  if (muscleNameCss.search("-")) {
    muscleNameCss = muscleNameCss.replaceAll('-', '_');
  }
  muscleNameCss = `muscle_${muscleNameCss}`;
  allForMuscleDiv.id = muscleNameCss;
  dayRecap.appendChild(allForMuscleDiv);

  var titleMuscle = document.createElement('h3');
  titleMuscle.classList.add('red');
  titleMuscle.innerHTML = postJsonObj['muscle'].replaceAll('_', ' ');
  allForMuscleDiv.appendChild(titleMuscle);




}

function addHTMLTitleExercise(jsonObj) { // Créer le titre exercise 
  for (let i = 0; i < jsonObj.length; i++) {
    var line = jsonObj[i] //Regarde ligne par ligne dans la base de donné 
    var exerciceNameCss = `${line['muscle']}_${line['nom_exercise']}`.replaceAll(' ', '_');  //Permet d'avoir un nom lisible en css 
    if (exerciceNameCss.search("-")) {
      exerciceNameCss = exerciceNameCss.replaceAll('-', '_');
    }
    exerciceNameCss = `exercise_${exerciceNameCss}`;

    if (document.getElementById(exerciceNameCss) == null) { //Si existe pas de div avec l'id de l'exercise on crée comme ça on en a que 1
      var exerciseDiv = document.createElement('div');
      exerciseDiv.classList.add('exercise')
      exerciseDiv.id = exerciceNameCss;
      document.getElementById(`muscle_${line['muscle']}`).appendChild(exerciseDiv); // Ajout de l'exercise en fonction dans l'id de son muscle

      var titleExercise = document.createElement('p');
      titleExercise.classList.add('title_exercise');
      titleExercise.innerHTML = line['nom_exercise'].replaceAll('_', ' ');
      document.getElementById(exerciceNameCss).appendChild(titleExercise)

      addHTMLLineExericise(line, exerciceNameCss);
    } else {
      addHTMLLineExericise(line, exerciceNameCss);
    }
  }
}

function addOneHTMLTitleExercice(postJsonObj) {
  console.log(postJsonObj);
  var exerciceNameCss = `${postJsonObj['muscle']}_${postJsonObj['nom_exercise']}`.replaceAll(' ', '_');  //Permet d'avoir un nom lisible en css 
  if (exerciceNameCss.search("-")) {
    exerciceNameCss = exerciceNameCss.replaceAll('-', '_');
  }

  exerciceNameCss = `exercise_${exerciceNameCss}`;

  var exerciseDiv = document.createElement('div');
  exerciseDiv.classList.add('exercise')
  exerciseDiv.id = exerciceNameCss;
  document.getElementById(`muscle_${postJsonObj['muscle']}`).appendChild(exerciseDiv); // Ajout de l'exercise en fonction dans l'id de son muscle

  var titleExercise = document.createElement('p');
  titleExercise.classList.add('title_exercise');
  titleExercise.innerHTML = postJsonObj['nom_exercise'].replaceAll('_', ' ');
  document.getElementById(exerciceNameCss).appendChild(titleExercise)


  // addHTMLLineExericise(line, exerciceNameCss);
  // } else {
  //   addHTMLLineExericise(line, exerciceNameCss);
  // }
}

function addHTMLLineExericise(line, exerciceNameCss) { // Créer les séries 
  console.log();
  var lineExercise = document.createElement('div');
  lineExercise.classList.add('line_exercise', `id${line['id']}`);
  lineExercise.classList.add()
  document.getElementById(exerciceNameCss).insertAdjacentElement('beforeend', lineExercise)

  var sessionNumber = document.createElement('p');
  sessionNumber.innerHTML = `Série` //`Série ${numberSession}`
  // sessionNumberBoucle++;
  lineExercise.appendChild(sessionNumber);

  var weightNumber = document.createElement('p');
  weightNumber.innerHTML = line['poids'].replaceAll('_', ' ');
  lineExercise.appendChild(weightNumber);

  var spanKg = document.createElement('span')
  spanKg.classList.add('red');
  spanKg.innerHTML = 'kg'
  weightNumber.appendChild(spanKg);

  var repetitionNumber = document.createElement('p');
  repetitionNumber.innerHTML = line['repetition'].replaceAll('_', ' ');
  lineExercise.appendChild(repetitionNumber);

  var buttonLogoDelete = document.createElement("button");
  buttonLogoDelete.classList.add(`delete_logo`, `delete_logoid${line['id']}`);
  lineExercise.appendChild(buttonLogoDelete);

  // var logoDelete = document.createElement('ion-icon');
  // logoDelete.setAttribute("name","close-outline");
  // logoDelete.classList.add(`delete_logo${line['id']}`)
  // buttonLogoDelete.appendChild(logoDelete);

  // var test = document.createElement('p');
  // test.innerHTML = line['poids'].replaceAll('_',' ');

}

function addOneHTMLLineExercise(postJsonObj) {
  console.log(postJsonObj);
  var lineExercise = document.createElement('div');
  lineExercise.classList.add('line_exercise');
  document.getElementById(`exercise_${postJsonObj['muscle']}_${postJsonObj['nom_exercise']}`).insertAdjacentElement('beforeend', lineExercise)

  var sessionNumber = document.createElement('p');
  sessionNumber.innerHTML = `Série` // sessionNumber.innerHTML = `Série ${i}` //`Série ${numberSession}`
  // sessionNumberBoucle++;
  lineExercise.appendChild(sessionNumber);

  var weightNumber = document.createElement('p');
  weightNumber.innerHTML = postJsonObj['poids'].replaceAll('_', ' ');
  lineExercise.appendChild(weightNumber);

  var spanKg = document.createElement('span')
  spanKg.classList.add('red');
  spanKg.innerHTML = 'kg'
  weightNumber.appendChild(spanKg);

  var repetitionNumber = document.createElement('p');
  repetitionNumber.innerHTML = postJsonObj['repetition'].replaceAll('_', ' ');
  lineExercise.appendChild(repetitionNumber);

  // var logoDelete = document.createElement('ion-icon');
  // logoDelete.setAttribute("name","close-outline");
  // logoDelete.classList.add(`delete_logo${line['id']}`)
  // lineExercise.appendChild(logoDelete);
  // alert("ok")
}

function deleteAllDiv(parent, deleteClassName) { // Choisi un parent qui va contenir plusieur div avec la class qu'on entre dans le parametre deleteClassName
  var div = parent; //Parent
  var allDivDeleted = document.querySelectorAll(`.${deleteClassName}`);
  for (let i = 0; i < allDivDeleted.length; i++) {
    div.removeChild(allDivDeleted[i]);

  }
}


function hoverDeleteLineExercise() { //STANDBY ALED YANNIS
  var lineExercise = document.querySelectorAll(".line_exercise");
  for (let i = 0; i < lineExercise.length; i++) {
    lineExercise[i].addEventListener("mouseover", function () {
      lineExercise[i].lastChild.style.opacity = "100%"; //lastChild cible le dernier element, le button

      lineExercise[i].lastChild.onclick = function () {
        var recupId = lineExercise[i].lastChild.classList[1]; // Recupere la deuxieme class, la ou il y a l'id
        recupId = recupId.replace('delete_logoid', ''); // recupere une class sous la forme idXXXX, sous la meme forme que la classe de .line_exercise
        console.log(recupId); //Pb je veut recuperer poster "classId" de valeur recupId pour lancer la requete sql avec l'id mais ça marche pas
        var httpRequest = getHttpRequest();

        httpRequest.onreadystatechange = function () {
          if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
              alert("ok")

              var result = JSON.parse(httpRequest.response);
              console.log(result);


            } else {
              alert('impossible de contacterle serveur');
            }
          }
        }

        httpRequest.open('POST', '../config/deleteLineExercise.php', true);
        var data = new FormData()
        data.append('classId', recupId);
        httpRequest.send(data);

      }
    })

    lineExercise[i].addEventListener("mouseout", function () {
      lineExercise[i].lastChild.style.opacity = "0%"; //lastChild cible le dernier element, le button
    })
  }
}

function refrechAllExercise(jsonObj) {
  console.log(jsonObj);
  if (jsonAllSessionDay.length == 0) {
    console.log(jsonAllSessionDay);
    var emptySessionDiv = document.createElement('div');
    emptySessionDiv.classList.add("empty_session_div");
    allContain.insertBefore(emptySessionDiv,dayRecap); // Ajout de l'exercise en fonction dans l'id de son muscle
  
    var emptySessionText = document.createElement('p');
    emptySessionText.classList.add('empty_session_text');
    emptySessionText.innerHTML ="Vous n'avez pas entre de <span class='red'>programme</span> aujourd'hui";
    emptySessionDiv.appendChild(emptySessionText)
  } else {
    addHTMLTitleMuscle(jsonObj);
    addHTMLTitleExercise(jsonObj);
    hoverDeleteLineExercise(); // permet de faire un event listener quand les elements sont charge, avant cela ne marche pas
  }
  // ifEmptySessionDay();
  
}

function allMusclesSelectInput(allMusclesJson) {
  allMusclesJson.forEach(line => {
    console.log(line['muscle']);
    var lineExercise = document.createElement('option');
    lineExercise.setAttribute("value", line["muscle"]);
    lineExercise.innerHTML = line["muscle"].replaceAll('_', ' ');
    addMuscle.insertAdjacentElement('beforeend', lineExercise)


  });
}

function allExercisesSelectInput(allExercisesJson) {
  allExercisesJson.forEach(line => {

    var nameUnbreakableMuscles = line['muscle'].replaceAll(' ', '_');  //Permet d'avoir un nom lisible
    var nameUnbreakableExercise = line['exercise'].replaceAll(' ', '_');  //Permet d'avoir un nom lisible
    if (nameUnbreakableMuscles == addMuscle.value) {
      var lineExercise = document.createElement('option');
      lineExercise.classList.add("select_exercise");
      lineExercise.setAttribute("value", nameUnbreakableExercise);
      lineExercise.innerHTML = line["exercise"].replaceAll('_', ' ');
      addExercise.insertAdjacentElement('beforeend', lineExercise)
    }
  });
}



function fetchJsonObj() { // Retourne en GET et choisi la fonction a executer
  // console.log(httpRequest);
  httpRequest.onreadystatechange = () => {
    // console.log(httpRequest);
    if (httpRequest.readyState == 4) {

      jsonAllSessionDay = JSON.parse(httpRequest.response);
      jsonAllSessionDay = jsonAllSessionDay.reverse();
      console.log(jsonAllSessionDay);

      refrechAllExercise(jsonAllSessionDay) // Appel le refreche avec se qui est trouver en reponse fetch

    }
  }
  httpRequest.open("GET", `../config/fetchExercise.php?id=${idUser.value}`, true);
  httpRequest.send();
}

function fetchJsonObjAllMuscles() { // Prends tout les muscles dans la base de donne pour les affiché dans l'input select
  // console.log(httpRequest);
  httpRequest.onreadystatechange = () => {
    // console.log(httpRequest);
    if (httpRequest.readyState == 4) {
      var jsonAllMuscles = JSON.parse(httpRequest.response);
      allMusclesSelectInput(jsonAllMuscles);
    }
  }
  httpRequest.open("GET", `../config/fetchAllMuscles.php`, true);
  httpRequest.send();
}

function fetchJsonObjAllExercises() { // Prends tout les muscles dans la base de donne pour les affiché dans l'input select
  // console.log(httpRequest);
  httpRequest.onreadystatechange = () => {
    // console.log(httpRequest);
    if (httpRequest.readyState == 4) {

      var result = JSON.parse(httpRequest.response);
      allExercisesSelectInput(result)

    }
  }
  httpRequest.open("GET", `../config/fetchAllExercises.php`, true);
  httpRequest.send();
}

function getId() {

}

function ifEmptySessionDay() {

}

// function deleteDiv(parent, deleteClassName) { // Choisi un parent qui va contenir plusieur div avec la class qu'on entre dans le parametre deleteClassName
//   var div = parent; //Parent
//   var allDivDeleted = document.querySelectorAll(`.${deleteClassName}`);
//   for (let i = 0; i < allDivDeleted.length; i++) {
//     div.removeChild(allDivDeleted[i]);

//   }
// }


fetchJsonObj();
// fetchJsonObjAllMuscles(); Le code est sur la page php directement car il y a des problemes avec pls jsonObj

addMuscle.addEventListener("change", function () {
  // addExercise.innerHTML = "" // Il faut effacer ce qu'il y a avant
  deleteAllDiv(addExercise, "select_exercise"); //Supprime toute les option car ils ont la classe select_exercises
  fetchJsonObjAllExercises(); // Affiche les exercises en fonction du muscle selectionné  
  console.log("test");
})

buttonSumbitDay.addEventListener('click', function (e) {
  e.preventDefault();
  var httpRequest = getHttpRequest();

  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {

        var result = JSON.parse(httpRequest.response);
        console.log(result);

        if(document.querySelector(".empty_session_div") != null){ // Si la div "Aucun programme rentré existe", on doit l'enlever car on viens d'ajouter quelque chose
          deleteAllDiv(allContain, "empty_session_div")
        }

        if (document.getElementById(`muscle_${result['muscle']}`) == null) { // Si le muscle existe 
          addOneHTMLTitleMuscle(result);
          addOneHTMLTitleExercice(result)
          //addOneHTMLLineExercise(result)
          console.log(1);
        }
        if (document.getElementById(`muscle_${result['muscle']}`) != null && document.getElementById(`exercise_${result['muscle']}_${result['nom_exercise']}`) == null) {
          addOneHTMLTitleExercice(result)
          console.log(2);

        }

        if (document.getElementById(`muscle_${result['muscle']}`) != null && document.getElementById(`exercise_${result['muscle']}_${result['nom_exercise']}`) != null) { //Si le muscle et exercise existe
          addOneHTMLLineExercise(result)
          console.log(3);
        }

      } else {
        alert('impossible de contacterle serveur');
      }
    }
  }


  httpRequest.open('POST', '../config/addInBdd.php', true);
  var data = new FormData()

  if (e.target.id === "submit_day_session") {
    data.append('addMuscle', addMuscle.value);
    data.append('addExercise', addExercise.value);
    data.append('addWeight', addWeight.value);
    data.append('addRepetition', addRepetition.value);
    data.append('id', idUser.value);
  }

  httpRequest.send(data);
})
















