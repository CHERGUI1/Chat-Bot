const inputField = document.getElementById("user-input");
const sendButton = document.querySelector("button");

function sendMessage() {
    const userInput = inputField.value.trim().toLowerCase();
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

function toggleInput(enable) {
    inputField.disabled = !enable;
    sendButton.disabled = !enable;
}

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

function calculateExpression(input) {
    try {
        // استخدام مكتبة math.js لتقييم المعادلة
        const result = math.evaluate(input);
        return `Le résultat est : ${result}`;
    } catch (error) {
        return "Désolé, je n'ai pas compris l'équation. Assurez-vous de saisir correctement l'expression.";
    }
}

function getBotResponse(userInput) {
    // تحقق إذا كان الإدخال يحتوي على رموز حسابية
    if (/[\d+\-*/().]/.test(userInput)) {
        return calculateExpression(userInput);
    }

    const responses = {
                /* swab */
                "merci": ["De rien !", "Avec plaisir !", "Je suis là pour vous aider."],
                "merci bien": ["De rien !", "Je suis content d'avoir pu aider.", "Avec plaisir !"],
                "salut": ["Salut ! Comment puis-je vous aider aujourd'hui ?", "Bonjour !"],
                "bonjour": ["Bonjour ! Que puis-je faire pour vous aujourd'hui ?"],
                "comment ça va ?": ["Je suis juste un bot, mais je fonctionne bien. Et vous ?"],
                "aidez-moi": ["Bien sûr, que puis-je faire pour vous?", "Dites-moi ce dont vous avez besoin.", "Je suis là pour vous aider!"],
                /* question de cour */
                "qu'est-ce que la mécanique du point ?": ["La mécanique du point étudie le mouvement d'un point matériel sous l'effet des forces extérieures."],
                "quelle est la première loi de newton ?": ["La première loi de Newton est la loi d'inertie : un objet en mouvement reste en mouvement à moins qu'une force extérieure n'agisse sur lui."],
                "comment formuler l'équation du mouvement ?": ["L'équation du mouvement selon Newton est F = ma, où F est la force, m la masse, et a l'accélération."],
                "qu'est-ce qu'un référentiel galiléen ?": ["Un référentiel galiléen est un référentiel où la première loi de Newton est valide."],
                "quelle est la quantité de mouvement linéaire ?": ["La quantité de mouvement est donnée par p = mv, où p est la quantité de mouvement, m la masse, et v la vitesse."],
                "qu'est-ce que le travail mécanique ?": ["Le travail mécanique est lié à la variation de l'énergie cinétique d'un corps."],
                /* question sur FST */
                "quels sont les modules du programme de s1 ?": ["Les modules du S1 en FST incluent généralement des matières de base comme les mathématiques, la physique, la chimie, et l'informatique. Ces matières visent à établir des fondations solides pour les filières futures."],
                "quelles sont les matières les plus importantes à maîtriser pour réussir en s1 ?": ["Les mathématiques et la physique sont souvent cruciales pour bien comprendre les concepts des semestres suivants. L’informatique est aussi important pour développer des compétences techniques utiles."],
                "comment bien organiser son emploi du temps pour suivre tous les cours et les td ?" :["Il est recommandé de prioriser les matières où l’on a le plus de difficulté. Utilise un agenda pour répartir le temps de révision, d’exercices et de repos."],
                "y a-t-il des ressources ou des livres recommandés pour chaque module ?" : ["Demande à tes professeurs ou consulte le site de la FST pour connaître les livres conseillés. Utiliser des ressources en ligne comme des plateformes de cours en ligne peut aussi être utile."],
                "comment les cours sont-ils évalués (examens, devoirs, tp, etc.) ?" : ["La note finale de chaque module peut être basée sur une combinaison d’examens, de devoirs, de contrôles continus, et des TP. La répartition exacte est souvent communiquée par chaque professeur."],
                "les cours sont-ils en présentiel ou en distanciel ?" : ["La majorité des cours sont en présentiel. Cependant, certaines ressources et certains supports peuvent être disponibles en ligne."],
                "modules du programme de s1": ["Les modules du S1 en FST incluent généralement des matières de base comme les mathématiques, la physique, la chimie, et l'informatique. Ces matières visent à établir des fondations solides pour les filières futures."],
                "matières importantes s1": ["Les mathématiques et la physique sont souvent cruciales pour bien comprendre les concepts des semestres suivants. L’informatique est aussi important pour développer des compétences techniques utiles."],
                "organisation emploi du temps td": ["Il est recommandé de prioriser les matières où l’on a le plus de difficulté. Utilise un agenda pour répartir le temps de révision, d’exercices et de repos."],
                "ressources livres s1": ["Demande à tes professeurs ou consulte le site de la FST pour connaître les livres conseillés. Utiliser des ressources en ligne comme des plateformes de cours en ligne peut aussi être utile."],
                "évaluation cours": ["La note finale de chaque module peut être basée sur une combinaison d’examens, de devoirs, de contrôles continus, et des TP. La répartition exacte est souvent communiquée par chaque professeur."],
                "cours présentiel distanciel": ["La majorité des cours sont en présentiel. Cependant, certaines ressources et certains supports peuvent être disponibles en ligne."],
                "comment les td et les tp sont-ils organisés ? sont-ils obligatoires ?" : ["Ils sont souvent obligatoires et organisés en petits groupes pour faciliter l’apprentissage. L’inscription dans un groupe est faite par l’administration."],
                "est-il possible de changer de groupe de td ou de tp ?" : ["Cela dépend des disponibilités et de la capacité des salles. Il faut contacter le responsable de la scolarité pour toute demande de changement."],
                "comment se préparer efficacement pour les td et tp ?" : ["Relis tes notes de cours et fais des exercices pratiques en avance pour mieux comprendre les exercices en TD et TP."],
                "les notes des tp influencent-elles les résultats finaux ?" : ["Oui, les notes de TP comptent dans la note finale du module. Chaque enseignant précisera la pondération des TP."],
                "quelles méthodes de travail sont les plus efficaces en première année de fst ?" : ["Lire les cours avant et après chaque session, faire des résumés, et s’entraîner avec des exercices sont des méthodes efficaces. Utilise également des techniques de gestion du temps comme la méthode Pomodoro."],
                //question sur circuit "electrique"
                "qu'est-ce que l'électrocinétique ?": ["L'électrocinétique est la branche de l'électricité qui traite des courants électriques et des tensions dans les circuits.Elle étudie les lois régissant le comportement des charges électriques en mouvement et les composants des circuits."],
                "quelles sont les grandeurs électriques fondamentales ?": [
                     "Les grandeurs de base sont :\n"+
                     "- Courant électrique (I) : Le flux de charges électriques, mesuré en ampères (A).\n"+
                     "- Tension électrique (V) : La différence de potentiel entre deux points, mesurée en volts (V).\n"+
                     "- Résistance (R) : L'opposition au passage du courant, mesurée en ohms (Ω).\n"+
                     "- Conductance (G) : L'inverse de la résistance, mesurée en siemens (S).\n"+
                     "- Puissance électrique (P) : La quantité d'énergie transférée ou consommée par unité de temps, mesurée en watts (W)."],
                "comment est défini le courant électrique ?": ["Le courant électrique est le déplacement des charges électriques dans un conducteur."+"L'unité utilisée pour mesurer le courant est l'ampère (A)."],
                "qu'est-ce que la tension électrique ?": ["La tension électrique, aussi appelée différence de potentiel, est la force qui pousse les électrons à travers un conducteur."],
                "qu'est-ce que la loi d'ohm ?": ["La loi d'ohm relie la tension (V), le courant (I) et la résistance (R) dans un circuit : V = I * R."],
                "comment calculer la puissance électrique ?": ["La puissance électrique se calcule par la formule : P = V * I, où P est la puissance, V la tension et I le courant."],
                "qu'est-ce qu'un circuit série et un circuit parallèle ?": ["Dans un circuit en série, les composants sont connectés bout à bout, tandis que dans un circuit parallèle, les composants sont connectés aux mêmes points de tension, permettant différents chemins pour le courant."],
                "comment calculer la résistance équivalente dans un circuit en série ?": ["La résistance équivalente dans un circuit en série est simplement la somme des résistances individuelles : R_eq = R1 + R2 + ... + Rn."],
                "comment calculer la résistance équivalente dans un circuit en parallèle ?": ["La résistance équivalente dans un circuit en parallèle se calcule par la formule : 1/R_eq = 1/R1 + 1/R2 + ... + 1/Rn."],
    };

    return responses[userInput] ? responses[userInput][Math.floor(Math.random() * responses[userInput].length)] : "Désolé, je n'ai pas compris votre question.";
}

sendButton.addEventListener("click", sendMessage);
inputField.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
