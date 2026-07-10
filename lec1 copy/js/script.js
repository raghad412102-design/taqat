function switchTab(targetTabId) {
    var tabs = document.querySelectorAll('.tab-content');
    var i = 0;
    while (i < tabs.length) {
        tabs[i].classList.add('hidden');
        tabs[i].classList.remove('block');
        i++;
    }

    var activeTab = document.getElementById(targetTabId);
    activeTab.classList.remove('hidden');
    activeTab.classList.add('block');

    var desktopButtons = document.querySelectorAll('.nav-btn');
    var j = 0;
    while (j < desktopButtons.length) {
        desktopButtons[j].classList.remove('bg-indigo-50', 'text-indigo-600');
        desktopButtons[j].classList.add('text-slate-600', 'hover:bg-slate-50');
        j++;
    }

    var activeDesktopBtn = document.getElementById('btn-' + targetTabId);
    if (activeDesktopBtn) {
        activeDesktopBtn.classList.remove('text-slate-600', 'hover:bg-slate-50');
        activeDesktopBtn.classList.add('bg-indigo-50', 'text-indigo-600');
    }

    var mobileButtons = document.querySelectorAll('nav.md\\:hidden button');
    var k = 0;
    while (k < mobileButtons.length) {
        mobileButtons[k].classList.remove('text-indigo-600');
        mobileButtons[k].classList.add('text-slate-400');
        k++;
    }

    var activeMobileBtn = document.getElementById('mobile-btn-' + targetTabId);
    if (activeMobileBtn) {
        activeMobileBtn.classList.remove('text-slate-400');
        activeMobileBtn.classList.add('text-indigo-600');
    }
}

