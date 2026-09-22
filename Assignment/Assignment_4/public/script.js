const form = document.getElementById("requestForm");

const requestId = document.getElementById("requestId");
const studentName = document.getElementById("studentName");
const email = document.getElementById("email");
const category = document.getElementById("category");
const description = document.getElementById("description");
const priority = document.getElementById("priority");

const requestsContainer =
    document.getElementById("requestsContainer");

const submitBtn =
    document.getElementById("submitBtn");


// ==========================
// GET ALL REQUESTS
// ==========================

async function getRequests() {

    try {

        const response = await fetch("/api/requests");

        if (!response.ok) {
            throw new Error("Failed to get requests");
        }

        const requests = await response.json();

        displayRequests(requests);

    } catch (error) {

        console.error(error);

        requestsContainer.innerHTML =
            "<p>Error loading requests.</p>";
    }
}


// ==========================
// DISPLAY REQUESTS
// ==========================

function displayRequests(requests) {

    requestsContainer.innerHTML = "";

    if (requests.length === 0) {

        requestsContainer.innerHTML =
            "<p>No requests submitted yet.</p>";

        return;
    }


    requests.forEach(request => {

        const card = document.createElement("div");

        card.className = "request-card";


        card.innerHTML = `
        
            <h3>${request.studentName}</h3>

            <p>
                <strong>Email:</strong>
                ${request.email}
            </p>

            <p>
                <strong>Category:</strong>
                ${request.category}
            </p>

            <p>
                <strong>Description:</strong>
                ${request.description}
            </p>

            <p>
                <strong>Priority:</strong>
                ${request.priority}
            </p>

            <button
                class="edit-btn"
                onclick="editRequest(${request.id})"
            >
                Edit
            </button>

            <button
                class="delete-btn"
                onclick="deleteRequest(${request.id})"
            >
                Delete
            </button>

        `;


        requestsContainer.appendChild(card);

    });
}


// ==========================
// SUBMIT FORM
// ==========================

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    console.log("Form submitted");


    const data = {

        studentName: studentName.value,

        email: email.value,

        category: category.value,

        description: description.value,

        priority: priority.value

    };


    console.log("Data:", data);


    try {

        let response;


        // UPDATE
        if (requestId.value) {

            response = await fetch(
                `/api/requests/${requestId.value}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(data)
                }
            );

        }

        // CREATE
        else {

            response = await fetch(
                "/api/requests",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(data)
                }
            );

        }


        const result = await response.json();

        console.log("Server response:", result);


        if (!response.ok) {

            throw new Error(
                result.message || "Something went wrong"
            );

        }


        alert(
            requestId.value
                ? "Request updated successfully!"
                : "Request submitted successfully!"
        );


        // Clear form
        form.reset();

        requestId.value = "";

        submitBtn.textContent = "Submit Request";


        // Reload requests
        getRequests();


    } catch (error) {

        console.error("ERROR:", error);

        alert("Error: " + error.message);

    }

});


// ==========================
// EDIT REQUEST
// ==========================

async function editRequest(id) {

    try {

        const response =
            await fetch(`/api/requests/${id}`);

        const request =
            await response.json();


        requestId.value = request.id;

        studentName.value = request.studentName;

        email.value = request.email;

        category.value = request.category;

        description.value = request.description;

        priority.value = request.priority;


        submitBtn.textContent = "Update Request";


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


    } catch (error) {

        console.error(error);

    }

}


// ==========================
// DELETE REQUEST
// ==========================

async function deleteRequest(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this request?");


    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(`/api/requests/${id}`, {

                method: "DELETE"

            });


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(result.message);

        }


        alert("Request deleted successfully!");


        getRequests();


    } catch (error) {

        console.error(error);

        alert("Error: " + error.message);

    }

}


// ==========================
// LOAD REQUESTS
// ==========================

getRequests();