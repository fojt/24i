import "./style.scss";
import {constants} from "./constants";
import {handleResponse} from "./handleResponse";

const sendRequest = (window as any).sendRequest = (searchString: string, startIndex = 1): void => {
    // https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list
    fetch(constants.searchUrl + '?'
        + 'key=' + constants.googleSearchApiKey
        + '&cx=' + constants.googleSearchCxValue
        + '&q=' + searchString
        + '&num=' + constants.numberOfSearchResultsToReturn
        + '&start=' + startIndex
    )
        .then(response => response.json())
        .then(data => handleResponse(data))
        .catch(error => {
            console.log(error)
        })
}

(window as any).search = () => {
    // handleResponse(response)
    if (constants.searchInput.value) {
        sendRequest(constants.searchInput.value);
    } else {
        console.log('no value');
    }
}


