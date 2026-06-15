document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("sell-form");
    const title = document.getElementById("title");
    const category = document.getElementById("category");
    const price = document.getElementById("price");
    const description = document.getElementById("description");
    const imageInput = document.getElementById("image-input");
    const imagePreview = document.getElementById("image-preview");
    const saveDraft = document.getElementById("save-draft");
    const charCount = document.getElementById("char-count");

    description.addEventListener("input", () => {
        charCount.textContent =
            `${description.value.length} / 500 characters`;
    });

    imageInput.addEventListener("change", () => {

        imagePreview.innerHTML = "";

        [...imageInput.files]
            .slice(0, 5)
            .forEach(file => {

                const reader = new FileReader();

                reader.onload = e => {

                    const img = document.createElement("img");

                    img.src = e.target.result;

                    imagePreview.appendChild(img);

                };

                reader.readAsDataURL(file);

            });

    });

    saveDraft.addEventListener("click", () => {

        const draft = {
            title: title.value,
            category: category.value,
            price: price.value,
            description: description.value
        };

        localStorage.setItem(
            "studentStoreDraft",
            JSON.stringify(draft)
        );

        alert("Draft saved.");
    });

    const draft =
        JSON.parse(localStorage.getItem("studentStoreDraft"));

    if (draft) {

        title.value = draft.title || "";
        category.value = draft.category || "";
        price.value = draft.price || "";
        description.value = draft.description || "";

        charCount.textContent =
            `${description.value.length} / 500 characters`;
    }

    form.addEventListener("submit", e => {

        e.preventDefault();

        if (!title.value.trim()) {
            alert("Please enter a title.");
            return;
        }

        if (!category.value) {
            alert("Please select a category.");
            return;
        }

        if (!price.value || Number(price.value) <= 0) {
            alert("Please enter a valid price.");
            return;
        }

        if (!description.value.trim()) {
            alert("Please enter a description.");
            return;
        }

        alert("Listing submitted successfully!");

        localStorage.removeItem("studentStoreDraft");

        form.reset();
        imagePreview.innerHTML = "";
        charCount.textContent = "0 / 500 characters";
    });

});