/* ==========================================
   TEACHER'S DAY LETTER SYSTEM
========================================== */


/*
    =================================================
    LETTER DATA
    =================================================

    Change the questions and answers here.

    The answer is NOT case-sensitive.

    Example:
    answer: "chalk"

    means the user can type:

    chalk
    CHALK
    Chalk

    and all three will work.
*/


const letters = {

    1: {

        title: "Letter for Sir Rajiv",

        clue:
            "Kinwento ko po ito sa inyo Sir! Full name po dapat. Kaya niyo po yan!",

        question:
            "Who discovered the electron?",

        answer:
            "J.J. Thompson",

        image:
            "assets/letter1.jpg",

        body: `

            <p>
                Dear Sir Rajiv,
            </p>

            <p>
                Happy Teacher's Day po, Sir Rajiv!! Thank you po
                for being our Gen-Z adviser and second father 
                to Socrates. 
            </p>

            <p>
                Thank you po kahit makulit ang Socrates, 
                minahal niyo parin po kami (corny) at
                ginuide niyo parin po kami. Lahat talaga
                ng lessons niyo po, mapa physics or
                outside academics ay nag stay po sa akin!! 
                Lalo na yung sinermonan niyo po si Francis (FAC).
                Joke langzzzz nye!
            </p>

            <p>
                Nung Grade 11 pa po kita gusto maging teacher
                kasi narinig ko po sa mga seniors ko po na
                magaling daw po kayo magturo ng Physics...
                Tama nga po sila hehe.
            </p>

            <p>
                In all seriousness, Thank you Sir for being
                the perfect Physics teacher and one of the most
                fun advisers in my academic life po. Hindi po kita 
                makakalimutan Sir, pag nag 90 ako matatandaan parin
                kita as the adviser na super funny pero super galing 
                din sa field nila.
            </p>

             <p>
                Yun lang po sir, Happy Teacher's Day po and enjoy your
                vacation!!! 

                ps. pasalubong B), jokezz!
            </p>

        `,

        signature:
            "With gratitude,<br> Zirel Lara"

    },


    2: {

        title: "Letter for Sir Suarez",

        clue:
            "Topic po natin sa Philosopy last term. Very very very easy",

        question:
            "What refers as the shared meanings constructed by people in their interactions with each other? ",

        answer:
            "Intersubjectivity",

        image:
            "assets/letter2.jpg",

        body: `

            <p>
                Dear Sir Suarez,
            </p>

            <p>
                HAPPY TEACHER'S DAY PO, SIR SUAREZ!!!!!!
                Thank you for being our former co-adviser,
                now new adviser of Socrates hehe. Kahit
                mga 2-3 weeks ka palang po as adviser namin,
                Papa ka na rin po namin! Jokezz!!
            </p>

            <p>
                Thank you sir Suarez for being a great
                Philosopy teacher!! Di ka po mahahalatang
                bagong teacher kasi ang galing niyo po
                magturo and grabe napaka engaging talaga ng
                mga pa games and activites hehe. Weakness 
                ko po talaga ang Philo pero nag enjoy po
                talaga ako nung kayo po yung nagtuturo hehe.
            </p>

            <p>
                Gusto ko lang po sabihin na goodluck sa 
                amin, ay maliii!!! Goodluck po sa teacher
                life and always remember po na you're doing
                a great job po and love na love ka po
                ng Socrates medyo shy palang po sila hehe.

               HAPPY TEACHER'S DAY PO SIRR!!!!!!!
                
            </p>

        `,

        signature:
            "With gratitude, <br> Zirel Lara!"

    }

};



/* ==========================================
   ELEMENTS
========================================== */

const modal =
    document.getElementById("letterModal");

const modalBody =
    document.getElementById("modalBody");



/* ==========================================
   OPEN LETTER
========================================== */

function openLetter(id) {

    const letter = letters[id];

    if (!letter) {
        return;
    }


    createQuestionInterface(letter, id);

    modal.classList.add("active");

}



/* ==========================================
   CREATE QUESTION
========================================== */

function createQuestionInterface(letter, id) {

    modalBody.innerHTML = `

        <div class="question-container">

            <span class="question-label">
                LETTER ${String(id).padStart(2, "0")}
                • LOCKED
            </span>


            <h2 class="question-title">
                One question first...
            </h2>


            <div class="clue-box">

                <strong>CLUE</strong>
                <br>

                ${letter.clue}

            </div>


            <p class="question-text">

                ${letter.question}

            </p>


            <input
                type="text"
                id="answerInput"
                class="password-input"
                placeholder="Type your answer..."
                autocomplete="off"
            >


            <button
                class="unlock-button"
                onclick="checkAnswer(${id})"
            >

                UNLOCK LETTER

            </button>


            <div
                class="wrong-answer"
                id="wrongAnswer"
            ></div>

        </div>

    `;


    const input =
        document.getElementById("answerInput");


    input.focus();


    /*
        Allow Enter key
        to submit the answer.
    */

    input.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                checkAnswer(id);

            }

        }
    );

}



/* ==========================================
   CHECK ANSWER
========================================== */

function checkAnswer(id) {

    const letter = letters[id];

    const input =
        document.getElementById("answerInput");

    const wrongAnswer =
        document.getElementById("wrongAnswer");


    if (!input) {
        return;
    }


    const userAnswer =
        input.value
            .trim()
            .toLowerCase();


    const correctAnswer =
        letter.answer
            .trim()
            .toLowerCase();


    /*
        Correct answer
    */

    if (userAnswer === correctAnswer) {

        showLetter(letter, id);

        return;

    }


    /*
        Wrong answer
    */

    wrongAnswer.textContent =
        "✕ That's not quite right. Try again.";


    input.classList.remove("shake");


    /*
        Restart animation
    */

    void input.offsetWidth;


    input.classList.add("shake");


    input.value = "";

    input.focus();

}



/* ==========================================
   SHOW LETTER
========================================== */

function showLetter(letter, id) {

    const card =
        document.querySelector(
            `.letter-card[data-letter="${id}"]`
        );


    /*
        Change card to unlocked
    */

    if (card) {

        card.classList.remove("locked");

        card.classList.add("unlocked");


        const icon =
            card.querySelector(".lock-icon");


        if (icon) {

            icon.textContent = "🔓";

        }

    }


    /*
        Replace modal content
        with the actual letter.
    */

    modalBody.innerHTML = `

        <div class="opened-letter">

            <span class="open-letter-label">

                LETTER ${String(id).padStart(2, "0")}
                • UNLOCKED

            </span>


            <h2 class="letter-title">

                ${letter.title}

            </h2>


            <img
                src="${letter.image}"
                alt="${letter.title}"
                class="letter-photo"
                onerror="this.style.display='none'"
            >


            <div class="letter-body">

                ${letter.body}

            </div>


            <div class="signature">

                ${letter.signature}

            </div>

        </div>

    `;

}



/* ==========================================
   CLOSE MODAL
========================================== */

function closeModal() {

    modal.classList.remove("active");

}



/* ==========================================
   ESCAPE KEY
========================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeModal();

        }

    }
);
