/* =================================
   CHARVEX TECHNOLOGY UNIVERSITY
   WEBSITE JAVASCRIPT
================================= */


/* =================================
   MOBILE NAVIGATION
================================= */

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");


if (menuToggle && navigation) {

    // Open and close the mobile menu
    menuToggle.addEventListener("click", function () {

        const isOpen = navigation.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });


    // Close the menu after selecting a navigation link
    const navigationLinks = navigation.querySelectorAll("a");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navigation.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.textContent = "☰";

        });

    });


    // Close the menu when the user taps outside it
    document.addEventListener("click", function (event) {

        const clickedInsideMenu = navigation.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {

            navigation.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.textContent = "☰";

        }

    });

}

/* =================================
   AUTOMATIC COPYRIGHT YEAR
================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}
/* =====================================
   CTU O'LEVEL SUBJECT MANAGEMENT
===================================== */

document.addEventListener("DOMContentLoaded", function () {
    const subjectList = document.getElementById("olevelSubjectList");
    const addSubjectButton = document.getElementById("addOlevelSubject");
    const subjectMessage = document.getElementById("olevelSubjectMessage");

    if (!subjectList || !addSubjectButton || !subjectMessage) {
        return;
    }

    const subjects = [
        "English Language",
        "Mathematics",
        "Further Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "Agricultural Science",
        "Economics",
        "Government",
        "Geography",
        "Literature in English",
        "Commerce",
        "Financial Accounting",
        "Christian Religious Studies",
        "Islamic Studies",
        "History",
        "Civic Education",
        "Computer Studies",
        "Data Processing",
        "Technical Drawing",
        "Basic Technology",
        "Home Management",
        "Food and Nutrition",
        "Visual Arts",
        "Music",
        "Physical Education",
        "Yoruba",
        "Igbo",
        "Hausa",
        "French",
        "Other"
    ];

    const grades = [
        "A1", "B2", "B3", "C4", "C5",
        "C6", "D7", "E8", "F9"
    ];

    function createSelect(name, label, options) {
        const select = document.createElement("select");

        select.name = name;
        select.setAttribute("aria-label", label);

        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent =
            name === "olevelSubject[]"
                ? "Select subject"
                : "Select grade";

        select.appendChild(placeholder);

        options.forEach(function (text) {
            const option = document.createElement("option");
            option.value = text;
            option.textContent = text;
            select.appendChild(option);
        });

        return select;
    }

    function createSubjectRow() {
        const row = document.createElement("div");
        row.className = "olevel-subject-row";

        const number = subjectList.querySelectorAll(
            ".olevel-subject-row"
        ).length + 1;

        const subjectSelect = createSelect(
            "olevelSubject[]",
            "Subject " + number,
            subjects
        );

        const gradeSelect = createSelect(
            "olevelGrade[]",
            "Grade for subject " + number,
            grades
        );

        row.appendChild(subjectSelect);
        row.appendChild(gradeSelect);

        return row;
    }

    function updateSubjectOptions() {
        const subjectSelects = subjectList.querySelectorAll(
            'select[name="olevelSubject[]"]'
        );

        const selectedSubjects = Array.from(subjectSelects)
            .map(function (select) {
                return select.value;
            })
            .filter(Boolean);

        subjectSelects.forEach(function (select) {
            const currentValue = select.value;

            Array.from(select.options).forEach(function (option) {
                if (option.value === "") {
                    return;
                }

                option.disabled =
                    selectedSubjects.includes(option.value) &&
                    option.value !== currentValue;
            });
        });
    }

    // Handle selections in both original and newly added rows
    subjectList.addEventListener("change", function (event) {
        if (event.target.matches('select[name="olevelSubject[]"]')) {
            updateSubjectOptions();
        }
    });

    // Add another subject row
    addSubjectButton.addEventListener("click", function () {
        const rowCount = subjectList.querySelectorAll(
            ".olevel-subject-row"
        ).length;

        if (rowCount >= 20) {
            subjectMessage.textContent =
                "You can enter a maximum of 20 subjects per sitting.";
            return;
        }

        subjectList.appendChild(createSubjectRow());

        subjectMessage.textContent =
            "You now have " + (rowCount + 1) +
            " subject rows. Complete at least 5 subjects and grades.";

        updateSubjectOptions();
    });

    // Set the initial state
    updateSubjectOptions();
});
