

document.addEventListener("DOMContentLoaded", function (event) {

    //SECTION select your library catalogue as default
    document.getElementById("library").checked = true;
    //!SECTION

    //SECTION Store selected search engines
    document.getElementById('library').addEventListener('change', function (e) {
        chrome.storage.sync.set({
            'library': (document.getElementById('library').checked)
        }, function () { });
    });
    chrome.storage.sync.get('library', function (storage) {
        document.getElementById('library').checked = (storage.library == true);
    });

    document.getElementById('wos').addEventListener('change', function (e) {
        chrome.storage.sync.set({
            'wos': (document.getElementById('wos').checked)
        }, function () { });
    });
    chrome.storage.sync.get('wos', function (storage) {
        document.getElementById('wos').checked = (storage.wos == true);
    });

    document.getElementById('worldcat').addEventListener('change', function (e) {
        chrome.storage.sync.set({
            'worldcat': (document.getElementById('worldcat').checked)
        }, function () { });
    });
    chrome.storage.sync.get('worldcat', function (storage) {
        document.getElementById('worldcat').checked = (storage.worldcat == true);
    });

    document.getElementById('scholar').addEventListener('change', function (e) {
        chrome.storage.sync.set({
            'scholar': (document.getElementById('scholar').checked)
        }, function () { });
    });
    chrome.storage.sync.get('scholar', function (storage) {
        document.getElementById('scholar').checked = (storage.scholar == true);
    });

    document.getElementById('pubmed').addEventListener('change', function (e) {
        chrome.storage.sync.set({
            'pubmed': (document.getElementById('pubmed').checked)
        }, function () { });
    });
    chrome.storage.sync.get('pubmed', function (storage) {
        document.getElementById('pubmed').checked = (storage.pubmed == true);
    });
    //!SECTION

    //SECTION Prevent user from searching for nothing or execute search if a search term is added.
    document.getElementById('btnOpenNewTab').addEventListener("click", function () {
        //Get the search term, and save it as a var
        var searchstring = document.getElementById('searchInput').value;

        //If search field is empty, alert that you need a search term.
        var emptySearch = document.getElementsByClassName("emptySearch")[0];
        var emptySelection = document.getElementsByClassName("emptySelection")[0];
        if (searchstring == '') {
            emptySearch.style.display = "block";
        } else {
            emptySearch.style.display = "none";
        }

        var checkBox = document.querySelectorAll("input[class='form-check-input']:checked").length;
        if (checkBox == 0) {
            emptySelection.style.display = "block";
        } else {
            emptySelection.style.display = "none";
        }

        //If both text and selection are entered, execute:
        if (document.querySelectorAll("input[class='form-check-input']:checked").length > 0 && document.getElementById('searchInput').value) {
            var libraryCheckBox = document.getElementById('library');
            var wosCheckBox = document.getElementById('wos');
            var worldcatCheckBox = document.getElementById('worldcat');
            var googleScholarCheckBox = document.getElementById('scholar');
            var pubmedCheckBox = document.getElementById('pubmed');

            if (libraryCheckBox.checked == true) {
                //NOTE replace with your institution's Primo URL (VE or BO)
                var newlibraryURL = 'https://example.com/primo-explore/search?query=any,contains,' + searchstring + '&tab=all_content&search_scope=All_Content&vid=UBL_V1&lang=en_US&offset=0';
                chrome.tabs.create({
                    url: newlibraryURL
                });
            }

            if (wosCheckBox.checked == true) {
                //NOTE Web of Knowledge usually requires IP auhentication. At Leiden University we use EzProxy. If your institution also uses EzProxy, replace the following URL's details with your own.
                var newWosURL = 'https://gateway-webofknowledge-com.YOUREZPROXY.URL.COM/gateway/Gateway.cgi?GWVersion=2&SrcApp=WEB&SrcAuth=HSB&DestApp=WOS&DestLinkType=GeneralSearchSummary&topic=' + searchstring + '&btnWS=Search';
                chrome.tabs.create({
                    url: newWosURL
                });
            }

            if (worldcatCheckBox.checked == true) {
                var newWorldcatURL = 'https://www.worldcat.org/search?q=' + searchstring;
                chrome.tabs.create({
                    url: newWorldcatURL
                });
            }

            if (googleScholarCheckBox.checked == true) {
                var newScholarURL = 'https://scholar.google.com/scholar?q=' + searchstring;
                chrome.tabs.create({
                    url: newScholarURL
                });
            }

            if (pubmedCheckBox.checked == true) {
                //NOTE replace '****' with your library's otool id
                var newPubmedURL = 'https://www.ncbi.nlm.nih.gov/pubmed/?otool=****&term=' + searchstring;
                chrome.tabs.create({
                    url: newPubmedURL
                });
            }
        }
    });
    //!SECTION

    //SECTION Search on "enter" keypress
    document.getElementById('searchInput').addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("btnOpenNewTab").click();
        }
    });
    //!SECTION

    // SECTION Install and Uninstall behaviors
    chrome.runtime.onInstalled.addListener(function (details) {
        if (details.reason == "install") {
            chrome.tabs.create({ url: chrome.extension.getURL("welcome.html") }, function () { });
        } else if (details.reason == "update") {
            //NOTE Do nothing, for now. You could create an update page in which we explain what is new in the future.
        }
    });

    //NOTE Here you can redirect the user to a specific page or a survey when the plugin is uninstalled.
    chrome.runtime.setUninstallURL("https://example.com");
    //!SECTION
});
