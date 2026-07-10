let btn = document.querySelector("#btn");


window.onscroll = function () {
    console.log(window.scrollY);

    if (window.scrollY > 800) {

        btn.classList.add("show");

    } else {

        btn.classList.remove("show");

    }

};



btn.onclick = function (e) {

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


