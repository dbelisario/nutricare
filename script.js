document.addEventListener('DOMContentLoaded', () => {

    // --- DATOS COMPLETOS DEL CUESTIONARIO IPSS (Sin cambios) ---
    const quizData = [
        { title: "Vaciado Incompleto", question: "¿Cuántas veces ha tenido la sensación de no vaciar completamente la vejiga al terminar de orinar?", name: "q1", answers: [ { text: "Ninguna", points: 0 }, { text: "Menos de 1 vez de cada 5", points: 1 }, { text: "Menos de la mitad", points: 2 }, { text: "La mitad de las veces", points: 3 }, { text: "Más de la mitad", points: 4 }, { text: "Casi siempre", points: 5 } ] },
        { title: "Frecuencia", question: "¿Cuántas veces ha tenido que volver a orinar antes de dos horas después de haber orinado?", name: "q2", answers: [ { text: "Ninguna", points: 0 }, { text: "Menos de 1 vez de cada 5", points: 1 }, { text: "Menos de la mitad", points: 2 }, { text: "La mitad de las veces", points: 3 }, { text: "Más de la mitad", points: 4 }, { text: "Casi siempre", points: 5 } ] },
        { title: "Intermitencia", question: "¿Cuántas veces ha notado que, al orinar, paraba y comenzaba de nuevo varias veces?", name: "q3", answers: [ { text: "Ninguna", points: 0 }, { text: "Menos de 1 vez de cada 5", points: 1 }, { text: "Menos de la mitad", points: 2 }, { text: "La mitad de las veces", points: 3 }, { text: "Más de la mitad", points: 4 }, { text: "Casi siempre", points: 5 } ] },
        { title: "Urgencia", question: "¿Cuántas veces ha tenido dificultad para aguantarse las ganas de orinar?", name: "q4", answers: [ { text: "Ninguna", points: 0 }, { text: "Menos de 1 vez de cada 5", points: 1 }, { text: "Menos de la mitad", points: 2 }, { text: "La mitad de las veces", points: 3 }, { text: "Más de la mitad", points: 4 }, { text: "Casi siempre", points: 5 } ] },
        { title: "Chorro Débil", question: "¿Cuántas veces ha observado que el chorro de orina es débil?", name: "q5", answers: [ { text: "Ninguna", points: 0 }, { text: "Menos de 1 vez de cada 5", points: 1 }, { text: "Menos de la mitad", points: 2 }, { text: "La mitad de las veces", points: 3 }, { text: "Más de la mitad", points: 4 }, { text: "Casi siempre", points: 5 } ] },
        { title: "Esfuerzo", question: "¿Cuántas veces ha tenido que apretar o hacer fuerza para comenzar a orinar?", name: "q6", answers: [ { text: "Ninguna", points: 0 }, { text: "Menos de 1 vez de cada 5", points: 1 }, { text: "Menos de la mitad", points: 2 }, { text: "La mitad de las veces", points: 3 }, { text: "Más de la mitad", points: 4 }, { text: "Casi siempre", points: 5 } ] },
        { title: "Nicturia", question: "¿Cuántas veces ha tenido que levantarse a orinar durante la noche?", name: "q7", answers: [ { text: "Ninguna", points: 0 }, { text: "1 vez", points: 1 }, { text: "2 veces", points: 2 }, { text: "3 veces", points: 3 }, { text: "4 veces", points: 4 }, { text: "5 o más veces", points: 5 } ] },
        { title: "Calidad de Vida", question: "Si tuviera que pasar el resto de su vida con sus síntomas urinarios tal como están ahora, ¿cómo se sentiría?", name: "q_quality", answers: [ { text: "Encantado", points: 0 }, { text: "Muy satisfecho", points: 1 }, { text: "Más bien satisfecho", points: 2 }, { text: "Indiferente", points: 3 }, { text: "Más bien insatisfecho", points: 4 }, { text: "Muy insatisfecho", points: 5 }, { text: "Fatal", points: 6 } ] }
    ];

    // --- ESTADO DEL CUESTIONARIO ---
    let currentQuestionIndex = 0;
    const userAnswers = {};

    // --- ELEMENTOS DEL DOM ---
    const mainHeader = document.getElementById('main-header');
    const heroSection = document.getElementById('hero');
    const contentWrapper = document.getElementById('content-wrapper');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizSection = document.getElementById('quiz-section');
    const quizBox = document.getElementById('quiz-box');
    const questionContainer = document.getElementById('question-container');
    const progressBar = document.getElementById('progress-bar');
    const prevBtn = document.getElementById('prev-btn');
    const resultsPanel = document.getElementById('quiz-results');
    const doctorsSection = document.getElementById('medicos');

    // --- FUNCIONES ---
    function startQuiz(event) {
        event.preventDefault();
        // **NUEVO: Ocultar secciones para el "modo enfoque"**
        mainHeader.style.display = 'none';
        heroSection.style.display = 'none';
        contentWrapper.style.display = 'none';

        quizSection.style.display = 'block';
        quizBox.style.display = 'block'; 
        
        quizBox.style.display = 'block';
        quizSection.scrollIntoView({ behavior: 'smooth' });
        displayQuestion();
    }

    function displayQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        let answersHTML = '';
        
        currentQuestion.answers.forEach(answer => {
            const isSelected = userAnswers[currentQuestion.name] == answer.points;
            answersHTML += `
                <label class="answer-label ${isSelected ? 'selected' : ''}">
                    <input type="radio" name="${currentQuestion.name}" value="${answer.points}" ${isSelected ? 'checked' : ''}>
                    ${answer.text}
                </label>
            `;
        });

        questionContainer.innerHTML = `
            <h3>${currentQuestion.title}</h3>
            <p>${currentQuestion.question}</p>
            <div class="answers-grid">${answersHTML}</div>
        `;
        
        updateProgress();
        updateNavigation();
        addAnswerListeners();
    }

    function addAnswerListeners() {
        document.querySelectorAll('.answer-label input').forEach(input => {
            input.addEventListener('change', (e) => {
                userAnswers[e.target.name] = parseInt(e.target.value);
                document.querySelectorAll('.answer-label').forEach(label => label.classList.remove('selected'));
                e.target.parentElement.classList.add('selected');
                setTimeout(handleNext, 300);
            });
        });
    }

    function handleNext() {
        if (userAnswers[quizData[currentQuestionIndex].name] === undefined) return;

        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            calculateAndShowResults();
        }
    }

    function handlePrev() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    }

    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function updateNavigation() {
        prevBtn.style.visibility = currentQuestionIndex === 0 ? 'hidden' : 'visible';
    }

    function calculateAndShowResults() {
        let totalScore = 0;
        for (const key in userAnswers) {
            if (key !== 'q_quality') {
                totalScore += userAnswers[key];
            }
        }

        let severity, message, resultClass;

        if (totalScore <= 7) {
            severity = "SINTOMATOLOGÍA LEVE";
            message = "Tus resultados indican síntomas leves. Es una buena señal, pero es importante seguir monitoreando tu salud.";
            resultClass = 'results-mild';
            doctorsSection.style.display = 'none';
        } else if (totalScore <= 19) {
            severity = "SINTOMATOLOGÍA MODERADA";
            message = "Tus resultados indican síntomas moderados. Te recomendamos encarecidamente que consultes a un especialista para una evaluación.";
            resultClass = 'results-moderate';
            doctorsSection.style.display = 'block';
        } else {
            severity = "SINTOMATOLOGÍA GRAVE";
            message = "Tus resultados indican síntomas graves. Es muy importante que agendes una cita con un urólogo lo antes posible.";
            resultClass = 'results-severe';
            doctorsSection.style.display = 'block';
        }

        quizBox.style.display = 'none';
        resultsPanel.innerHTML = `
            <div class="${resultClass}">
                <p>Tu puntuación total es:</p>
                <h2>${totalScore}</h2>
                <h3>${severity}</h3>
                <p>${message}</p>
            </div>
        `;
        resultsPanel.style.display = 'block';
        
        if(doctorsSection.style.display === 'block') {
            doctorsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqAnswer = button.nextElementSibling;

        button.classList.toggle('active');

        if (button.classList.contains('active')) {
            faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
        } else {
            faqAnswer.style.maxHeight = 0;
        } 
    });
});

    

    // --- EVENT LISTENERS ---
    startQuizBtn.addEventListener('click', startQuiz);
    prevBtn.addEventListener('click', handlePrev);
});
