document.addEventListener('DOMContentLoaded', () => {

    // --- DATOS DEL CUESTIONARIO ---
    // AQUÍ ES DONDE PEGARÁS LAS PREGUNTAS Y PUNTOS QUE ME ENVÍES DEL PDF
    const quizData = [
        {
            question: "En el último mes, ¿con qué frecuencia ha tenido la sensación de no vaciar completamente la vejiga después de orinar?",
            name: "q1",
            answers: [
                { text: "Nunca", points: 0 },
                { text: "Menos de 1 vez de cada 5", points: 1 },
                { text: "Menos de la mitad de las veces", points: 2 },
                { text: "Aproximadamente la mitad de las veces", points: 3 },
                { text: "Más de la mitad de las veces", points: 4 },
                { text: "Casi siempre", points: 5 }
            ]
        },
        {
            question: "En el último mes, ¿con qué frecuencia ha tenido que volver a orinar en las dos horas siguientes después de haber orinado?",
            name: "q2",
            answers: [
                { text: "Nunca", points: 0 },
                { text: "Menos de 1 vez de cada 5", points: 1 },
                { text: "Menos de la mitad de las veces", points: 2 },
                { text: "Aproximadamente la mitad de las veces", points: 3 },
                { text: "Más de la mitad de las veces", points: 4 },
                { text: "Casi siempre", points: 5 }
            ]
        },
        // ... AÑADIR MÁS PREGUNTAS AQUÍ SIGUIENDO EL MISMO FORMATO
    ];

    // --- ELEMENTOS DEL DOM ---
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizSection = document.getElementById('quiz-section');
    const quizForm = document.getElementById('quiz-form');
    const resultsPanel = document.getElementById('quiz-results');
    const doctorsSection = document.getElementById('medicos');

    // --- FUNCIONES ---

    // Función para cargar y mostrar el cuestionario
    function loadQuiz() {
        quizSection.style.display = 'block';
        let quizHTML = '';

        quizData.forEach((item, index) => {
            quizHTML += `<div class="question-block">`;
            quizHTML += `<p>${index + 1}. ${item.question}</p>`;
            quizHTML += `<div class="answers-group">`;
            item.answers.forEach(answer => {
                quizHTML += `
                    <label>
                        <input type="radio" name="${item.name}" value="${answer.points}" required>
                        ${answer.text}
                    </label>
                `;
            });
            quizHTML += `</div></div>`;
        });

        quizHTML += `<button type="submit" class="btn">Ver Mis Resultados</button>`;
        quizForm.innerHTML = quizHTML;
        
        // Scroll suave hacia el cuestionario
        quizSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Función para calcular y mostrar los resultados
    function showResults(e) {
        e.preventDefault();
        
        let totalPoints = 0;
        const formData = new FormData(quizForm);
        for (const value of formData.values()) {
            totalPoints += parseInt(value);
        }

        let resultHTML = '';
        // Lógica de resultados (AJUSTAR SEGÚN TU INFORMACIÓN)
        if (totalPoints <= 7) {
            resultHTML = `
                <h3>Puntuación: ${totalPoints} - Síntomas Leves</h3>
                <p>Tus síntomas son leves. Te recomendamos mantener un estilo de vida saludable y seguir monitoreando tu salud. Visita nuestro blog para más consejos.</p>
            `;
            doctorsSection.style.display = 'none';
        } else if (totalPoints <= 19) {
            resultHTML = `
                <h3>Puntuación: ${totalPoints} - Síntomas Moderados</h3>
                <p>Tus síntomas son moderados. Es un buen momento para consultar a un especialista y discutir tus opciones. No dejes que afecte tu calidad de vida.</p>
            `;
            doctorsSection.style.display = 'block';
        } else {
            resultHTML = `
                <h3>Puntuación: ${totalPoints} - Síntomas Graves</h3>
                <p>Tus síntomas son severos. Es muy importante que consultes a un médico para una evaluación completa lo antes posible.</p>
            `;
            doctorsSection.style.display = 'block';
        }

        resultsPanel.innerHTML = resultHTML;
        resultsPanel.style.display = 'block';
        resultsPanel.scrollIntoView({ behavior: 'smooth' });
    }

    // --- EVENT LISTENERS ---
    startQuizBtn.addEventListener('click', loadQuiz);
    quizForm.addEventListener('submit', showResults);

});