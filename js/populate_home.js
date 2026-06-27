import data from "../json/items.json" with { type: "json" };
import { setupSearch } from "./search.js";

setupSearch(data, "No listings found.");
