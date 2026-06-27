import data from "../json/items.json" with {type : 'json'};
import { populate_item_card } from "./populate_item.js";

const searchForm = document.querySelector(".search-form");

const searchInput = document.querySelector("#search-input");

const itemGrid = document.querySelector("#item-grid");

function renderItems(items) {
    itemGrid.innerHTML = "";

    if (items.length === 0) {
        itemGrid.innerHTML = `<li class="no-results">No listings found.</li>`;
        return;
    }

    items.forEach(item => {
        itemGrid.appendChild(populate_item_card(item));
    });
}


function searchItems(query) {

    const lowerQuery = query.trim().toLowerCase();

    if (lowerQuery === "") {
        renderItems(data);
        return;
    }

    const filteredItems = data.filter(item => {
        return (
            item.ITEM_NAME.toLowerCase().includes(lowerQuery) ||
            item.DESCRIPTION.toLowerCase().includes(lowerQuery) ||
            (item.CATEGORIES || []).some(category =>
                category.toLowerCase().includes(lowerQuery)
            )
        );
    });


    let sortedItems = filteredItems.sort(compareItems);

    function compareItems(a,b) {
    if (a.ITEM_NAME < b.ITEM_NAME) {
        return -1;
    } else if (a.ITEM_NAME > b.ITEM_NAME) {
        return 1;
    }
    return 0;
    }

    renderItems(sortedItems);
}

renderItems(data);

searchForm.addEventListener("submit", (event) => {

    event.preventDefault();

    searchItems(searchInput.value);
});

searchInput.addEventListener("input", () => {
    searchItems(searchInput.value);
});