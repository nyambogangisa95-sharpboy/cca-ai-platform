const apiBase = "/api/ai";

function setStatus(message, isError = false) {
  const status = document.getElementById("status");
  status.textContent = message;
  status.className = isError ? "status error" : "status success";
}

function displayResult(title, text) {
  const section = document.createElement("section");
  section.className = "result-section";

  const heading = document.createElement("h3");
  heading.textContent = title;
  section.appendChild(heading);

  const pre = document.createElement("pre");
  pre.textContent = text;
  section.appendChild(pre);

  const output = document.getElementById("results");
  output.prepend(section);
}

async function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const action = form.dataset.action;

  let path = "";
  let body = {};

  if (action === "chat") {
    path = "/chat";
    body = {
      message: form.message.value,
    };
  } else if (action === "cv") {
    path = "/cv";
    body = {
      education: form.education.value,
      skills: form.skills.value,
      experience: form.experience.value,
      careerGoal: form.careerGoal.value,
    };
  } else if (action === "mentor") {
    path = "/mentor-match";
    body = {
      goals: form.goals.value,
      interests: form.interests.value,
    };
  }

  try {
    setStatus("Sending request...");
    const response = await fetch(`${apiBase}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }

    if (action === "chat") {
      displayResult("Chat Response", data.answer);
    } else if (action === "cv") {
      displayResult("CV Package", data.document);
    } else if (action === "mentor") {
      displayResult("Mentor Match", data.mentorRecommendations);
    }

    setStatus("Response received.");
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Error communicating with the server.", true);
  }
}

function init() {
  document.querySelectorAll("form.api-form").forEach((form) => {
    form.addEventListener("submit", submitForm);
  });
}

window.addEventListener("DOMContentLoaded", init);
