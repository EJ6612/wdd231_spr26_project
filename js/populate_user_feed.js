import data from "../json/items.json" with { type: "json" };
import { getOrCreateUserID } from "./user_id.js";
import { setupSearch } from "./search.js";

const userID = getOrCreateUserID();

// Keep only this user's items
const userItems = data.filter(item => item.SELLER_ID === userID);

console.log(userID);

// Set up search/filter using only the user's items
setupSearch(userItems, "You have not listed any items yet.");

// Update listing count
const listingCount = document.querySelector(".profile-stats .stat-number");
if (listingCount) {
    listingCount.textContent = userItems.length;
}
