"use strict";

let reservedSeats = {
    record1: {
        seat: "b19",
        owner: {
            fname: "Joe",
            lname: "Smith"
        }
    }, record2: {
        seat: "b20",
        owner: {
            fname: "Joe",
            lname: "Smith"
        }
    }, record3: {
        seat: "b21",
        owner: {
            fname: "Joe",
            lname: "Smith"
        }
    }, record4: {
        seat: "b22",
        owner: {
            fname: "Joe",
            lname: "Smith"
        }
    }
};


(() => {
    const createSeatsSwitch = (sectionLength, placement) => {
        const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t"];
        let rowLength = 15;
        let html = "";
        let counter = 1;
        rows.forEach(row => {
            switch (placement) {
                case "left": html += `<div class="label">${row}</div>`; break;
                case "right": counter += rowLength - sectionLength; break;
                default: counter += (rowLength - sectionLength) / 2;
            }

            for (let i = 0; i < sectionLength; i++) {
                html += `<div id="${row + counter}" class="a">${counter}</div>`;
                counter++;
            }

            switch (placement) {
                case "left": counter += rowLength - sectionLength; break;
                case "right": html += `<div class="label">${row}</div>`; break;
                default: counter += (rowLength - sectionLength) / 2;
            }
            document.getElementById(placement).innerHTML = html;
        });

    };

    createSeatsSwitch(3, "left");
    createSeatsSwitch(9, "middle");
    createSeatsSwitch(3, "right");
})();


(() => {
    const selectedSeats = [];
    const availiable = document.querySelectorAll(".a");


    for (const record in reservedSeats) {
        const obj = reservedSeats[record]
        if (reservedSeats.hasOwnProperty(record)) {
            let seat = document.getElementById(obj.seat);
            seat.className = "r";
            seat.innerHTML = "R";
        }
    };

    availiable.forEach(seat => {
        seat.addEventListener("click", function () {
            const index = selectedSeats.indexOf(this.id);
            if (this.getAttribute("class") === "a") {
                this.setAttribute("class", "s");
                selectedSeats.push(this.id);

            } else if (this.getAttribute("class") === "s") {
                this.setAttribute("class", "a");
                selectedSeats.splice(index);
            }
        });
    });

    document.querySelector("#reserve").addEventListener("click", ev => {
        ev.preventDefault();
        document.querySelector("#resform").style.display = "block";
        if (selectedSeats.length < 1) {
            document.querySelector("#confirmres").style.display = "none";
            document.querySelector("#selectedSeats").innerHTML = "<a href='#' id='error'>select</a> your Seates";
            document.querySelector("#error").addEventListener("click", ev => {
                ev.preventDefault();
                document.querySelector("#resform").style.display = "none";
            })
        }
        else {
            let mod = `${selectedSeats} `.replace(/,/g, ", ");
            document.querySelector("#selectedSeats").innerHTML = mod.replace(/,(?=[^,]*$)/, " and");
            document.querySelector("#confirmres").style.display = "block";
        }
    })

    document.querySelector("#cancel").addEventListener("click", ev => {
        ev.preventDefault();
        document.querySelector("#resform").style.display = "none";
    })

    document.querySelector("#confirmbtn").addEventListener("click", ev => {
        ev.preventDefault();
        let counter = Object.keys(reservedSeats).length + 1;
        const fname = document.querySelector("#fname").value;
        const lname = document.querySelector("#lname").value;

        selectedSeats.forEach(id => {
            let record = `record${counter}`;
            reservedSeats[record] = {
                seat: id,
                owner: {
                    fname: fname,
                    lname: lname
                }
            };
            counter++;
            document.querySelector(`#${id}`).className = "r";
            document.querySelector(`#${id}`).innerHTML = "R";
        });
        document.querySelector("#resform").style.display = "none";
        //clearing without deleting
        selectedSeats.length = 0;

    });

})();





