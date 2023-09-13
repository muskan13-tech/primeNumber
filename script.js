function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }

    return true;
}

function getPrimesInRange(start, end) {
    const primes = [];

    for (let num = start; num <= end; num++) {
        if (isPrime(num)) {
            primes.push(num);
        }
    }

    return primes;
}
document.getElementById("findPrimes").addEventListener("click", function () {
    const startInput = document.getElementById("start");
    const endInput = document.getElementById("end");

    const start = parseInt(startInput.value);
    const end = parseInt(endInput.value);

    const startTime = performance.now();
    const primeNumbers = getPrimesInRange(start, end);
    const endTime = performance.now();

    const timeTaken = endTime - startTime;
    displayResults(primeNumbers, timeTaken);

    startInput.value = "";
    endInput.value = "";

    startInput.focus()
});

function displayResults(primeNumbers, timeTaken) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<h2>Prime Numbers:</h2><p>${primeNumbers.join(", ")}</p>`;
    resultDiv.innerHTML += `<p>Time taken: ${timeTaken.toFixed(2)} milliseconds</p>`;

    // Add the "Details" button
    resultDiv.innerHTML += `<button id="detailsButton">Details</button>`;

    // Add click event listener for the "Details" button
    document.getElementById("detailsButton").addEventListener("click", function () {
        const popup = document.getElementById("popup");
        const popupContent = document.getElementById("popupContent");
        popupContent.innerHTML = `<p>Time taken to determine if a single number is prime: <strong>${(timeTaken / primeNumbers.length).toFixed(2)} milliseconds</strong></p>`;
        popup.style.display = "block";

        // Close the pop-up when clicking outside the content
        popup.addEventListener("click", function (event) {
            if (event.target === popup) {
                popup.style.display = "none";
            }
        });
    });
}
