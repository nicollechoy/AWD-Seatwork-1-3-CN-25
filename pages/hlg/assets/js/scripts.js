document.addEventListener("DOMContentLoaded", function () { 
    const seats = document.querySelectorAll(".seat");
    const selectedSeatDisplay = document.getElementById("selected-seat");
    const locationSelect = document.getElementById("location");
    const timeSelect = document.getElementById("time");
    const emailInput = document.getElementById("email");
    const paymentSelect = document.getElementById("payment");
    const submitButton = document.getElementById("submit");
    const backButton = document.getElementById("back"); 

    let reservedSeats = loadReservedSeats();
    let selectedSeats = new Set();

    function getReservationKey() {
        return `${locationSelect.value}-${timeSelect.value}`;
    }

    function loadReservedSeats() {
        const savedData = localStorage.getItem("reservedSeats");
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            const now = new Date().getTime();

            if (parsedData.expiration && now > parsedData.expiration) {
                localStorage.removeItem("reservedSeats");
                return {}; 
            }
            return parsedData.data || {};
        }
        return {};
    }

    function saveReservedSeats() {
        const expirationTime = new Date().getTime() + 86400000;
        localStorage.setItem("reservedSeats", JSON.stringify({
            data: reservedSeats,
            expiration: expirationTime
        }));
    }

    function updateSeatColors() {
        const key = getReservationKey();
        if (!reservedSeats[key]) reservedSeats[key] = [];

        seats.forEach(seat => {
            const seatId = seat.dataset.seat;
            seat.classList.remove("reserved", "selected", "hover");

            if (reservedSeats[key].includes(seatId)) {
                seat.classList.add("reserved");
            } else if (selectedSeats.has(seatId)) {
                seat.classList.add("selected");
            }
        });

        updateSelectedSeatsDisplay();
    }

    function updateSelectedSeatsDisplay() {
        selectedSeatDisplay.textContent = selectedSeats.size > 0 
            ? [...selectedSeats].join(", ") 
            : "None";
    }

    seats.forEach(seat => {
        seat.addEventListener("click", function () {
            const key = getReservationKey();

            if (!locationSelect.value || !timeSelect.value) {
                alert("Please select a location and time before choosing a seat.");
                return;
            }

            if (reservedSeats[key] && reservedSeats[key].includes(seat.dataset.seat)) {
                alert("This seat is already reserved.");
                return;
            }

            if (selectedSeats.has(seat.dataset.seat)) {
                selectedSeats.delete(seat.dataset.seat);
                seat.classList.remove("selected");
            } else {
                selectedSeats.add(seat.dataset.seat);
                seat.classList.add("selected");
            }

            updateSelectedSeatsDisplay();
        });
    });

    submitButton.addEventListener("click", function () {
        const key = getReservationKey();

        if (!locationSelect.value) {
            alert("Please select a location.");
            locationSelect.focus();
            return;
        }
        if (!timeSelect.value) {
            alert("Please select a time.");
            timeSelect.focus();
            return;
        }
        if (selectedSeats.size === 0) {
            alert("Please select at least one seat.");
            return;
        }
        if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
            alert("Please enter a valid email.");
            emailInput.focus();
            return;
        }
        if (!paymentSelect.value || paymentSelect.value === "default") {
            alert("Please select a valid payment method.");
            paymentSelect.focus();
            return;
        }

        if (!reservedSeats[key]) reservedSeats[key] = [];
        selectedSeats.forEach(seat => reservedSeats[key].push(seat));

        saveReservedSeats();
        updateSeatColors(); 
        selectedSeats.clear(); 
        updateSelectedSeatsDisplay();

        alert("Booking confirmed!");
    });

    if (backButton) {
        backButton.addEventListener("click", function () {
            window.history.back(); 
        });
    }

    locationSelect.addEventListener("change", updateSeatColors);
    timeSelect.addEventListener("change", updateSeatColors);

    updateSeatColors();
});
