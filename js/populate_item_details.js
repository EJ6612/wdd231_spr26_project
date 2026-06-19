import data from "../json/items.json" with {type : 'json'};

const params = new URLSearchParams(window.location.search);
const itemId = params.get("id");

const item = data.find(entry => entry.ITEM_ID === itemId);

const main = document.querySelector("main");

if (!item) {
    main.innerHTML = 
    `<section class="item-details">
        <h2>Item not found</h2>
        <p>This listing does not exist or may have been removed.</p>
    </section>`;
} else {
    const categoriesHTML = (item.CATEGORIES || [])
        .map(category => `<span class="item-card__category">${category}</span>`)
        .join("");

    const contactsHTML = (item.CONTACT || [])
        .map(contact => `
            <button
                class="item-card__contact-btn"
                aria-label="Send a message via ${contact.PLATFORM}"
                type="button"
                onclick="window.location.href='${contact.LINK}'"
            >
                <img
                    src="https://cdn.simpleicons.org/${contact.ICON_CODE}"
                    alt=""
                    width="18"
                    height="18"
                >
            </button>
        `)
        .join("");

    main.innerHTML = `
        <section class="item-details">
            <img
                class="item-details__image"
                src="${item.IMAGE}"
                alt="Photo of ${item.ITEM_NAME}"
                width="600"
                height="450"
            >

            <div class="item-details__content">
                <div class="item-card__categories">
                    ${categoriesHTML}
                </div>

                <h2 class="item-details__title">${item.ITEM_NAME}</h2>

                <p class="item-details__price">${item.CURRENCY} $${item.PRICE}</p>

                <p class="item-details__seller">
                    <span class="visually-hidden">Sold by</span>
                    ${item.SELLER_NAME} · ${item.DATE_LISTED}
                </p>

                <p class="item-details__description">${item.DESCRIPTION}</p>

                <div class="item-card__actions">
                    ${contactsHTML}
                </div>
            </div>
        </section>
    `;
}