httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {

        var jsonObj = JSON.parse(httpRequest.response); // Objet avec tous
        console.log(jsonObj);
        function addHTMLExercise(allSessionByMuscle, allUniqueMuscleArray) {
          for (let j = 0; j < allUniqueMuscleArray.length; j++) {


            // tester voir se que ça fait mettre dans condition 
            // if(!allUniqueMuscleArray.includes(jsonObjNow['muscle'])){
            var allForMuscleDiv = document.createElement('div');
            allForMuscleDiv.classList.add('all_for_muscle_solo'); //class pour le cible si deja existant
            dayRecap.appendChild(allForMuscleDiv);

            var titleMuscle = document.createElement('h3');
            titleMuscle.classList.add('red');
            titleMuscle.innerHTML = allUniqueMuscleArray[j]; //[0] car il se met en debut de tableau
            allForMuscleDiv.appendChild(titleMuscle);
            // }

            for (let k = 0; k < allSessionByMuscle[j].length; k++) {
              //ça pour mettre un id et class accépté en css
              var line = allSessionByMuscle[j];
              var exerciseNameCss = line['nom_exercise'].replace(' ', '_');
              if (line['nom_exercise'].search("-")) {
                exerciseNameCss = exerciseNameCss.replace('-', '_');
              }

              if (document.getElementById(exerciseNameCss) == null) { // Quand id existe pas, on l'ajoute
                // Donner le nom de l'exo en class a title exo, si document.getElementsById('__') == 0
                // Alors l'exo n'existe pas, l'ajouter avec la série et répétition, sinon ajouter seuelement serie
                var exerciseDiv = document.createElement('div');
                exerciseDiv.classList.add('exercise')
                // exerciseDiv.id = 'exercise'; // Pour le cibler dans l'autre fonction
                allForMuscleDiv.appendChild(document.getElementById(`${line['nom_muscle']}`));

                var titleExercise = document.createElement('p');
                titleExercise.classList.add('title_exercise');
                titleExercise.id = exerciseNameCss
                titleExercise.innerHTML = line['nom_exercise'];
                exerciseDiv.appendChild(titleExercise)
                addHTMLExerciseLine(document.getElementById(exerciseNameCss), line); // ajoute une série a la premiere itération
              } else { // ajoute une série meme après la premiere itération
                addHTMLExerciseLine(document.getElementById(exerciseNameCss), line);
              }
            }
          }
          //addHTMLExerciseLine(exerciseDiv); // Permet de recuperer la variable exercise div

          // et de l'utiliser dans l'autre fonction, car sinon la porter n'est pas global
        }

        function addHTMLExerciseLine(documentIdExercise, line) {


          var lineExercise = document.createElement('div');
          lineExercise.classList.add('line_exercise');
          documentIdExercise.insertAdjacentElement('afterend', lineExercise)

          var sessionNumber = document.createElement('p');
          sessionNumber.innerHTML = `Série` //`Série ${numberSession}`
          // sessionNumberBoucle++;
          lineExercise.appendChild(sessionNumber);

          var weightNumber = document.createElement('p');
          weightNumber.innerHTML = line['poids'];
          lineExercise.appendChild(weightNumber);

          var spanKg = document.createElement('span')
          spanKg.classList.add('red');
          spanKg.innerHTML = 'kg'
          weightNumber.appendChild(spanKg);

          var repetitionNumber = document.createElement('p');
          repetitionNumber.innerHTML = line['repetition'];
          lineExercise.appendChild(repetitionNumber);
        }

        function allUniqueValuesInArray() {
          var uniqueValues = [];

          for (let i = 0; i < array.length; i++) {
            var input = Object.values(array[i]) //Cibler tout les inputs entrée (ligne dans base de donné) 
            if (!uniqueValues.includes(input[2])) { //Parcours tout les muscles et regarde si il est dans muscleBddUnique
              uniqueValues.push(input[2]) // Si il n'y est pas on l'ajoute
            }
          }
          return uniqueValues;
        }


        //Trier les muscles, en les isolants dans un tableau par muscle
        var allUniqueMuscleArray = allUniqueMuscle();
        var allSessionByMuscle = [];
        for (let i = 0; i < allUniqueMuscleArray.length; i++) {  //Parcour le tableau qui contient tout les noms des muscle unique dans la base de donné
          var groupMuscle = []; // vider le tableau a chaque fois qu'on cherche un nouveau muscle

          for (let j = 0; j < jsonObj.length; j++) { // Parcour toute les lignes de la base de donné

            // On parcours tout les muscles et on parcours tout les muscle unique
            if (jsonObj[j]['muscle'] == allUniqueMuscleArray[i]) {
              groupMuscle.push(jsonObj[j]);

              //Prends en compte le dernier muscle, car il ne rentrera jamais dans le else
              if (j == jsonObj.length - 1) {
                allSessionByMuscle.push(groupMuscle);
              }
              //Prends en compte tout sauf le dernier muscle, car il ne rentrera jamais dans le else
            } else if (j == jsonObj.length - 1) {
              allSessionByMuscle.push(groupMuscle);
            }

          }
        }



        addHTMLExercise(allSessionByMuscle, allUniqueMuscleArray);































        // if (jsonObj[0]['muscle'] == jsonObj[1]['muscle']) //Si nom du muscle = avant dernier muscle créer un tableau avec tout les muscles ajouté, pour vérifier si il est deja mis
        // {
        //   if (jsonObj[0]['nom_exercise'] == jsonObj[1]['nom_exercise']) //Si séries existe pour se muscle et cette exercise, on ajoute juste une série
        //   {
        //     var divDouble = document.querySelector(`.${jsonObj[0]['muscle'] + '_' + jsonObj[0]['nom_exercise']}`)
        //     console.log(divDouble)
        //     addHTMLExerciseLine(divDouble)

        //   } else {
        //     // AJOUTER UN EXERCICE, CAR LE NOM MUSCLE = MAIS PAS LE NOM EXO
        //   }
        // } else {
        //   addHTMLExercise();
        // } //jsonObj[0] -> input entrée en dernier, diff de avant dernier 


      } else {
        alert('impossible de contacterle serveur');
      }
    } //2
  }
  httpRequest.open('POST', '../config/addInBdd.php', true);

  var data = new FormData()
  data.append('addMuscle', addMuscle.value);
  data.append('addExercise', addExercise.value);
  data.append('addWeight', addWeight.value);
  data.append('addRepetition', addRepetition.value);
  data.append('id', idUser.value);

  httpRequest.send(data);