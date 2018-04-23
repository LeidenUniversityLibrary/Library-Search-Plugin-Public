/*Google Analytics - not obligatory, you can delete this if you do not use it.

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-******-*']);
_gaq.push(['_trackPageview']);
(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();

*/

//SEARCHBOX STUFF
$(document).ready(function () {
    //select library catalogue as default
    $("#library").prop("checked", true);
    //when clicking search, adapt the URL depending on selection made
    $('#btnOpenNewTab').click(function () {
        //Get the search term, and save it as a var
        var searchstring = $('input#searchInput').val();
        //Library Catalogue
        if (
            $('#library').is(":checked")) {
            //change this url to match your library's! Here is Leiden's URL as an example for ExLibris Primo users - Old UI!
            var newLibraryURL = 'http://discovery.imicams.ac.cn/primo_library/libweb/action/search.do?dscnt=0&scp.scps=scope%3A%28%22IMICAMS%22%29%2Cprimo_central_multiple_fe&frbg=&tab=default_tab&dstmp=1524468383395&srt=rank&ct=search&mode=Basic&dum=true&indx=1&tb=t&vl%28freeText0%29=&fn=search&vid=imicams'+ searchstring + '&source=LibrarySearchPluginPUMC'; //you can modofy &source to anything you like. This is useful to see how many users are coming to your catalogue via the plugin, in Google Analytics.
-            // Create the new tab
            chrome.tabs.create({
                url: newLibraryURL
            });
        }
        //Opac
        if (
            $('#opac').is(":checked")) {
            //alert("Opac checked");
            var newOpacURL = 'http://opac.imicams.ac.cn:8090/opac/search.php=' + searchstring;
            // Create the new tab
            chrome.tabs.create({
                url: newOpacURL
            });
        }
        //Baidu
        if (
            $('#baidu').is(":checked")) {
            //alert("Baidu checked");
            var newBaiduURL = 'https://www.baidu.com/s?wd=' + searchstring;
            // Create the new tab
            chrome.tabs.create({
                url: newBaiduURL
            });
        }
        //Pubmed
        if (
            $('#pubmed').is(":checked")) {
            //alert("PubMed checked");
            var newPubmedURL = 'https://www.ncbi.nlm.nih.gov/pubmed/?term=' + searchstring; // if you use EzProxy, modify the URL here. You may also remove the EzProxy prefix compeltely.
            // Create the new tab
            chrome.tabs.create({
                url: newPubmedURL
            });
        }
    });
    $('#searchInput').keypress(function (e) {
        if (e.which == 13) { //Enter key pressed
            $('#btnOpenNewTab').click(); //Trigger search button click event
        }
    });
});
//CONTEXT STUFF
//Search definitions. %s is the variable that gets replaced by the search term.
var searches = [
    {
        title: "Search in the Library Catalogue", // Same as above: edit to match your library's url. Modify &soruce as well at the end. Remeber to keep '%s'
        url: "http://catalogue.leidenuniv.nl/primo_library/libweb/action/search.do?fn=search&ct=search&initialSearch=true&mode=Basic&tab=all_content&indx=1&dum=true&srt=rank&vid=UBL_V1&frbg=&tb=t&scp.scps=scope%3A%28UBL_DSPACE%29%2Cscope%3A%28%22UBL%22%29%2Cscope%3A%28UBL_DTL%29%2Cscope%3A%28UBL_ALMA%29%2Cprimo_central_multiple_fe&vl%28freeText0%29=%s&source=LibrarySearchPluginPublic"
  },
    {
        title: "Search in OPAC",
        url: "http://opac.imicams.ac.cn:8090/opac/search.php=%s"
  },
    {
        title: "Search in Baidu",
        url: "https://www.baidu.com/s?wd=%s"
  },
    {
        title: "Search in PubMed", // Again: remove or adapt your ezproxy URL
        url: "https://www.ncbi.nlm.nih.gov/pubmed/?term=%s"
  }
];
// Create a parent item and two children.
var parent = chrome.contextMenus.create({
    "title": "Search with Library Search Plugin PUMC", // Change the name here too!
    "id": "0",
    "contexts": ["selection"]
});
searches.forEach(function (obj) {
    console.log("creating context menu item: " + JSON.stringify(obj));
    var contextMenuId = chrome.contextMenus.create({
        "title": obj.title,
        "parentId": parent,
        "contexts": ["selection"],
        "id": (searches.indexOf(obj) + 1).toString()
    });
});
// replace %s with highlighted text
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    console.log(info.menuItemId);
    var searchObj = searches[info.menuItemId - 1];
    if (typeof searchObj === "undefined")
        return;
    chrome.tabs.create({
        "url": searchObj.url.replace("%s", encodeURIComponent(info.selectionText))
    });
});
