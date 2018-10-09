# Library Search Plugin - Public
![Library Search Plugin as used by Leiden University Libraries](https://lh3.googleusercontent.com/uVPC71HqPTtU7bHaMy9lpEFQDdNk4DOTiopz8Lc82Arm1qprqwjKh4lMPIDTGigZ3a6yvdGi7dI=w640-h400-e365 "Library Search Plugin as used by Leiden University Libraries")
###### This plugin, as used by Leiden University Libraries

The Library Search Plugin plugin allows users (students, researchers, etc.) to **search your library's catalogue, Google Scholar, WorldCat, or PubMed, without having to navigate to the respective websites first!**
It also comes with a **neat context menu that allows users to select text, right-click, and search!**

This is a clean version of the [Leiden Search Assistant plugin](https://chrome.google.com/webstore/detail/leiden-search-assistant/dillijfbjhoiokfgjbngplcfggkkdnbn) that can be adapted and used by any library. The plugin is compatible with Google Chrome, Opera, and Firefox.

## General information and how-to

### "Can my library use it?"
Yes, of course! **The code is provided under a GNU General Public License (v3)** - Just remember to give credit to Leiden University Libraries somewhere! For the rest, feel free to use, adapt, and distribute your plugin based on the code here.

### Awesome! Where do I start?
1. Start by editing manifest.json - Step by step; the code is heavily commented, that will help you through!
2. Move to options.js - Here you will mainly have to edit the URL to your catalog and the titles. Again, the code is heavily commented and you should be ok! :)
3. Edit popup.html - You can modify the way the plugin looks here.
4. Create your icons - You will have to create some icons in images/icons. Some placeholder images are in place when you download this repository. - more info: https://developer.chrome.com/apps/manifest/icons
5. (optional) Edit the fonts - At Leiden we use the "Vestula" font, but you can change it to something else. Scroll down for instructions.

### Wait, the link is for Primo Old UI, but my library is using Primo New UI! Will it work still? What do I have to change to make it work?
Yes, it will work. Perform a search in your Library's catalogue with the new Primo interface active. Copy the resulting URL and replace the term you have searched with the variable in the code. Don't worry, look at options.js and you will see what I mean.

### "I have adapted the code and I am ready to go! How do I test the code on Chrome? How do I publish the plugin on the Chrome Store?"
Congratulations! The next steps will vary from library to library, so here are some links to help you further:

* To verify that your plugin works, see here:
https://developer.chrome.com/webstore/get_started_simple#step4

* To publish your plugin on the store, please refer to:
https://developer.chrome.com/webstore/publish

* For more general information on Chrome Plugins and the store, see:
https://developer.chrome.com/webstore

## Extras

### Google Analytics and Google Tag Manager
You can use Google Analytics (GA) and Google Tag Manager (GTM) with this plugin, but it is in no way obligatory.
As a default, the needed parts are commented out in the code. You will need to uncomment those parts and insert your tracking codes.

Caution: **working with GTM in a plugin is particularly difficult, and might not lead to the desired results.**

### Fonts
In the "Fonts" folder you will find the "Vestula" fonts. If you wish to change:
1. Go to Google Fonts, choose your font and replace the files in the folder.
2. Replace the references to Vestula in style.css
