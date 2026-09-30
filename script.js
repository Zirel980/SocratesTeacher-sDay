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

        title: "A Letter of Gratitude",

        clue:
            "Think about one of the things teachers use almost every day in the classroom.",

        question:
            "What classroom item is commonly used to write on a traditional blackboard?",

        answer:
            "chalk",

        image:
            "assets/letter1.jpg",

        body: `

            <p>
                Dear Teacher,
            </p>

            <p>
                Thank you for all the patience, guidance,
                and kindness you have given us throughout
                the year.
            </p>

            <p>
                There are lessons that we learn inside the
                classroom, but there are also lessons that
                stay with us long after the school day ends.
            </p>

            <p>
                Thank you for being someone who continues
                to believe in your students and encourages
                us to become better every day.
            </p>

        `,

        signature:
            "With gratitude,<br>Your Student"

    },


    2: {

        title: "A Letter to Remember",

        clue:
            "Think about the person who stands in front of the classroom and guides the lesson.",

        question:
            "What do we commonly call the person who teaches a class?",

        answer:
            "teacher",

        image:
            "assets/letter2.jpg",

        body: `

            <p>
                Dear Teacher,
            </p>

            <p>
                Some school years pass quickly, but the
                people who made those years meaningful
                are remembered.
            </p>

            <p>
                Your words, your reminders, your lessons,
                and even the little moments in the classroom
                can become memories that we carry with us.
            </p>

            <p>
                On this Teacher's Day, I hope you know that
                your efforts matter and that the work you do
                leaves a lasting impact on your students.
            </p>

        `,

        signature:
            "Happy Teacher's Day!<br>Your Student"

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
