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
                "name" : "NameOfYourFirstGitlabGroup",
                "group_id" : ""
            },
            {
                "name" : "SomeOtherGroup",
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

