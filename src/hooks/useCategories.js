import { useQuery } from "react-query";
import fetchData from "../utility/fetchData";

function useCategories() {
    return useQuery(["categories"], async () => {
        const data = await fetchData("https://opentdb.com/api_category.php");
        return data.trivia_categories;
    });
}

export default useCategories;
