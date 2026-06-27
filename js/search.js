import data from "../json/items.json" with { type: "json" };
import { populate_item_card } from "./populate_item.js";

// Search form
const searchForm = document.querySelector(".search-form");

// Search input
const searchInput = document.querySelector("#search-input");

// Grid where cards are shown
const itemGrid = document.querySelector("#item-grid");

// Filter controls
const applyFiltersBtn = document.querySelector(".btn--apply-filters");
const minPriceInput = document.querySelector("#price-min");
const maxPriceInput = document.querySelector("#price-max");

// Render item cards into the grid
function renderItems(items) {
    // Clear old results
    itemGrid.innerHTML = "";

    // Show message if nothing matched
    if (items.length === 0) {
        itemGrid.innerHTML = `<li class="no-results">No listings found.</li>`;
        return;
    }

    // Add each item card
    items.forEach(item => {
        itemGrid.appendChild(populate_item_card(item));
    });
}

// Get checked categories
function getSelectedCategories() {
    const checkedBoxes = document.querySelectorAll('input[name="category"]:checked');

    // Return checked values as an array
    return Array.from(checkedBoxes).map(box => box.value.toLowerCase());
}

// Search + filter function
function searchItems() {
    // Get search text
    const query = searchInput.value.trim().toLowerCase();

    // Get selected categories
    const selectedCategories = getSelectedCategories();

    // Get min and max price
    const minPrice = minPriceInput.value ? parseFloat(minPriceInput.value) : 0;
    const maxPrice = maxPriceInput.value ? parseFloat(maxPriceInput.value) : Infinity;

    const filteredItems = data.filter(item => {
        // Match search text
        // If query is empty, treat as a match
        const matchesSearch =
            query === "" ||
            item.ITEM_NAME.toLowerCase().includes(query) ||
            item.DESCRIPTION.toLowerCase().includes(query) ||
            (item.CATEGORIES || []).some(category =>
                category.toLowerCase().includes(query)
            );

        // Match category
        // If no categories are selected, allow all categories
        const matchesCategory =
            selectedCategories.length === 0 ||
            (item.CATEGORIES || []).some(category =>
                selectedCategories.includes(category.toLowerCase())
            );

        // Match price
        const price = Number(item.PRICE);
        const matchesPrice = price >= minPrice && price <= maxPrice;

        // Item must pass all checks
        return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort alphabetically by item name
    filteredItems.sort((a, b) => a.ITEM_NAME.localeCompare(b.ITEM_NAME));

    // Show results
    renderItems(filteredItems);
}

// Show all items when page loads
renderItems(data);

// Search when form is submitted
searchForm.addEventListener("submit", event => {
    event.preventDefault();
    searchItems();
});

// Apply filters when button is clicked
applyFiltersBtn.addEventListener("click", () => {
    searchItems();
});
