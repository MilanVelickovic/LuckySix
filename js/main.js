$(document).ready(function () {
    if (!localStorage.getItem("round")) {
        window.localStorage.setItem("round", "1")
    }

    /*------- R O U N D S -------*/
    
    document.getElementById("roundNumber").innerHTML = "Round:&nbsp;" +  window.localStorage.getItem("round")
    localStorage.setItem("round", parseInt(window.localStorage.getItem("round")) + 1)


    let gameOn = true
    let time = 144000

    setTimeout(() => {

        if (gameOn) {
            $("#sectors").css("display","none")
            $("#pause").css("display","flex")
        } else {
            $("#pause").css("display","none")
            $("#sectors").css("display","flex")       
        }
        gameOn = !gameOn
        time + 20000

    }, time)

    /*------- T I M E R -------*/

    let counter = 0
    let timeLeft = 164

    convert = s => {
        return "Next round in " + Math.floor(s / 60) + " min : " + (s % 60) + " sec"
    }

    // TIMER -------------------------------------------------------------<
    setupTimer = () => {
        let timer = document.getElementById("timer")

        timer.innerHTML = convert(timeLeft - counter)

        timeIt = () => {
            counter++
            timer.innerHTML = convert(timeLeft - counter)
        }

        let countDown = setInterval(timeIt, 1000)
        endTime = () => {
            clearInterval(countDown)
        }
        setTimeout(endTime, 164000)
    }

    setupTimer()
    
    // -------------------------------------------------------------------<
    // UNIQUE NUMBERS ----------------------------------------------------<

    let uniqueNumbers = []
    let numOfRandomNum = 48
    createUniqueNumber = () => {

        if (!uniqueNumbers.length) {
            for (var i = 1; i <= numOfRandomNum; i++) {
                uniqueNumbers.push(i)
            }
        }

        let index = Math.floor(Math.random() * uniqueNumbers.length);
        let val = uniqueNumbers[index]
        uniqueNumbers.splice(index, 1)

        return val

    }
    createUniqueNumber()

    // -------------------------------------------------------------------<
    // BONUS SPOTS -------------------------------------------------------<

    let bonusSpots = []
    generateBonusSpots = () => {
        let i = 0
        while (i != 2) {
            let bonusSpot = Math.floor(Math.random() * 30) + 6;

            if (!bonusSpots.includes(bonusSpot)) {
                $("#circle" + bonusSpot).append(`<span class="glyphicon glyphicon-star" aria-hidden="true"></span>`);
    
                bonusSpots.push(bonusSpot)
                i++
            }
        }
    }

    generateBonusSpots();

    // -------------------------------------------------------------------<

    let i = 1
    let m = 1
    var data2 = 0

    testPart = (i, color, rand) => {
        
        let circleTag = "circle" + i
        
        let drum = document.getElementById("drum")
        drum.style.backgroundColor = "#FFF"
        drum.style.border = `20px solid ${color}`
        drum.style.fontSize = "60px"
        drum.style.transition = "2s ease-in-out"
        drum.setAttribute("class", "currentBall " + color)
        drum.innerHTML = rand
 
        if (i <= 5) {
          $("#" + circleTag).append(
            `<div id="${circleTag}" class="bigBall ${color}">${rand}</div>`
          )
          
          document.getElementById("firstFive" + i).innerHTML = `${rand}`
          $("#firstFive" + i).css("border", `4px solid ${color}`)
      
          data2 += rand
          document.getElementById("data").innerHTML = data2
      
          if (i == 1) {
            document.getElementById("firstColor").innerHTML = color.toUpperCase()
            $("#firstColor").css("color", `${color}`)
          }
      
          if (rand % 2 == 0) {
            evenOdd[0]++
            $("#evenBar").css("width", evenOdd[0] * 72)
            $("#numE").html(evenOdd[0])
          } else {
            evenOdd[1]++
            $("#oddBar").css("width", evenOdd[1] * 72)
            $("#numO").html(evenOdd[1])
          }

        } else {
          $("#" + circleTag).html(
            `<div id="${circleTag}" class="smallBall ${color}"><p>${rand}</p></div>`
          )
        }
      
        if (m <= 2) {
          if (bonusSpots.includes(i)) {
            document.getElementById("bonus" + m).innerHTML = `${rand}`
            $("#bonus" + m).css("border", `4px solid ${color}`)
            m++
          }
        }
      
        $(`.${color}` + rand).css({ border: `4px solid ${color}`, color: "white" })
        colors[color]++
      
        if (colors[color] == 6) {
          $(".check" + color).css("background-color", `${color}`)
        }
    }

    // Even and odd bar values
    let evenOdd = [0, 0]
    let colors = {
        "red": 0,
        "green": 0,
        "blue": 0,
        "purple": 0, 
        "brown": 0,
        "yellow": 0,
        "orange": 0,
        "black": 0
    }

    let groups = []
    
    for (let c = 0; c < 8; c++) {
        groups.push({
            "colorName": Object.keys(colors)[c],
            "numbers": [c + 1, c + 9, c + 17, c + 25, c + 33, c + 41]
        })
    }

    (theLoop = i => {
        setTimeout(function () {
            let rand = createUniqueNumber()
            
            groups.forEach(group => {
                if (group["numbers"].includes(rand)) {
                    testPart(i, group["colorName"], rand)
                }
            })

            if (i == 1 ) {
                // Average - 48/2=24,5
                if (rand > 24.5) {
                    document.getElementById("underAbove").innerHTML = "ABOVE"
                } else {
                    document.getElementById("underAbove").innerHTML = "BELOW"
                }   
                // Even Odd
                if (rand % 2 == 0) {
                    document.getElementById("evenOdd").innerHTML = "EVEN"
                } else {
                    document.getElementById("evenOdd").innerHTML = "ODD"
                }
            }
            
            // Data 1 - color bars
            Object.keys(colors).forEach(color => {
                $("#" + color + "Bar").css("height", colors[color]*7);
            })

            // Data 2
            if (data2 > 122.5) {
                $(".above").css("color","white")
                $(".below").css("color","#848080")
            } else {
                $(".below").css("color","white")
                $(".above").css("color","#848080")
            }

            if (i++ && i != 36) {
                theLoop(i)
            }

        }, 4000)

    })(1)

    setInterval(function () {
        location.reload()
    }, 164000)

})