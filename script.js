let useComplexSymbols = true;

function toggleComplexity() {
    useComplexSymbols = !useComplexSymbols;
    const toggleValue = document.getElementById('toggleValue');
    toggleValue.textContent = useComplexSymbols;

    generatePassword();
}

window.onload = function () {
    generatePassword();
};

const slider = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');

// Function to update the text content
function updateSliderValue() {
    lengthValue.textContent = slider.value;
}

// Attach the input event to the slider
slider.addEventListener('input', updateSliderValue);

function generatePassword() {
    let password = "";
    const length = parseInt(document.getElementById("length").value);
    const includeLowercase = document.getElementById("lowercase").checked;
    const includeUppercase = document.getElementById("uppercase").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeSymbols = document.getElementById("symbols").checked;

    // Check for at least one character type selection
    if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
        alert("Please select at least one character type!");
        return;
    }

    const characterSets = [];
    if (includeLowercase) characterSets.push(lowercaseCharacters);
    if (includeUppercase) characterSets.push(uppercaseCharacters);
    if (includeNumbers) characterSets.push(numbers);
    if (includeSymbols) characterSets.push(useComplexSymbols ? complexSymbols : simpleSymbols);

    // Calculate entropy per character set
    const entropyPerSet = characterSets.map(charSet => Math.log2(charSet.length));

    // Calculate overall entropy
    const totalEntropy = entropyPerSet.reduce((acc, ent) => acc + ent, 0) * length;

    // Generate the password
    for (let i = 0; i < length; i++) {
        const characterSet = characterSets[Math.floor(Math.random() * characterSets.length)];
        const characterIndex = Math.floor(Math.random() * characterSet.length);
        password += characterSet[characterIndex];
    }

    // Display the password and entropy
    document.getElementById("password").value = password;
    // Entropy is calculated but not shown directly to the user for security reasons
    // However, you can still perform checks based on it for your internal use.
}

// Character sets for password generation
const lowercaseCharacters = "abcdefghijklmnopqrstuvwxyz".split("");
const uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const numbers = "0123456789".split("");
const simpleSymbols = "!@$".split("");
const complexSymbols = "~`!@#$%^&*()_+-=[]{}|;:,.<>?".split("");