$(document).ready(function () {
    if (!localStorage.getItem("round")) {
        window.localStorage.setItem("round", "1");
    }

    /*------- R O U N D S -------*/
    document.getElementById("roundNumber").innerHTML = "Runda:&nbsp;" +  window.localStorage.getItem("round");
    localStorage.setItem("round", parseInt(window.localStorage.getItem("round")) + 1);


    let gameOn = true;
    let time = 144000;

    setTimeout(() => {

        if (gameOn) {
            $("#sectors").css("display","none");
            $("#pause").css("display","flex");
        } else {
            $("#pause").css("display","none");
            $("#sectors").css("display","flex");       
        }
        gameOn = !gameOn
        time + 20000;

    }, time);

    /*------- T I M E R -------*/

    let counter = 0;
    let timeLeft = 164;

    convert = s => {
        return "Sledeća runda za " + Math.floor(s / 60) + " min : " + (s % 60) + " sek";
    }

    // TIMER -------------------------------------------------------------<
    setupTimer = () => {
        let timer = document.getElementById("timer");

        timer.innerHTML = convert(timeLeft - counter);

        timeIt = () => {
            counter++;
            timer.innerHTML = convert(timeLeft - counter);
        }

        let countDown = setInterval(timeIt, 1000);
        endTime = () => {
            clearInterval(countDown);
        }
        setTimeout(endTime, 164000);
    }
    setupTimer();
    // -------------------------------------------------------------------<
    // UNIQUE NUMBERS ----------------------------------------------------<
    let uniqueNumbers = [];
    let numOfRandomNum = 48;
    createUniqueNumber = () => {

        if (!uniqueNumbers.length) {
            for (var i = 1; i <= numOfRandomNum; i++) {
                uniqueNumbers.push(i);
            }
        }

        let index = Math.floor(Math.random() * uniqueNumbers.length);
        let val = uniqueNumbers[index];
        uniqueNumbers.splice(index, 1);

        return val;

    }
    createUniqueNumber();
    // -------------------------------------------------------------------<
    // BONUS SPOTS -------------------------------------------------------<
    let bonusSpots = []
    generateBonusSpots = () => {
        let i = 0
        while (i != 2) {
            let bonusSpot = Math.floor(Math.random() * 30) + 6;
            $("#circle" + bonusSpot).append(`<span class="glyphicon glyphicon-star" aria-hidden="true"></span>`);
    
            bonusSpots.push(bonusSpot);
            i++;
        }
    }
    generateBonusSpots();
    // -------------------------------------------------------------------<

    // color - red, capitalLetterColor = Red, translatedColor - CRVENA
    testPart = (i, color, translatedColor, colorNumber, rand) => {
        
        let circleTag = "circle" + i;
      
        //document.getElementById(circleTag).innerHTML = "";
        
        let drum = document.getElementById("drum");
        drum.style.backgroundColor = "#FFF";
        drum.style.border = `20px solid ${color}`;
        drum.style.fontSize = "60px";
        drum.style.transition = "2s ease-in-out";
        drum.setAttribute("class", "currentBall " + color);
        drum.innerHTML = rand;
 
        if (i <= 5) {
          $("#" + circleTag).append(
            `<div id="${circleTag}" class="bigBall ${color}">${rand}</div>`
          );
          
          document.getElementById("firstFive" + i).innerHTML = `${rand}`;
          $("#firstFive" + i).css("border", `4px solid ${color}`);
      
          data2 += rand;
          document.getElementById("data").innerHTML = data2;
      
          if (i == 1) {
            document.getElementById("firstColor").innerHTML = translatedColor;
            $("#firstColor").css("color", `${color}`);
          }
      
          if (rand % 2 == 0) {
            evenOdd[0]++;
            $("#evenBar").css("width", evenOdd[0] * 72);
            $("#numE").html(evenOdd[0]);
          } else {
            evenOdd[1]++;
            $("#oddBar").css("width", evenOdd[1] * 72);
            $("#numO").html(evenOdd[1]);
          }

        } else {
          $("#" + circleTag).append(
            `<div id="${circleTag}" class="smallBall ${color}"><p>${rand}</p></div>`
          );
        }
      
        if (m <= 2) {
          if (bonusSpots.includes(i)) {
            document.getElementById("bonus" + m).innerHTML = `${rand}`;
            $("#bonus" + m).css("border", `4px solid ${color}`);
            m++;
          }
        }
      
        $(`.${color}` + rand).css({ border: `4px solid ${color}`, color: "white" });
        colors[colorNumber]++;
      
        if (colors[colorNumber] == 6) {
          $(".check" + color).css("background-color", `${color}`);
        }
    }

    let i = 1;
    let m = 1;
    // colors [red, green, blue, purple, brown, yellow, orange, black]
    let colors = [0, 0, 0, 0, 0, 0, 0, 0]

    // Even and odd bar values
    let evenOdd = [0, 0]

    var data2 = 0;
    (theLoop = i => {
        setTimeout(function () {
            let rand = createUniqueNumber();
            let numbers = [ 
                {
                    "colorName": "red",
                    "numbers": [1, 9, 17, 25, 33, 41],
                    "colorNumber": 0,
                    "translatedColorName": "CRVENA"
                },
                {
                    "colorName": "green",
                    "numbers": [2, 10, 18, 26, 34, 42],
                    "colorNumber": 1,
                    "translatedColorName": "ZELENA"
                },
                {
                    "colorName": "blue",
                    "numbers": [3, 11, 19, 27, 35, 43],
                    "colorNumber": 2,
                    "translatedColorName": "PLAVA"
                },
                {
                    "colorName": "purple",
                    "numbers": [4, 12, 20, 28, 36, 44],
                    "colorNumber": 3,
                    "translatedColorName": "LJUBIČASTA"
                },
                {
                    "colorName": "brown",
                    "numbers": [5, 13, 21, 29, 37, 45],
                    "colorNumber": 4,
                    "translatedColorName": "BRAON"
                },
                {
                    "colorName": "yellow",
                    "numbers": [6, 14, 22, 30, 38, 46],
                    "colorNumber": 5,
                    "translatedColorName": "ŽUTA"
                },
                {
                    "colorName": "orange",
                    "numbers": [7, 15, 23, 31, 39, 47],
                    "colorNumber": 6,
                    "translatedColorName": "NARANDŽASTA"
                },
                {
                    "colorName": "black",
                    "numbers": [8, 16, 24, 32, 40, 48],
                    "colorNumber": 7,
                    "translatedColorName": "CRNA"
                }
            ];

            numbers.forEach(numbersObject => {
                if (numbersObject["numbers"].includes(rand)) {
                    testPart(i, numbersObject["colorName"], numbersObject["translatedColorName"], numbersObject["colorNumber"], rand);
                }
            });

            if (i == 1 ) {
                // Average - 48/2=24,5
                if (rand > 24.5) {
                    document.getElementById("underAbove").innerHTML = "IZNAD";
                } else {
                    document.getElementById("underAbove").innerHTML = "ISPOD";
                }   
                // Even Odd
                if (rand % 2 == 0) {
                    document.getElementById("evenOdd").innerHTML = "PAR";
                } else {
                    document.getElementById("evenOdd").innerHTML = "NEPAR";
                }
            }
            
            // Data 1 - color bars
            $("#redBar").css("height", colors[0]*7);
            $("#greenBar").css("height", colors[1]*7);
            $("#blueBar").css("height", colors[2]*7);
            $("#purpleBar").css("height", colors[3]*7);
            $("#brownBar").css("height", colors[4]*7);
            $("#yellowBar").css("height", colors[5]*7);
            $("#orangeBar").css("height", colors[6]*7);
            $("#blackBar").css("height", colors[7]*7);

            // Data 2
            if (data2 > 122.5) {
                $(".above").css("color","white");
                $(".under").css("color","#848080");
            } else {
                $(".under").css("color","white");
                $(".above").css("color","#848080");
            }

            if (i++) {
                theLoop(i);
            }

        }, 4000);

    })(1);

    setInterval(function () {
        location.reload();
    },164000);

});
