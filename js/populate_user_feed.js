import data from "../json/items.json" with { type: "json" };
import { getOrCreateUserID, renderUserAvatar } from "./user_id.js";
import { setupSearch } from "./search.js";

const userID = getOrCreateUserID();
renderUserAvatar(userID, ".profile-avatar");

// Keep only this user's items
const userItems = data.filter(item => item.SELLER_ID === userID);

console.log(userID);

// Set up search/filter using only the user's items
setupSearch(userItems, "You have not listed any items yet.");


// Update listing count
const listingCount = document.querySelector(".profile-stats .stat-number");
if (listingCount) {
    listingCount.textContent = String(userItems.length);
}

const userProfileName = document.querySelector("#profileName");

// Populate the user profile
if (userID) {
    userProfileName.textContent = userID;
}

