import {templates} from "./templatex";
import {constants} from "./constants";

export const renderPagination = (response: any) => {
    if (
        !(
            typeof response.searchInformation !== 'undefined'
            && typeof response.searchInformation.totalResults !== "undefined"
        )
    ) {
        // missing information about number of results
        return;
    }

    if (!(typeof response.queries !== 'undefined'
        && typeof response.queries.request !== 'undefined'
        && typeof response.queries.request[0] !== 'undefined'
    )) {
        // missing data about query
        return;
    }

    const numOfResults = parseInt(response.searchInformation.totalResults);
    if (numOfResults > constants.numberOfSearchResultsToReturn) {

        let actualPage = 1;
        if (typeof response.queries.request[0].startIndex !== 'undefined'
            && typeof response.queries.request[0].count !== 'undefined'
        ) {
            actualPage = Math.ceil((response.queries.request[0].startIndex) / response.queries.request[0].count);
        }

        const searchTerm = (typeof response.queries.request[0].searchTerms !== 'undefined')
            ? response.queries.request[0].searchTerms : constants.searchInput.value;

        const pages: string[] = [];
        const addPageLink = (text: string, search: string, startIndex: number | string, actualPage: boolean = false) => {
            pages.push(templates.paginationLink
                .replaceAll('#text#', text)
                .replaceAll('#paginationLink-actual#',
                    actualPage ? constants.paginationLinkActual : '')
                .replaceAll('#onclick#',
                    'title="' + text + '"' +
                    ' nohref ' + (
                        actualPage
                            ? '' : ' onclick="sendRequest(\'' + search + '\',' + '\'' + startIndex + '\');return false"'
                    )
                )
            )
        }

        // Previous anchor
        if (actualPage > 1) {
            addPageLink('Previous',
                searchTerm,
                (actualPage - 1) * constants.numberOfSearchResultsToReturn + 1
            );
        }

        // anchors with page numbers
        const possiblePages = Math.ceil(numOfResults / constants.numberOfSearchResultsToReturn);
        const l = constants.maxPaginationLength > possiblePages ? possiblePages : constants.maxPaginationLength;
        let previewPagesShift = 0;
        if (actualPage > 1) {
            const half = Math.floor(constants.maxPaginationLength / 2);
            if (actualPage > half) {
                previewPagesShift = half;
            } else {
                previewPagesShift = actualPage - 1;
            }
        }
        for (let i = actualPage - previewPagesShift; i < (actualPage - previewPagesShift + l); i++) {
            addPageLink('' + i,
                searchTerm,
                (i - 1) * constants.numberOfSearchResultsToReturn + 1,
                i === actualPage);
        }

        // next anchor
        if (
            typeof response.queries.nextPage !== 'undefined'
            && typeof response.queries.nextPage[0] !== 'undefined'
            && typeof response.queries.nextPage[0].startIndex !== 'undefined'
        ) {
            addPageLink('Next', searchTerm, response.queries.nextPage[0].startIndex);
        }

        constants.results.insertAdjacentHTML('beforeend',
            templates.pagination.replaceAll("#pages#", pages.join('')));
    }
}
