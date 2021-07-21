export const templates = {
    basic: `
<div class="result">
    <div class="image-wrapper">#image#</div>
    <div class="text-wrapper">
        <a href="#link#" class="htmlFormattedUrl"><span>#htmlFormattedUrl#</span></a>
        <a href="#link#" class="title"><h3>#title#</h3></a>
        <p>#htmlSnippet#</p>
    </div>
</div>`,
    image: '<img src="#src#" />',
    emptyImage: '',
    pagination: `<div class="pagination-wrapper">#pages#</div>`,
    paginationLink: '<a class="paginationLink #paginationLink-actual#" #onclick#>#text#</a>'
};
