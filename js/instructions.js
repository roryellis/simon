// TARGETS
const instructionsButton = document.querySelector('.instructions-button');
const instructionsModal = document.querySelector('.instructions-modal');
const closeButton = document.querySelector('.close-button');

//LISTENERS
instructionsButton.addEventListener('click', openInstructions);
closeButton.addEventListener('click', closeInstructions);

//FUNCTIONS
function openInstructions() {
    instructionsModal.classList.remove('hidden');
};

function closeInstructions() {
    instructionsModal.classList.add('hidden');
}
