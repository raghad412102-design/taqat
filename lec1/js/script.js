let topBtn = document.querySelector("#topBtn");


window.onscroll = function () {

    if (window.scrollY > 300) {

        topBtn.classList.add("show");

    } else {

        topBtn.classList.remove("show");

    }

};



topBtn.onclick = function (e) {

    e.preventDefault();

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

};



let whatsapp = document.querySelector(".fa-whatsapp");


whatsapp.onclick = function () {

    console.log("WhatsApp button clicked");

};



let counter = 0;


let timer = setInterval(function () {

    counter++;

    console.log("Timer:", counter);


    if (counter === 5) {

        clearInterval(timer);

    }

}, 1000);