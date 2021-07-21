import {constants} from "./constants";
import {templates} from "./templatex";
import {renderPagination} from "./renderPagination";

export const handleResponse = (response: any) => {
    constants.results.innerHTML = "";
    if (Array.isArray(response.items) && response.items.length > 0) {
        response.items.forEach((item: any) => {
            let image = templates.emptyImage;

            if (typeof item.pagemap !== 'undefined' && Array.isArray(item.pagemap.cse_thumbnail)) {
                const length = item.pagemap.cse_thumbnail.length;
                for (let i = 0; i < length; i++) {
                    if (typeof item.pagemap.cse_thumbnail[i].src !== 'undefined') {
                        image = templates.image.replaceAll('#src#', item.pagemap.cse_thumbnail[i].src);
                        break;
                    }
                }
            }

            constants.results.insertAdjacentHTML('beforeend', templates.basic
                .replaceAll("#htmlSnippet#", item.htmlSnippet || '')
                .replaceAll("#title#", item.title || '')
                .replaceAll("#htmlFormattedUrl#", item.htmlFormattedUrl || '')
                .replaceAll("#image#", image)
            )
        });

        renderPagination(response);
    } else {
        constants.results.insertAdjacentHTML('beforeend', '<div class="no-results">No results</div>');
    }
}
