# Customization

While the Library Search Plugin is developed for libraries using ExLibris' systems, i can be adapted to most search engines. The code is heavily commented and easy to adapt to your needs.

## Name

If you would like to replace the "Library Search Plugin" name with your institution's, simply search and replace the words "Library Search Plugin" across all the files.

Critical files that need updates are `manifest.json` and `popup.html`. The first determines the name that will be shown in the Chrome and Firefox webstores; the second the name that the users will see in their browsers.

## Colors

All the colors and styles used by the plugin can be edited in `style.css`.

## Fonts

Fonts are found in the `\fonts\` folder. To replace the font with one of your choosing:

1. Download the font files and add them to the `\fonts\` folder.
2. Edit `style.css`:

``` css
    @font-face{
      font-family: YOURFONT;
      src: url("../fonts/vYOURFONT.woff2") format("woff2"),url("../fonts/vYOURFONT.woff")   format("woff");
      ...
    }

    @font-face{
      font-family: YOURFONT;
      src: url("../fonts/YOURFONT.woff2") format("woff2"),url("../fonts/YOURFONT.woff") format  ("woff");
        ...
    }
```

## Search engines

To add, remove, or edit the search engines you want to offer, open `options.js`. Create a new `if` statement to add a new search engine. Delete the ones you do not want to offer.

!!! Example
    As a standard, Google Scholar is one of the available search engines. In `options.js` you   can find:

    ``` javascript
    
    //Google Scholar
        if (
            $('#scholar').is(":checked")) {
            var newScholarURL = 'https://scholar.google.com/scholar?q=' + searchstring;
            // Create the new tab
            chrome.tabs.create({
                url: newScholarURL
            });
        }
    ```

    You can replace this search engine with Google's standard search engine by replacing the    URL in `var newScholarURL`:

    ``` javascript
    //Google
            if (
                $('#google').is(":checked")) {
                var newGoogleURL = 'https://www.google.com/search?q=' + searchstring;
                // Create the new tab
                chrome.tabs.create({
                    url: newGoogleURL
                });
            }
    ```
    Once the edits are done in `options.js`, open `popup.html` and add the following line:
    ``` html
        <input type="radio" name="chooseone" id="google"><label for="google"> Google< label><br>
    ```
