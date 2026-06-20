export function populate_item_card(data) {

    const itemData = data;

    const itemLI = document.createElement('li');

    itemLI.className = "item-card";

    const contactsHTML = (data.CONTACT || []).map(contact =>
        `<button
            class="item-card__contact-btn"
            aria-label="Send a message via ${contact.PLATFORM}"
            type="button"
            onclick="window.location.href = '${contact.LINK}'"
            >
            <img src="https://cdn.simpleicons.org/${contact.ICON_CODE}" alt="" width="18" height="18">
        </button>`
    ).join("");

    // contact methods can be the following:
    /*    Name          |  code
        - WhatsApp      |  whatsapp
        - FB Messenger  |  messenger
        - Email         |  gmail <- required
        - Signal        |  signal
        - LINE          |  line
        - Instagram     |  instagram
        - Discord       |  discord
        - Telegram      |  telegram
        - iMessage      |  imessage
        - SMS/RCS       |  googlemessages
    */
   // Card can support up to 6 contact methods, but recommended to keep at maximum 3

    const categoriesHTML = (data.CATEGORIES || []).map(category =>
        `<span class="item-card__category">${category}</span>`
    ).join("");

    let html = `<a 
    href="../item-details/index.html?id=${encodeURIComponent(itemData.ITEM_ID)}" 
    class="item-card__link">

                    <!-- Item thumbnail -->
                    <img
                        class="item-card__image"
                        src="${itemData.IMAGE}"
                        alt="Photo of ${itemData.ITEM_NAME}"
                        width="400"
                        height="300"
                        loading="lazy"
                    >

                    <div class="item-card__body">
                        <!-- Category badge -->
                        <div class="item-card__categories">
                            ${categoriesHTML}
                        </div>

                        <!-- Item name -->
                        <h3 class="item-card__title">${itemData.ITEM_NAME}</h3>

                        <!-- Short description -->
                        <p class="item-card__description">
                            ${itemData.DESCRIPTION}
                        </p>

                        <!-- Price -->
                        <p class="item-card__price">${itemData.CURRENCY} $${itemData.PRICE}</p>

                        <!-- Seller info -->
                        <p class="item-card__seller">
                            <span class="visually-hidden">Sold by</span>
                            ${itemData.SELLER_NAME} · ${itemData.DATE_LISTED}
                        </p>
                    </div>

                </a>

                <!-- Contact actions
                    Sits OUTSIDE .item-card__link so the buttons
                    don't trigger the card's navigation.           -->
                    <div class="item-card__actions">
                    ${contactsHTML}
                    </div>`;

    itemLI.innerHTML = html;
    return itemLI;
}