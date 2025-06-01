
 const questions = [
    { question: "Dove passeggiava Luna?", answers: ["Nel parco", "Nel bosco", "Sul mare", "In montagna"], correct: "Nel bosco" },
    { question: "Cosa udì Luna tra i cespugli?", answers: ["Un canto", "Un ruggito", "Un fruscìo", "Un sibilo"], correct: "Un fruscìo" },
    { question: "Chi incontrò Luna nel bosco?", answers: ["Un gatto", "Un lupo", "Uno scoiattolo", "Un cervo"], correct: "Uno scoiattolo" },
    { question: "Quale nome diede Luna allo scoiattolo?", answers: ["Nocciolino", "Castagna", "Riccio", "Fogliolina"], correct: "Nocciolino" },
    { question: "Cosa aveva Nocciolino?", answers: ["Fame", "Una zampina ferita", "Freddo", "Paura"], correct: "Una zampina ferita" },
    { question: "Cosa usò Luna per aiutare Nocciolino?", answers: ["Una coperta", "Un fazzoletto", "Un rametto", "Una sciarpa"], correct: "Una sciarpa" },
    { question: "Cosa portava Luna ogni giorno nel bosco allo scoiattolo?", answers: ["Semi", "Mele", "Noccioline", "Pane"], correct: "Noccioline" },
    { question: "Come si sentiva Nocciolino con Luna?", answers: ["Triste", "Timoroso", "Arrabbiato", "Felice"], correct: "Felice" },
    { question: "Come reagì Luna quando Nocciolino guarì?", answers: ["Era felice ma un po’ triste", "Era arrabbiata", "Era confusa", "Era spaventata"], correct: "Era felice ma un po’ triste" },
    { question: "Cosa fece Nocciolino quando Luna gli disse che poteva tornare libero?", answers: ["Saltò sulla sua testa", "Scappò via sugli alberi", "Saltò sulla sua spalla", "Si nascose"], correct: "Saltò sulla sua spalla" },
    { question: "Dove Nocciolino accompagnava Luna?", answers: ["A scuola", "Nei giochi nel bosco", "Al mercato", "In città"], correct: "Nei giochi nel bosco" },
    { question: "Cosa raccontava Luna a Nocciolino?", answers: ["I suoi sogni", "Le fiabe", "Le barzellette", "I segreti del bosco"], correct: "I suoi sogni" },
    { question: "Cosa diceva Luna quando le chiedevano se avesse un animale domestico?", answers: ["Ho un amico speciale!", "No, non mi piacciono gli animali", "Sì, ho un cane", "Non lo so"], correct: "Ho un amico speciale!" },
    { question: "Dove viveva Nocciolino?", answers: ["Nel parco", "Tra gli alberi", "Nella sua casa", "Nel cortile"], correct: "Tra gli alberi" },
    { question: "Come Luna descriveva la coda di Nocciolino?", answers: ["La più lunga del mondo!", "La più morbida del mondo!", "Arruffata", "Di colore rosso"], correct: "La più morbida del mondo!" },
    { question: "Quale stagione era quando Luna incontrò Nocciolino?", answers: ["Autunno", "Inverno", "Primavera", "Estate"], correct: "Autunno" },
    { question: "Come scricchiolavano le foglie sotto gli stivaletti di Luna?", answers: ["Piano", "Forte", "Leggermente", "Non scricchiolavano"], correct: "Forte" },
    { question: "Come guardava Nocciolino Luna all’inizio?", answers: ["Con sospetto", "Con occhi lucidi", "Con paura", "Con indifferenza"], correct: "Con occhi lucidi" },
    { question: "Cosa rappresentava Nocciolino per Luna?", answers: ["Un amico come tanti", "Un animale da compagnia", "Un amico speciale", "Un mistero"], correct: "Un amico speciale" },
	{ question: "Che tipo di storia è 'Luna e Nocciolino'?", answers: ["Una storia d'avventura", "Una storia di fantascienza", "Una storia di amicizia", "Una storia triste"], correct: "Una storia di amicizia"}
	];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15; // Timer per ogni domanda
let timerInterval;

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("restart-btn").addEventListener("click", startQuiz);

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;

    shuffleArray(questions); // Mescola le domande prima di iniziare

    document.getElementById("story-container").classList.add("hide"); // Nasconde la storia
    document.getElementById("start-btn").classList.add("hide"); // Nasconde il pulsante "Inizia il Quiz"
    document.getElementById("question-container").classList.remove("hide");
    document.getElementById("result-container").classList.add("hide");

    showQuestion();
}


function startTimer() {
    timeLeft = 15;
    document.getElementById("timer-text").innerText = `Tempo: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer-text").innerText = `Tempo: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextQuestion(); // Passa automaticamente alla prossima domanda
        }
    }, 1000);
}

function showQuestion() {
    clearInterval(timerInterval); // Reset del timer
    startTimer(); // Avvia il timer
    document.getElementById("feedback-text").innerText = ""; // Cancella feedback

    const questionData = questions[currentQuestionIndex];
    document.getElementById("question-text").innerText = questionData.question;
    const answerButtons = document.getElementById("answer-buttons");
    answerButtons.innerHTML = "";

    questionData.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.addEventListener("click", () => {
            clearInterval(timerInterval); // Ferma il timer dopo la risposta
            selectAnswer(answer, questionData.correct);
        });
        answerButtons.appendChild(button);
    });

    document.getElementById("next-btn").classList.add("hide");
}

function selectAnswer(selected, correct) {
    const feedback = document.getElementById("feedback-text");

    if (selected === correct) {
        feedback.innerText = "✅ Risposta corretta!";
        feedback.style.color = "green";
        score++;
    } else {
        feedback.innerText = "❌ Risposta errata!";
        feedback.style.color = "red";
    }

    document.getElementById("next-btn").classList.remove("hide");
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        document.getElementById("next-btn").classList.add("hide");
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("question-container").classList.add("hide");
    document.getElementById("result-container").classList.remove("hide");
    document.getElementById("score-text").innerText = `Hai ottenuto ${score} su ${questions.length}!`;

    // Nasconde "Inizia il Quiz" nella schermata dei risultati
    document.getElementById("start-btn").classList.add("hide");

    // Assicura che il pulsante "Ricomincia" sia visibile
    document.getElementById("restart-btn").classList.remove("hide");
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Scambia gli elementi
    }
}

