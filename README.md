# Wirestorm #

≈≈≈ Made With Bacon!

## What is Wirestorm? ##

Wirestorm is a framework built on Pug, Stylus and Segments, that leverages these technologies in order to allow developers and designers to build dynamic and "functional" wireframes &ndash; __fast__!

## Profile Config ##

Wirestorm is a bacon utility.  That means that it takes advantage of "profile" settings.  In order to set this up, start by running the following:

```
wire -profile
```

This will generate the appropriate profiles folder along with the profile.py file. Here's an example of the proper profile file config for Wirestorm:

```
{
    "settings" : {
        "repoFolder" : "Documents/Wireframes",
        "privateToken" : "123YourGitlabApiPrivateTokenABC",
        "gitlabGroups" : [
            {
                "name" : "yourDefaultGroup",
                "group_id" : ""
            },
            {
                "name" : "GroupThatYouAdded",
                "group_id" : 12345678
            }
        ]
    }
}

```

You will also need a Gitlab account.  Once you have a Gitlab account set up, you can add the appropriate settings to your profile config.  Let me walk you through the settings:

- __repoFolder:__ Where your wireframes will be stored locally.  This doesn't check if the folder exists, so if you haven't created it, yet, this will throw an error.  Be sure to make sure the folder already exists.

- __privateToken:__ You will need to get a Gitlab API private token from Gitlab.

- __gitlabGroups:__ You will need to create a group inside Gitlab.  Once you have created a group for your Wireframes, add the name here, as well as it's group_id. The name is for the bacon utility; the group_id is for gitlab's api.

## LocalStorage ##

Wirestorm stores a localStorage object in the background for every page.  You can take advantage of this object using the global variable `localData`.  And to save anything that you add to localStorage, you can simply do `localData.save()` in your JS code!  

If you need to share data from one page with another page, you can frontload localData.  You can do this by adding the following script block to `__core__/footer.pug`:

```
script.
    const pageList = [
        'first-page',
        'second-page',
        'third-page',
        'etc'
    ];

    newObj
    pageList.forEach(function(_page_) {
        localData[_page_] = {};
    });

    localData.save();

```

By adding each page to the `pageList` array, you can prepopulate the data without having to open the page in your browser. Just note that it won't run until you've opened at least one page.

You can easily store the value of any input form element.  Simply add the class `store` to the input. For example:

```
+input("First Name").store
```

Adding the `store` class to a submit button will transform that button into a localStorage save button. It will generally store ALL items with the `store` class.  If you want to isolate just certain items, or different items with multiple submit buttons, then add `store` to the submit buttion as a key/value pair (make sure not to forget the curly braces).  The id will be the id of the element wrapping the items to include, such as a div element:

```
div#username-password
    +input("Username").store
    +input("Password").store

+submit({"name" : "Save", "store" : "username-password"})
```

In the above example, clicking the submit button will submit only those items inside the `username&password` div.