window.onscroll = function () {
    var topButton = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
        topButton.classList.remove('opacity-0', 'invisible');
        topButton.classList.add('opacity-100', 'visible');
    } else {
        topButton.classList.remove('opacity-100', 'visible');
        topButton.classList.add('opacity-0', 'invisible');
    }
};

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function addTodoTask(event) {
    event.preventDefault();
    var input = document.getElementById('todo-input');
    var taskText = input.value.trim();
    if (taskText === '') return;

    var list = document.getElementById('todo-list');
    var emptyMsg = document.getElementById('todo-empty');

    var li = document.createElement('li');
    li.className = 'flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl hover:border-indigo-100 transition-all group animate-fade-in';

    var span = document.createElement('span');
    span.className = 'text-sm font-medium text-slate-700 transition-all cursor-pointer flex-grow text-right';
    span.innerText = taskText;
    span.onclick = function () {
        span.classList.toggle('line-through');
        span.classList.toggle('text-slate-400');
    };

    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'text-slate-400 hover:text-rose-500 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all px-2 py-1 text-sm';
    deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    deleteBtn.onclick = function () {
        li.remove();
        if (list.children.length === 0) {
            emptyMsg.classList.remove('hidden');
        }
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    emptyMsg.classList.add('hidden');
    input.value = '';
}

function calculateBudget(event) {
    event.preventDefault();
    var incomeInput = document.getElementById('input-income');
    var expenseInput = document.getElementById('input-expense');

    var income = parseFloat(incomeInput.value) || 0;
    var expense = parseFloat(expenseInput.value) || 0;
    var balance = income - expense;

    document.getElementById('display-income').innerText = income.toFixed(2);
    document.getElementById('display-expense').innerText = expense.toFixed(2);
    document.getElementById('display-balance').innerText = balance.toFixed(2);

    var statusCard = document.getElementById('status-card');
    var statusIconContainer = document.getElementById('status-icon-container');
    var statusIcon = document.getElementById('status-icon');
    var statusTitle = document.getElementById('status-title');
    var displayBalance = document.getElementById('display-balance');
    var statusCurrency = document.getElementById('status-currency');

    if (balance < 0) {
        statusCard.className = 'bg-rose-50 border border-rose-100 p-5 rounded-2xl flex items-center gap-4 shadow-sm transition-all duration-300';
        statusIconContainer.className = 'w-12 h-12 rounded-xl bg-rose-500 text-white flex items-center justify-center text-xl shrink-0 transition-colors duration-300';
        statusIcon.className = 'fa-solid fa-triangle-exclamation';
        statusTitle.className = 'text-xs text-rose-700 block font-bold transition-colors duration-300';
        statusTitle.innerText = 'تنبيه: ميزانية سالبة (ديون)';
        displayBalance.className = 'text-lg font-bold text-rose-700 transition-colors duration-300';
        statusCurrency.className = 'text-xs text-rose-600 font-medium';
    } else {
        statusCard.className = 'bg-emerald-50 border border-emerald-100 p-5 rounded-2xl flex items-center gap-4 shadow-sm transition-all duration-300';
        statusIconContainer.className = 'w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl shrink-0 transition-colors duration-300';
        statusIcon.className = 'fa-solid fa-scale-balanced';
        statusTitle.className = 'text-xs text-emerald-700 block font-bold transition-colors duration-300';
        statusTitle.innerText = 'الميزانية آمنة (المتبقي)';
        displayBalance.className = 'text-lg font-bold text-emerald-700 transition-colors duration-300';
        statusCurrency.className = 'text-xs text-emerald-600 font-medium';
    }

    var logTable = document.getElementById('expense-log-table');
    if (logTable.innerText.includes('لا توجد سجلات مالية')) {
        logTable.innerHTML = '';
    }

    var row = document.createElement('tr');
    row.className = 'border-b border-slate-50';

    var cellType = document.createElement('td');
    cellType.className = 'py-3 font-medium text-slate-700';
    cellType.innerText = 'فحص ميزانية وتدفق';

    var cellValue = document.createElement('td');
    cellValue.className = 'py-3 font-semibold text-slate-600';
    cellValue.innerText = 'دخل: ' + income + ' | صرف: ' + expense;

    var cellResult = document.createElement('td');
    cellResult.className = 'py-3 font-bold';
    if (balance < 0) {
        cellResult.classList.add('text-rose-600');
        cellResult.innerText = 'عجز (' + balance.toFixed(2) + ')';
    } else {
        cellResult.classList.add('text-emerald-600');
        cellResult.innerText = 'وفر (' + balance.toFixed(2) + ')';
    }

    row.appendChild(cellType);
    row.appendChild(cellValue);
    row.appendChild(cellResult);
    logTable.insertBefore(row, logTable.firstChild);

    expenseInput.value = '';
}

function clearExpenseLogs() {
    document.getElementById('display-income').innerText = '0.00';
    document.getElementById('display-expense').innerText = '0.00';
    document.getElementById('display-balance').innerText = '0.00';
    document.getElementById('input-income').value = '';
    document.getElementById('input-expense').value = '';

    var statusCard = document.getElementById('status-card');
    var statusIconContainer = document.getElementById('status-icon-container');
    var statusIcon = document.getElementById('status-icon');
    var statusTitle = document.getElementById('status-title');
    var displayBalance = document.getElementById('display-balance');
    var statusCurrency = document.getElementById('status-currency');

    statusCard.className = 'bg-emerald-50 border border-emerald-100 p-5 rounded-2xl flex items-center gap-4 shadow-sm transition-all duration-300';
    statusIconContainer.className = 'w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl shrink-0 transition-colors duration-300';
    statusIcon.className = 'fa-solid fa-scale-balanced';
    statusTitle.className = 'text-xs text-emerald-700 block font-bold transition-colors duration-300';
    statusTitle.innerText = 'الميزانية آمنة (المتبقي)';
    displayBalance.className = 'text-lg font-bold text-emerald-700 transition-colors duration-300';
    statusCurrency.className = 'text-xs text-emerald-600 font-medium';

    document.getElementById('expense-log-table').innerHTML = '<tr><td colspan="3" class="text-center py-8 text-slate-400">لا توجد سجلات مالية مسجلة بعد.</td></tr>';
}

function toggleInterfaceTheme() {
    var body = document.body;
    body.classList.toggle('bg-slate-950');
    body.classList.toggle('text-white');
    body.classList.toggle('bg-slate-50');
    body.classList.toggle('text-slate-800');
}