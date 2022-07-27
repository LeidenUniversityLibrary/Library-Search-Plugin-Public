//SECTION Context Menu
var searches = [{
    title: "Search in the Library's Catalogue",
    //Replace with your library's URL. IMPORTANT '%s' is the search variable and must be present.
    url: "https://example.com/search?query=%s"
},
{
    title: "Search in the Web of Science",
    //Replace with your library's ezproxy URL. If your library does not use ezproxy, keep the Web of Science url only.
    url: "https://login.ezproxy.example.com/login?URL=https://gateway.webofknowledge.com/gateway/Gateway.cgi?GWVersion=2&SrcApp=WEB&SrcAuth=HSB&DestApp=WOS&DestLinkType=GeneralSearchSummary&topic=%s&btnWS=Search&utm_source=Leiden%20Search%20Assistant%20plugin&utm_medium=Contextual"
},
{
    title: "Search in Google Scholar",
    url: "https://scholar.google.com/scholar?q=%s"
},
{
    title: "Search in Leiden PubMed",
    //Replace the asterisks **** with your Pubmed otool ID
    url: "https://www.ncbi.nlm.nih.gov/pubmed/?otool=****&term=%s"
},
{
    title: "Search in WorldCat",
    url: "https://www.worldcat.org/search?q=%s"
}
];

searches.forEach(function (obj, info) {
    chrome.contextMenus.create({
        title: obj.title,
        contexts: ["selection"],
        id: (searches.indexOf(obj) + 1).toString()
    });
});

// replace %s with highlighted text
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    //console.log(info.menuItemId);
    var searchObj = searches[info.menuItemId - 1];
    if (typeof searchObj === "undefined")
        return;
    chrome.tabs.create({
        url: searchObj.url.replace("%s", encodeURIComponent(info.selectionText)),
        selected: false
    });
});
//!SECTION