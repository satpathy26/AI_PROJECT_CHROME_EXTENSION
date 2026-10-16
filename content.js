chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {

        if (message.action === "getSelection") {

            const selectedText =
                window.getSelection().toString().trim();

            console.log("Selected text:", selectedText);

            sendResponse({
                selectedText: selectedText
            });
        }

        return true;
    }
);
