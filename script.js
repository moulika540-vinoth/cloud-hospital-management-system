
let patients = [];
let appointments = [];

let patientId = 1;

const patientForm = document.getElementById("patientForm");
const appointmentForm = document.getElementById("appointmentForm");

patientForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("patientName").value.trim();
    const age = document.getElementById("patientAge").value;
    const gender = document.getElementById("patientGender").value;
    const phone = document.getElementById("patientPhone").value.trim();

    const patient = {
        id: patientId++,
        name: name,
        age: age,
        gender: gender,
        phone: phone
    };

    patients.push(patient);

    updateDashboard();
    displayPatients();
    updatePatientDropdown();

    patientForm.reset();

    alert("Patient registered successfully!");
});

function displayPatients() {
    const table = document.getElementById("patientTable");
    table.innerHTML = "";

    patients.forEach(patient => {
        const row = document.createElement("tr");

        const values = [
            patient.id,
            patient.name,
            patient.age,
            patient.gender,
            patient.phone
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            deletePatient(patient.id);
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        table.appendChild(row);
    });
}

function deletePatient(id) {
    patients = patients.filter(patient => patient.id !== id);

    appointments = appointments.filter(
        appointment => appointment.patientId !== id
    );

    updateDashboard();
    displayPatients();
    displayAppointments();
    updatePatientDropdown();
}

function updatePatientDropdown() {
    const dropdown = document.getElementById("appointmentPatient");

    dropdown.innerHTML = '<option value="">Select Patient</option>';

    patients.forEach(patient => {
        const option = document.createElement("option");
        option.value = patient.id;
        option.textContent = patient.name;
        dropdown.appendChild(option);
    });
}

appointmentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const patientId = Number(
        document.getElementById("appointmentPatient").value
    );

    const doctor = document.getElementById("appointmentDoctor").value;
    const date = document.getElementById("appointmentDate").value;

    const patient = patients.find(p => p.id === patientId);

    if (!patient) {
        alert("Please select a valid patient.");
        return;
    }

    if (date < new Date().toISOString().split("T")[0]) {
        alert("Please select today or a future date.");
        return;
    }

    const appointment = {
        patientId: patientId,
        patientName: patient.name,
        doctor: doctor,
        date: date
    };

    appointments.push(appointment);

    updateDashboard();
    displayAppointments();

    appointmentForm.reset();

    alert("Appointment booked successfully!");
});

function displayAppointments() {
    const table = document.getElementById("appointmentTable");
    table.innerHTML = "";

    appointments.forEach(appointment => {
        const row = document.createElement("tr");

        [
            appointment.patientName,
            appointment.doctor,
            appointment.date
        ].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        table.appendChild(row);
    });
}

function updateDashboard() {
    document.getElementById("totalPatients").textContent =
        patients.length;

    document.getElementById("totalAppointments").textContent =
        appointments.length;
}

updateDashboard();
