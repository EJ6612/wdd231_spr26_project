const form = document.querySelector("#sell-form");
const saveDraftButton = document.querySelector("#save-draft");

saveDraftButton.addEventListener("click", () => {

    const draft = {

        title: document.querySelector("#title").value,

        category: document.querySelector("#category").value,

        price: document.querySelector("#price").value,

        description: document.querySelector("#description").value,

        condition: document.querySelector(
            'input[name="condition"]:checked'
        ).value

    };

    localStorage.setItem(
        "studentStoreDraft",
        JSON.stringify(draft)
    );

    alert("Draft saved successfully!");

});
const savedDraft = JSON.parse(
    localStorage.getItem("studentStoreDraft")
);

if (savedDraft) {

    document.querySelector("#title").value =
        savedDraft.title || "";

    document.querySelector("#category").value =
        savedDraft.category || "";

    document.querySelector("#price").value =
        savedDraft.price || "";

    document.querySelector("#description").value =
        savedDraft.description || "";

    const condition = document.querySelector(
        `input[name="condition"][value="${savedDraft.condition}"]`
    );

    if (condition) {
        condition.checked = true;
    }

}
form.addEventListener("submit", (event) => {

    event.preventDefault();

    // Save item here...

    localStorage.removeItem("studentStoreDraft");

    alert("Listing posted!");

    form.reset();

});