var patients = []; var totalRev = 0;

var clockInterval = setInterval(function() {
    var el = document.querySelector("#digital-clock");
    if (el) {
        var n = new Date();
        el.textContent = n.getHours().toString().padStart(2,'0') + ":" + n.getMinutes().toString().padStart(2,'0') + ":" + n.getSeconds().toString().padStart(2,'0');
    }
}, 1000);

window.onscroll = function() {
    var btn = document.querySelector("#up-btn");
    if (window.scrollY > 200) btn.classList.remove("hidden"); else btn.classList.add("hidden");
    var scroll = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
    document.querySelector("#progress-bar").style.width = scroll + "%";
};

function switchSection(id) {
    document.querySelectorAll(".page").forEach(sec => { sec.classList.remove("active"); sec.classList.add("hidden"); });
    document.querySelector("#" + id).classList.remove("hidden");
    document.querySelector("#" + id).classList.add("active");
}

function toggleDarkMode() { document.querySelector("body").classList.toggle("dark-mode"); }
function goTop() { window.scrollTo({top: 0, behavior: 'smooth'}); }

function handleLogin(e) {
    e.preventDefault();
    var name = document.querySelector("#login-username").value;
    var fee = parseInt(document.querySelector("#login-fee").value);
    
    document.querySelector("#logged-user-name").textContent = name;
    patients.push({name, fee});
    totalRev += fee;
    
    document.querySelector("#stat-count").textContent = patients.length;
    document.querySelector("#stat-revenue").textContent = totalRev + "$";
    
    var tbody = document.querySelector("#patient-table-body");
    var row = document.createElement("tr");
    row.innerHTML = `<td class="p-4 border-b">${name}</td><td class="p-4 border-b font-mono">${fee}$</td><td class="p-4 border-b">${new Date().toLocaleTimeString()}</td>`;
    tbody.appendChild(row);
    
    document.querySelector("#login-screen").classList.add("hide-login");
    clearInterval(clockInterval);
}

function addTask() {
    var input = document.querySelector("#task-input");
    if(input.value === "") return;
    var li = document.createElement("li");
    li.className = "p-2 bg-gray-100 rounded cursor-pointer";
    li.textContent = input.value;
    li.onclick = function() { this.remove(); };
    document.querySelector("#task-list").appendChild(li);
    input.value = "";
}