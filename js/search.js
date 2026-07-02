import { populate_item_card } from "./populate_item.js";

/**
 * Sets up search and filtering for a collection of items.
 *
 * @param {Array} items - List of items to display.
 * @param {string} emptyMessage - Message shown when no items match.
 */
export function setupSearch(items, emptyMessage = "No listings found.") {
    // ============================================================
    // DOM Elements
    // ============================================================
    const searchForm = document.querySelector(".search-form");
    const searchInput = document.querySelector("#search-input");
    const itemGrid = document.querySelector("#item-grid");

    const applyFiltersBtn = document.querySelector(".btn--apply-filters");
    const minPriceInput = document.querySelector("#price-min");
    const maxPriceInput = document.querySelector("#price-max");

    /**
     * Renders a collection of items.
     *
     * @param {Array} itemsToRender
     */
    function renderItems(itemsToRender) {
        itemGrid.innerHTML = "";

        if (itemsToRender.length === 0) {
            itemGrid.innerHTML = `<li class="no-results">${emptyMessage}</li>`;
            return;
        }

        itemsToRender.forEach((item) => {
            itemGrid.appendChild(populate_item_card(item));
        });
    }

    /**
     * Returns the currently selected categories.
     *
     * @returns {string[]}
     */
    function getSelectedCategories() {
        const checkedBoxes = document.querySelectorAll(
            'input[name="category"]:checked'
        );

        return Array.from(checkedBoxes).map((box) =>
            box.value.toLowerCase()
        );
    }

    /**
     * Applies search text, category filters, and price filters.
     */
    function filterItems() {
        const query = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const selectedCategories = getSelectedCategories();

        const minPrice =
            minPriceInput && minPriceInput.value
                ? parseFloat(minPriceInput.value)
                : 0;

        const maxPrice =
            maxPriceInput && maxPriceInput.value
                ? parseFloat(maxPriceInput.value)
                : Infinity;

        const filteredItems = items.filter((item) => {
            const matchesSearch =
                query === "" ||
                item.ITEM_NAME.toLowerCase().includes(query) ||
                item.DESCRIPTION.toLowerCase().includes(query) ||
                (item.CATEGORIES || []).some((category) =>
                    category.toLowerCase().includes(query)
                );

            const matchesCategory =
                selectedCategories.length === 0 ||
                (item.CATEGORIES || []).some((category) =>
                    selectedCategories.includes(category.toLowerCase())
                );

            const price = Number(item.PRICE);
            const matchesPrice =
                price >= minPrice && price <= maxPrice;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesPrice
            );
        });

        filteredItems.sort((a, b) =>
            a.ITEM_NAME.localeCompare(b.ITEM_NAME)
        );

        renderItems(filteredItems);
    }

    // ============================================================
    // Initial Render
    // ============================================================
    renderItems(items);

    // ============================================================
    // Event Listeners
    // ============================================================
    if (searchForm) {
        searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            filterItems();
        });
    }

    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener("click", filterItems);
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterItems);
    }
}