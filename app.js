// Function to validate name input (alphabets only)
function isAlphabet(name) {
    const regex = /^[a-zA-Z\s]+$/; // letters and spaces only
    return regex.test(name);
}

// Function to validate a form
function validateForm(formId) {
    const form = document.getElementById(formId);

    form.addEventListener('submit', function (e) {
        let valid = true;

        // Validate Name field
        const nameInput = form.querySelector('#name');
        const nameError = nameInput.nextElementSibling;
        if (!nameInput.value.trim()) {
            nameError.textContent = 'Name is required.';
            nameError.style.display = 'block';
            valid = false;
        } else if (!isAlphabet(nameInput.value.trim())) {
            nameError.textContent = 'Name must contain only letters.';
            nameError.style.display = 'block';
            valid = false;
        } else {
            nameError.style.display = 'none';
        }

        // Validate all other required fields
        form.querySelectorAll('[required]').forEach(input => {
            if (input.id === 'name') return; // already validated
            const error = input.nextElementSibling;
            if (!input.value.trim()) {
                error.style.display = 'block';
                valid = false;
            } else {
                error.style.display = 'none';
            }
        });

        // Stop submission if invalid
        if (!valid) e.preventDefault();
    });
}

// Back to Top button functionality
function backToTopButton() {
    const btn = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
        btn.style.display = window.scrollY > 200 ? "block" : "none";
    });
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('joinForm')) {
        validateForm('joinForm');
    }
    if (document.getElementById('contactForm')) {
        validateForm('contactForm');
    }
    backToTopButton();
});

// Event filtering functionality
function setupEventFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            // Show/hide events based on category
            eventCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Add this to your DOMContentLoaded function
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('joinForm')) {
        validateForm('joinForm');
    }
    if (document.getElementById('contactForm')) {
        validateForm('contactForm');
    }
    backToTopButton();
    setupEventFilters(); // <-- initialize event filters
});
