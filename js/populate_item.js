import data from "../json/items.json" with {type : 'json'};

const feed = document.querySelector("main");
const itemData = data[0];

let item = `<li class="item-card" item-id="001" data-category="textbooks">
                <a class="item-card__link">

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
                        <span class="item-card__category">Textbooks</span>

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
                        <button
                            class="item-card__contact-btn"
                            aria-label="Send a message via ${itemData.CONTACT[0].PLATFORM}"
                            type="button"
                        >
                            <img src="https://cdn.simpleicons.org/${itemData.CONTACT[0].ICON_CODE}" alt="" width="18" height="18">
                        </button>
                        <button
                            class="item-card__contact-btn"
                            aria-label="Send a message via ${itemData.CONTACT[1].PLATFORM}"
                            type="button"
                        >
                            <img src="https://cdn.simpleicons.org/${itemData.CONTACT[1].ICON_CODE}" alt="" width="18" height="18">
                        </button>
                        <button
                            class="item-card__contact-btn"
                            aria-label="Send a message via ${itemData.CONTACT[2].PLATFORM}"
                            type="button"
                        >
                            <img src="https://cdn.simpleicons.org/${itemData.CONTACT[2].ICON_CODE}" alt="" width="18" height="18">
                        </button>
                    </div>
            </li>`;

            feed.innerHTML = item;