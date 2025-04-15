const dropdownLoc = document.querySelector('.nav-items');

// Function to handle the class changes and dropdown creation
function handleResize() {
    const width = window.innerWidth;

    if (width <= 850) {

        // Select all elements with the class 'content'
        const contentElements = document.querySelectorAll('.content');

        // Hide all content elements
        contentElements.forEach(el => el.classList.add('active'));

        // Create a new dropdown element
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';

        // Create a new dropdown toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'dropdown-toggle';
        toggleButton.textContent = 'Contents';
        dropdown.appendChild(toggleButton);

        // Create a dropdown menu
        const dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'dropdown-menu';
        dropdownMenu.style.display = 'none'; // Initially hidden

        // Append all content elements to the dropdown menu
        contentElements.forEach(el => dropdownMenu.appendChild(el.cloneNode(true)));

        dropdown.appendChild(dropdownMenu);

        // Append the dropdown to the body (or another container)
        dropdownLoc.appendChild(dropdown);

        // Toggle the dropdown menu visibility on button click
        toggleButton.addEventListener('click', () => {
            const isVisible = dropdownMenu.style.display === 'block';
            dropdownMenu.style.display = isVisible ? 'none' : 'block';
        });
    } else {
        // Remove the dropdown if width is more than 850px
        const dropdown = document.querySelector('.dropdown');
        if (dropdown) {
            dropdown.remove();

            // Show all content elements again
            const contentElements = document.querySelectorAll('.content');
            contentElements.forEach(el => el.classList.remove('active'));
        }
    }
}

// Initial check
handleResize();

// Add event listener for window resize
window.addEventListener('resize', handleResize);
