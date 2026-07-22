import data from "../json/items.json" with { type: "json" };


import {
    getOrCreateUserID,
    renderUserAvatar
} from "./user_id.js";


import {
    createCard
} from "./item-card.js";


import {
    setupSearch
} from "./search.js";





const userID =
    getOrCreateUserID();





renderUserAvatar(
    userID,
    ".profile-avatar"
);

// ==============================================
// GET USER LISTINGS
// ==============================================


const userItems = data.filter(
    item =>
        item.SELLER_ID === userID
);


// ==============================================
// PROFILE INFO
// ==============================================


const profileName =
    document.querySelector("#profileName");



if(profileName){

    profileName.textContent =
        userID;

}


// ==============================================
// STATS
// ==============================================


const stats =
    document.querySelectorAll(
        ".profile-stats .stat-number"
    );



if(stats.length >= 3){


    const listings =
        userItems.length;



    const sold =
        userItems.filter(
            item => item.SOLD === true
        ).length;



    const favorites =
        0; // connect later with favorites system



    stats[0].textContent =
        listings;



    stats[1].textContent =
        sold;



    stats[2].textContent =
        favorites;


}

// ==============================================
// DISPLAY USER ITEMS
// ==============================================


const grid =
    document.querySelector("#item-grid");





function displayListings(items){


    if(!grid) return;



    grid.replaceChildren();




    if(!items.length){


        const empty =
            document.createElement("li");


        empty.className =
            "no-results";


        empty.textContent =
            "You have not listed any items yet.";



        grid.appendChild(empty);


        return;

    }


    items.forEach(item => {


        grid.appendChild(

            createCard(item)

        );


    });



}

displayListings(
    userItems
);

// ==============================================
// SEARCH
// ==============================================


setupSearch(
    userItems,
    "You have not listed any items yet."
);
