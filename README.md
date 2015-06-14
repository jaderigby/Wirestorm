## What is Wirestorm?

Wirestorm is a framework built on Jade, Stylus and Jeet, that leverages these technologies in order to allow developers and designers to build dynamic and "functional" wireframes __fast__.

## Why use code to wireframe?

"Visual" wireframes, those made up of images, can be fine, but fall short in larger scope projects.  What happens when your wireframe grows to 30 or 40 pages?  Are just images enough?  Does your wireframe demonstrate what happens when it goes from desktop to mobile?  With wirestorm, since it's composed of code, can give you not only the visual representation, but also the "flow" or representation of how the site will behave.  Now, keep in mind, the end goal is still at a lower level of fidelity than the finished product.  It is a "tool" and not a replacement for the actual website code.  But with wirestorm, you can see: 

- How your pages are connected
- How does the Mobile version relate to the Desktop version
- What dynamic components it will contain:
	- tabs
	- modals
	- search
	- etc

So, instead of describing, "Then, when you click this button, you will go here", you simply make it happen, and the behavior is self-evident.  Nice!

## Wirestorm Usage

When you open up the wirestorm folder, you will notice the following:

- `__jade__`
- `__stylus__`
- `css`
- `html`
- `images`
- `js`

The two underscored files are for you: One for html, and one for css.  The `__jade__` folder is where you will build your structure, the html.  The `__stylus__` folder is where all of your styles live.  In the `__stylus__` folder, you will find a file called `main.styl`.  This is where you add any custom styles of your own, beyond what wirestorm provides.

The `__jade__` folder is a little more complex: In this folder, you will see files for `header` and `footer`.  They are exactly what they sound like.  Use the skeleton provided and modify these as needed.  For example, you can place any header info, "logo, nav, etc", inside this file -- Note, that there is a `nav.jade` file already provided within the `app` folder.  The app folder is where you will do a majority of your work: creating new files, editing the homepage, or `index.jade`, adding to and modifying your nav bar through the `nav.jade` file.  What makes wirestorm powerful is the prebaked components that live within the `widgets` folder.  You won't edit these files.  Instead, they are provided to be used for the files contained within the `app` folder.  In order to use these components, you simply "include" them, then use the guide below to add them to your files.  Once this is all done, run both the `jade-watch.sh` and the `stylus-watch.sh` files by opening a new instance of terminal and typing `sh jade-watch.sh`.  These files are provided as a convenience to help you compile your jade and stylus files.  If you prefer, you can use tools such as "LiveReload" or "Codekit", etc.

__Now, on to the goodies . . . __

## Wirestorm widgets

#### +panel(arg1)

__Parameters:__
- arg1 = string, 'light' or 'dark'

__Description:__
The panel mixin can be used to create modern-looking, panel-based websites.  It creates a container that is stackable and centered, with exceptional amounts of top and bottom whitespace.  In short, panels are sections of a site stacking vertically on a page.

__Example:__

```
+panel('dark')
	h2 My Title
```

__Result:__

![Panel Example](http://www.mightywebtools.com/wirestorm/readme-images/dark-panel-thumb.png)

#### +blockletter(arg1)

__Parameters:__
- arg1 = integer (how many words to use)

__Example:__

```
div.content
	+blockletter(30)
```

__Result:__




#### +image(arg1, arg2, arg3), +image2(arg1, arg2, arg3)

__Parameters:__
- arg1 = integer or string, such as '100%', width
- arg2 = integer or string, such as '100%', height
- arg3 = string, alignment, 'left', 'right', or 'center'. 'arg3' is optional

__Examples:__

```
article
	+image('100%',250,'center')
```

```
article
	+image(150,150)
```

#### +porthole(arg1,arg2,arg3)







