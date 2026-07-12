const incomeInput = document.querySelector("#income");
const itemsContainer = document.querySelector("#itemsContainer");
const addItemBtn = document.querySelector("#addItemBtn");
const calculateBtn = document.querySelector("#calculateBtn");

const showIncome = document.querySelector("#showIncome");
const showExpense = document.querySelector("#showExpense");
const remaining = document.querySelector("#remaining");
const resultBox = document.querySelector("#resultBox");
const resultLabel = document.querySelector("#resultLabel");

const messageContainer = document.querySelector("#messageContainer");
const message = document.querySelector("#message");
const suggestions = document.querySelector("#suggestions");

const langBtn = document.querySelector("#langBtn");
const langText = document.querySelector("#langText");

let currentLang = "en";

const translations = {
    en: {
        navTitle: "Smart Shopping", navHome: "Home", mainTitle: "Smart Budget Shopping",
        budgetLabel: "Total Budget (Available Money)", budgetPlaceholder: "Enter your available budget",
        listTitle: "Shopping List", itemPricePlaceholder: "Price", itemNamePlaceholder: "Item Name (e.g., Shirt)",
        addItemText: "Add Another Item", calcBtnText: "Calculate Total", cardBudget: "Budget",
        cardSpent: "Total Spent", remaining: "Remaining", deficit: "Current Deficit",
        successMsg: "Great! Your budget is enough and you have a surplus.",
        successSub: "Happy shopping, you are in the safe zone!",
        errorMsg: "Warning: You have exceeded your specified budget!",
        suggestTitle: "💡 To fix the deficit and match your budget, you can return one of these options:",
        returnText: "Returning", willSave: "will save you", coversDeficit: "(covers full deficit)",
        returnMultiple: "Returning these items together:", toSaveTotal: "to save a total of"
    },
    ar: {
        navTitle: "تسوق ذكي", navHome: "الرئيسية", mainTitle: "تسوق ذكي وميزانية دقيقة",
        budgetLabel: "الميزانية الكلية (المبلغ المتاح)", budgetPlaceholder: "أدخل المبلغ الكلي المتاح معك",
        listTitle: "قائمة المشتريات", itemPricePlaceholder: "السعر", itemNamePlaceholder: "اسم الغرض (مثلاً: قميص)",
        addItemText: "إضافة غرض آخر", calcBtnText: "احسب الإجمالي", cardBudget: "الميزانية",
        cardSpent: "إجمالي المشتريات", remaining: "المتبقي", deficit: "العجز الحالي",
        successMsg: "رائع! ميزانيتك تكفي ويوجد فائض معك.",
        successSub: "تسوّق ممتع، أنت في الحدود الآمنة!",
        errorMsg: "تنبيه: لقد تخطيت الميزانية المحددة!",
        suggestTitle: "💡 لتغطية العجز وبلوغ ميزانيتك، يمكنك إرجاع أحد الخيارات التالية:",
        returnText: "إرجاع", willSave: "سيوفر لك", coversDeficit: "(يغطي العجز كاملاً)",
        returnMultiple: "إرجاع الأغراض التالية معاً:", toSaveTotal: "لتوفير إجمالي"
    }
};

langBtn.onclick = function () {
    currentLang = currentLang === "en" ? "ar" : "en";
    langText.textContent = currentLang === "en" ? "العربية" : "English";
    
    document.documentElement.dir = currentLang === "en" ? "ltr" : "rtl";
    document.documentElement.lang = currentLang;

    document.querySelector("#navTitle").textContent = translations[currentLang].navTitle;
    document.querySelector("#navHome").textContent = translations[currentLang].navHome;
    document.querySelector("#mainTitle").textContent = translations[currentLang].mainTitle;
    document.querySelector("#budgetLabel").textContent = translations[currentLang].budgetLabel;
    incomeInput.placeholder = translations[currentLang].budgetPlaceholder;
    document.querySelector("#listTitle").textContent = translations[currentLang].listTitle;
    document.querySelector("#addItemText").textContent = translations[currentLang].addItemText;
    document.querySelector("#calcBtnText").textContent = translations[currentLang].calcBtnText;
    document.querySelector("#cardBudget").textContent = translations[currentLang].cardBudget;
    document.querySelector("#cardSpent").textContent = translations[currentLang].cardSpent;
    
    const isOverBudget = Number(showIncome.textContent) - Number(showExpense.textContent) < 0;
    resultLabel.textContent = isOverBudget ? translations[currentLang].deficit : translations[currentLang].remaining;

    document.querySelectorAll(".item-price").forEach(input => input.placeholder = translations[currentLang].itemPricePlaceholder);
    document.querySelectorAll(".item-name").forEach(input => input.placeholder = translations[currentLang].itemNamePlaceholder);
    
    if (!messageContainer.classList.contains("hidden")) {
        calculateBtn.click();
    }
};

