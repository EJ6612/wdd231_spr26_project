import { populate_item_card } from "./populate_item.js";

// Set up search and filters for any list of items
export function setupSearch(items, emptyMessage = "No listings found.") {
    // Page elements
    const searchForm = document.querySelector(".search-form");
    const searchInput = document.querySelector("#search-input");
    const itemGrid = document.querySelector("#item-grid");
    const applyFiltersBtn = document.querySelector(".btn--apply-filters");
    const minPriceInput = document.querySelector("#price-min");
    const maxPriceInput = document.querySelector("#price-max");

    // Show items in the grid
    function renderItems(itemsToRender) {
        itemGrid.innerHTML = "";

        if (itemsToRender.length === 0) {
            itemGrid.innerHTML = `<li class="no-results">${emptyMessage}</li>`;
            return;
        }

        itemsToRender.forEach(item => {
            itemGrid.appendChild(populate_item_card(item));
        });
    }

    // Get checked category values
    function getSelectedCategories() {
        const checkedBoxes = document.querySelectorAll('input[name="category"]:checked');
        return Array.from(checkedBoxes).map(box => box.value.toLowerCase());
    }

    // Run search + filters
    function filterItems() {
        const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
        const selectedCategories = getSelectedCategories();

        const minPrice = minPriceInput && minPriceInput.value
            ? parseFloat(minPriceInput.value)
            : 0;

        const maxPrice = maxPriceInput && maxPriceInput.value
            ? parseFloat(maxPriceInput.value)
            : Infinity;

        const filteredItems = items.filter(item => {
            // Search match
            const matchesSearch =
                query === "" ||
                item.ITEM_NAME.toLowerCase().includes(query) ||
                item.DESCRIPTION.toLowerCase().includes(query) ||
                (item.CATEGORIES || []).some(category =>
                    category.toLowerCase().includes(query)
                );

            // Category match
            const matchesCategory =
                selectedCategories.length === 0 ||
                (item.CATEGORIES || []).some(category =>
                    selectedCategories.includes(category.toLowerCase())
                );

            // Price match
            const price = Number(item.PRICE);
            const matchesPrice = price >= minPrice && price <= maxPrice;

            return matchesSearch && matchesCategory && matchesPrice;
        });

        // Sort by item name
        filteredItems.sort((a, b) => a.ITEM_NAME.localeCompare(b.ITEM_NAME));

        renderItems(filteredItems);
    }

    // Show initial items
    renderItems(items);

    // Search on submit
    if (searchForm) {
        searchForm.addEventListener("submit", event => {
            event.preventDefault();
            filterItems();
        });
    }

    // Apply filters button
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener("click", filterItems);
    }

    // Optional live search
    if (searchInput) {
        searchInput.addEventListener("input", filterItems);
    }
}
