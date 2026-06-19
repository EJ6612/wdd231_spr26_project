import { populate_item_card } from "./populate_item.js";
import data from "../json/items.json" with {type : 'json'};


const homeFeed = document.querySelector('.item-grid');

data.forEach(item => {

    homeFeed.append(populate_item_card(item));
});