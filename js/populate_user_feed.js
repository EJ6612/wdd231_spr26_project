import data from "../json/items.json" with { type: "json" };
import { populate_item_card } from "./populate_item.js";
import { getOrCreateUserID } from "./user_id.js";

const userID = getOrCreateUserID();
const itemGrid = document.querySelector(".item-grid");

const userItems = data.filter(item => item.SELLER_ID === userID);
console.log(userID);
itemGrid.innerHTML = "";

if (userItems.length === 0) {
    itemGrid.innerHTML = `
        <li class="empty-state">
            You have not listed any items yet.
        </li>
    `;
} else {
    userItems.forEach(item => {
        itemGrid.append(populate_item_card(item));
    });
}

const listingCount = document.querySelector(".profile-stats .stat-number");
if (listingCount) {
    listingCount.textContent = userItems.length;
}
