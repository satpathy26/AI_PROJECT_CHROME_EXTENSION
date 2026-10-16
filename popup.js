const button = document.querySelector(".summarize");
const text = document.querySelector(".text");
const loader = document.querySelector(".loader");
const status = document.querySelector(".status");

button.addEventListener("click", () => {

    // Show loading state
    loader.classList.remove("hidden");
    button.disabled = true;

    text.textContent = "";
    status.textContent = "Reading question...";

    chrome.tabs.query(
        {
            active: true,
            currentWindow: true
        },
        (tabs) => {

            if (!tabs || !tabs[0]) {
                finish("Could not find active tab.");
                return;
            }

            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    action: "getSelection"
                },
                (response) => {

                    // Content script connection error
                    if (chrome.runtime.lastError) {

                        finish(
                            "Please refresh the webpage and try again."
                        );

                        console.error(
                            chrome.runtime.lastError.message
                        );

                        return;
                    }

                    const selectedText =
                        response?.selectedText?.trim() || "";

                    console.log("Selected:", selectedText);

                    // Nothing selected
                    if (!selectedText) {

                        finish(
                            "Please select an MCQ first."
                        );

                        return;
                    }

                    status.textContent = "AI is solving...";

                    // Send selected question to background
                    chrome.runtime.sendMessage(
                        {
                            action: "summarize",
                            text: selectedText
                        },
                        (response) => {

                            // Background connection error
                            if (chrome.runtime.lastError) {

                                finish(
                                    "Could not connect to AI service."
                                );

                                console.error(
                                    chrome.runtime.lastError.message
                                );

                                return;
                            }

                            console.log("AI Response:", response);

                            if (!response) {

                                finish(
                                    "No response received from AI."
                                );

                                return;
                            }

                            if (response.error) {

                                finish(
                                    response.error
                                );

                                return;
                            }

                            text.textContent =
                                response.summary ||
                                "No answer generated.";

                            status.textContent =
                                "Solved ✓";

                            loader.classList.add("hidden");
                            button.disabled = false;
                        }
                    );
                }
            );
        }
    );
});


function finish(message) {

    loader.classList.add("hidden");
    button.disabled = false;

    text.textContent = message;
    status.textContent = "Ready";
}