addItemBtn.onclick = function () {
    const newRow = document.createElement("div");
    newRow.className = "item-row grid grid-cols-12 gap-2 items-center";
    newRow.innerHTML = `
        <input type="number" placeholder="${translations[currentLang].itemPricePlaceholder}" class="item-price col-span-4 border border-gray-300 p-2 rounded-lg text-center outline-none focus:border-green-500">
        <input type="text" placeholder="${translations[currentLang].itemNamePlaceholder}" class="item-name col-span-7 border border-gray-300 p-2 rounded-lg outline-none focus:border-green-500">
        <button type="button" onclick="this.parentElement.remove()" class="col-span-1 text-red-500 hover:text-red-700 text-center text-lg">
            <i class="fa-solid fa-trash"></i>
        </button>
    `;
    itemsContainer.appendChild(newRow);
};

calculateBtn.onclick = function () {
    const budget = Number(incomeInput.value) || 0;
    const priceInputs = document.querySelectorAll(".item-price");
    const nameInputs = document.querySelectorAll(".item-name");
    
    let totalSpent = 0;
    let purchasedItems = [];

    priceInputs.forEach((input, index) => {
        const price = Number(input.value) || 0;
        const defaultName = currentLang === "en" ? `Item ${index + 1}` : `غرض ${index + 1}`;
        const name = nameInputs[index].value.trim() || defaultName;
        
        if (price > 0) {
            totalSpent += price;
            purchasedItems.push({ name: name, price: price });
        }
    });

    const diff = budget - totalSpent;
    const t = translations[currentLang];

    showIncome.textContent = budget;
    showExpense.textContent = totalSpent;
    remaining.textContent = Math.abs(diff);

    messageContainer.classList.remove("hidden");
    suggestions.innerHTML = "";

    if (diff >= 0) {
        resultLabel.textContent = t.remaining;
        resultBox.className = "bg-green-100 p-4 rounded-lg border border-green-200 transition-colors duration-300";
        
        messageContainer.className = `mt-6 p-4 rounded-lg border border-green-200 bg-green-50 text-current`;
        message.className = "font-bold text-lg text-green-700";
        message.textContent = t.successMsg;
        suggestions.textContent = t.successSub;
    } else {
        resultLabel.textContent = t.deficit;
        resultBox.className = "bg-red-100 p-4 rounded-lg border border-red-200 transition-colors duration-300";
        
        messageContainer.className = `mt-6 p-4 rounded-lg border border-red-200 bg-red-50 text-current`;
        message.className = "font-bold text-lg text-red-700";
        message.textContent = t.errorMsg;

        const deficit = Math.abs(diff);
        let suggestionHTML = `<p class="font-semibold text-gray-800 mb-2">${t.suggestTitle}</p><ul class="list-disc list-inside space-y-1 text-gray-600">`;

        let singleOptions = purchasedItems.filter(item => item.price >= deficit);
        
        if (singleOptions.length > 0) {
            singleOptions.forEach(item => {
                suggestionHTML += `<li>${t.returnText} <b>[ ${item.name} ]</b> ${t.willSave} ${item.price} ${t.coversDeficit}.</li>`;
            });
        } else {
            let sortedItems = [...purchasedItems].sort((a, b) => b.price - a.price);
            let combinedPrice = 0;
            let combinedNames = [];

            for (let item of sortedItems) {
                combinedPrice += item.price;
                combinedNames.push(item.name);
                if (combinedPrice >= deficit) break;
            }

            if (combinedNames.length > 0) {
                suggestionHTML += `<li>${t.returnMultiple} <b>[ ${combinedNames.join(" + ")} ]</b> ${t.toSaveTotal} ${combinedPrice}.</li>`;
            }
        }

        suggestionHTML += `</ul>`;
        suggestions.innerHTML = suggestionHTML;
    }
};