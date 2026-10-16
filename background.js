
import { solveMCQ } from "./ai.js";

console.log("Background started");

let isSolving = false;

chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {
        if (message.action !== "summarize") {
            return;
        }

        if (isSolving) {
            sendResponse({
                summary: "A question is already being solved. Please wait."
            });
            return;
        }

        if (!message.text?.trim()) {
            sendResponse({
                summary: "Please select an MCQ first."
            });
            return;
        }

        isSolving = true;
        console.log("Received MCQ:", message.text);

        solveMCQ(message.text)
            .then((answer) => {
                console.log("AI Answer:", answer);
                sendResponse({ summary: answer });
            })
            .catch((error) => {
                console.error("AI Error:", error);
                sendResponse({
                    summary: "Failed to solve MCQ. Please try again."
                });
            })
            .finally(() => {
                isSolving = false;
            });

        return true;
    }
);
