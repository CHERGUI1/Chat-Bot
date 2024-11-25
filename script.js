const inputField = document.getElementById("user-input");
const sendButton = document.querySelector("button");
let responses = {}; // مكان لتخزين بيانات JSON

// تحميل بيانات الأسئلة والأجوبة من ملف JSON
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        responses = data;
        console.log("Données chargées avec succès :", responses);
    })
    .catch(error => console.error("Erreur lors du chargement du fichier JSON :", error));

// إرسال رسالة المستخدم
function sendMessage() {
    const userInput = inputField.value.trim().toLowerCase(); // تحويل إلى أحرف صغيرة
    if (userInput === "") return;

    addMessageToChat(userInput, "user-message");
    toggleInput(false);
    inputField.value = "";

    const botResponse = getBotResponse(userInput);
    setTimeout(() => {
        addMessageToChat(botResponse, "bot-reponse");
        toggleInput(true);
    }, 1000);
}

// تعطيل أو تفعيل الإدخال
function toggleInput(enable) {
    inputField.disabled = !enable;
    sendButton.disabled = !enable;
}

// إضافة الرسائل إلى واجهة المستخدم
function addMessageToChat(message, className) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.className = className;

    if (className === "bot-reponse") {
        const botImage = document.createElement("img");
        botImage.src = "Header-Bot.png";
        botImage.className = "bot2-image";
        messageElement.appendChild(botImage);
    }

    // استبدال \n بـ <br> لإنشاء سطر جديد
    message = message.replace(/\n/g, "<br>");

    // إضافة النص بعد الصورة
    const messageText = document.createElement("span");
    messageText.innerHTML = message;
    messageElement.appendChild(messageText);

    chatBox.appendChild(messageElement);

    // التمرير التلقائي
    setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 100);
}

// تقييم التعبيرات الرياضية باستخدام math.js
function calculateExpression(input) {
    try {
        const result = math.evaluate(input); // تقييم المعادلة
        return `Le résultat est : ${result}`;
    } catch (error) {
        return null; // إذا لم تكن معادلة صحيحة، إرجاع null
    }
}

// البحث عن أقرب تطابق للسؤال
function findClosestMatch(input) {
    const keys = Object.keys(responses);
    let bestMatch = null;
    let bestScore = 0;

    keys.forEach(key => {
        const score = similarity(key, input);
        if (score > bestScore) {
            bestScore = score;
            bestMatch = key;
        }
    });

    return bestScore > 0.5 ? bestMatch : null; // اعتبر المطابقة جيدة إذا كانت أعلى من 0.5
}

// حساب التشابه بين النصوص
function similarity(s1, s2) {
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    const longerLength = longer.length;

    if (longerLength === 0) return 1.0;

    return (longerLength - editDistance(longer, shorter)) / longerLength;
}

// حساب مسافة التحرير
function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    const costs = new Array(s2.length + 1);

    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;

        for (let j = 0; j <= s2.length; j++) {
            if (i === 0) {
                costs[j] = j;
            } else if (j > 0) {
                const newValue = costs[j - 1];
                costs[j - 1] = lastValue;

                lastValue = s1[i - 1] === s2[j - 1] ? newValue : Math.min(newValue, lastValue, costs[j]) + 1;
            }
        }

        if (i > 0) {
            costs[s2.length] = lastValue;
        }
    }

    return costs[s2.length];
}

// الحصول على رد البوت
function getBotResponse(userInput) {
    // تحقق إذا كان الإدخال يحتوي على رموز حسابية
    const calculationResult = calculateExpression(userInput);
    if (calculationResult) return calculationResult;

    // تحقق من وجود سؤال مطابق في JSON
    const closestMatch = findClosestMatch(userInput);
    if (closestMatch) {
        const possibleAnswers = responses[closestMatch];
        if (Array.isArray(possibleAnswers)) {
            // اختر إجابة عشوائية
            return possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
        } else {
            return possibleAnswers; // إذا كانت الإجابة نصًا واحدًا
        }
    }

    return "Hmm, je ne suis pas sûr d'avoir compris votre question. Pourriez-vous m'aider en précisant un peu plus ?";
}

// الأحداث: زر الإرسال والضغط على Enter
sendButton.addEventListener("click", sendMessage);
inputField.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
