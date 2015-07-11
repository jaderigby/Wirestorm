## What is Wirestorm?

Wirestorm is a framework built on Jade, Stylus and Jeet, that leverages these technologies in order to allow developers and designers to build dynamic and "functional" wireframes __fast__.

## Why use code to wireframe?

"Visual" wireframes - those made up of images - can be fine, but fall short in larger scope projects.  What happens when your wireframe grows to 30 or 40 pages?  Are just images enough?  Does your wireframe demonstrate what happens when it goes from desktop to mobile?  With wirestorm, since it's composed of code, you get not only a visual representation, but also a functional representation helping you to visualize "flow" and "behavior".  Now, keep in mind, the end goal is to stay at a lower level of fidelity.  It is a "tool" and not a replacement for the actual website.  But with wirestorm, you get an exceptional view of: 

- How your pages connect
- How the Desktop version will morph into the Mobile versions
- How dynamic components will behave, such as:
	- search
	- modals
	- tabs
	- etc

So, instead of describing, "Then, when you click this button, you will go here", you simply make it happen, and the behavior is self-evident.  Nice!

## Wirestorm Usage

__Note:__ Wirestorm requires the following dependencies:

- jade
- for CSS:
	- stylus
	- jeet
	- nib
	- rupture

Download NodeJS, and then use npm to install these. (For instructions, go to their respective sites or github repos.)

When you first open up the wirestorm folder, you will see the following subfolders:

- `__jade__`
- `__stylus__`
- `css`
- `html`
- `images`
- `js`

The two underscored files are for you: One for html, and one for css.  The `__jade__` folder is where you will build your structure, the html.  The `__stylus__` folder is where all of your css styles will live.  In the `__stylus__` folder, you will find a file called `main.styl`.  This is where you add any custom styles of your own, beyond what wirestorm provides.

The `__jade__` folder is a little more complex: In this folder, you will see files for `header` and `footer`.  They are exactly what they sound like.  Use the skeleton provided and modify these as needed.  For example, you can place any header info, "logo, nav, etc", inside this file -- Note, that there is a `nav.jade` file already provided within the `app` folder.  The app folder is where you will do a majority of your work: creating new files, editing the homepage, or `index.jade`, adding to and modifying your nav bar through the `nav.jade` file.  What makes wirestorm powerful is the prebaked components that live within the `widgets` folder.  You won't edit these files.  Instead, they are provided to be used for the files contained within the `app` folder.  In order to use these components, you simply "include" them, then use the guide below to add them to your files.  Once this is all done, run both the `jade-watch.sh` and the `stylus-watch.sh` files by opening a new instance of terminal and typing `sh jade-watch.sh`.  These files are provided as a convenience to help you compile your jade and stylus files.  If you prefer, you can use tools such as "LiveReload" or "Codekit", etc.

__Now, on to the goodies . . .__

## Widgets

### +panel(arg1)

__Parameters:__

- arg1 = string, 'light', 'dark', or 'footer'; can also be left blank

__Description:__

The panel mixin can be used to create modern-looking, panel-based websites.  It creates a container that is stackable and centered, with exceptional amounts of top and bottom whitespace.  In short, panels are sections of a site stacking vertically on a page.

__Example:__

```
+panel('dark')
	h2 My Title
```

__Result:__

![Panel Example](http://www.mightywebtools.com/wirestorm/readme-images/dark-panel-thumb.png)

### +loop(arg1)

__Parameters:__

- arg1 = integer, number of items to create in loop

__Example:__

```
- var iteration = 0;
+loop(3)
	article.wrap
		 h3= titles[iteration++] + ' Title'
```

__Result:__

![Loop Example](http://www.mightywebtools.com/wirestorm/readme-images/loop-thumb.png)

### +column-loop(arg1)

__Parameters:__

- arg1 = integer, number of columns (1 row)

__Description:__

When creating column loops, the article tag defines a column.

__Example:__

```
+column-loop(3)
	article
		+porthole(140,140)
```

__Result:__

![Column Loop Example](http://www.mightywebtools.com/wirestorm/readme-images/column-loop-thumb.png)

### +tabs(arg1)

__Parameters:__ 

- arg1 = an array, pass in the title of each tab as an array.

__Description:__

To use the tabs widget:

- declare the tabs widget (`+tabs(['First Tab', 'Second Tab', 'Third Tab'])`)
- nest section tags with included `data-tab` attribute, with the `data-tab` value being one of the `+tabs()` titles (from the array).

__Example:__

```
+tabs(['First Tab', 'Second Tab', 'Third Tab'])
	section(data-tab="First Tab")
		h3 Tab 1 Content
		p
			+blockletter(25)
	section(data-tab="Second Tab")
		h3 Tab 1 Content
		p
			+blockletter(25)
```

### +blockletter(arg1)

__Parameters:__
- arg1 = integer (how many words to use)

__Example:__

```
div.content
	+blockletter(30)
```

__Result:__

![Blockletter Example](http://www.mightywebtools.com/wirestorm/readme-images/blockletter-thumb.png)

### +image(arg1, arg2, arg3), +image2(arg1, arg2, arg3)

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
	+image2(150,150)
```

__Result:__

![Image Examples](http://www.mightywebtools.com/wirestorm/readme-images/images-thumb.png)

### +porthole(arg1, arg2, arg3)

__Parameters:__

- arg1 = integer, width (width and height need to be equal)
- arg2 = integer, height (width and height need to be equal)
- arg3 = string, alignment, 'left', 'right', or 'center'. 'arg3' is optional

__Example:__

```
article
	+porthole(130, 130, 'center')
```

__Result:__

![Porthole Example](http://www.mightywebtools.com/wirestorm/readme-images/porthole-thumb.png)

### +slideshow(arg1, arg2, arg3), +slideshow2(arg1, arg2, arg3)

__Parameters:__

- arg1 = integer or string, such as '100%', width
- arg2 = integer or string, such as '100%', height
- arg3 = string, alignment, 'left', 'right', or 'center'. 'arg3' is optional

__Example:__

```
article
	+slideshow('100%', 250)
```

__Result:__

![Slideshow Example](http://www.mightywebtools.com/wirestorm/readme-images/slideshow-thumb.png)

### +pagination(arg1)

__Parameters:__

- arg1 = integer, number of pages to represent

__Example:__

```
+pagination(5)
```
__Result:__

![Pagination Example](http://www.mightywebtools.com/wirestorm/readme-images/pagination-thumb.png)

### +rating(arg1)

__Parameters:__

- arg1 = integer, max number of stars (defaults to 5)

__Description:__

The ratings widget is randomized between 1 and the number set for arg1 (defaults to 5).

__Example:__

```
+rating(5)
```

__Result:__

![Rating Example](http://www.mightywebtools.com/wirestorm/readme-images/rating-thumb.png)

### +menu-drawer()

__Description:__

The menu drawer widget should come before the `siteWrapper` id.  They are sibling elements.  A good practice is to nest `nav.jade` under both the `mobile-nav` widget, as well as within the `siteWrapper`.  This allows you to edit one file, and have both locations stay consistent. The `mobile-nav` widget is to be used in tandem with the `menu-trigger` widget.

__Example:__

```
body
	+menu-drawer()
		include app/nav
	#siteWrapper
		nav.desktop-nav
			include app/nav
		+menu-trigger()
```

### +menu-trigger()

__Description:__

Creates a menu icon/button for opening and closing a mobile nav drawer.

__Example:__

```
#siteWrapper
	nav.desktop-nav
		include app/nav
	+menu-trigger()
```

## ID's

### #contain

__Description:__

Only add this id to the containing element of the site, such as `div.site-wrapper`. The `#contain` id constrains the width of the site to `1024px`, or whatever the width is set to, including `+panel()` widget elements.

### #open

__Description:__

Only add this id to the containing element of the site, such as `div.site-wrapper`. The `#open` id will allow `+panel()` elements to extend their background color to the width of the browser while constraining the inner content to `1024px`, or whatever the width is set to.  Great for designing modern-looking, and paralax-type websites.  __Note:__ Paralax may be coming in a future iteration.

## Classes

### .thirds

__Description:__

Breaks up content into two parts: 1/3 and 2/3.  The 1/3 section uses the `aside` tag.  The 2/3 section uses the `article` tag.

__Example:__

```
div.thirds
	aside
		+image2('100%', 180)
	article
		h2 My Title
		p
			+blockletter(30)
```

![Thirds Class Example](http://www.mightywebtools.com/wirestorm/readme-images/thirds-thumb.png)

### .fifths

__Description:__

Breaks up content into two parts: 2/5 and 3/5.  The 2/5 section uses the `aside` tag.  The 3/5 section uses the `article` tag.

__Example:__

```
div.fifths
	aside
		+image2('100%', 220)
	article
		h2 My Title
		p
			+blockletter(30)
```

![Fifths Class Example](http://www.mightywebtools.com/wirestorm/readme-images/fifths-thumb.png)

### .columns-2 . . . .columns-10

__Description:__

To create columns, you don't need to use `+column-loop()`.  You can also use these classes.  When using these classes, each column is defined by an `article` tag. Since this is the case, it is recommended to use a `section` tag for applying the class to.  See example below . . .

__Example:__

```
section.columns-2
	article
		h3 First Column Title
		p
			+blockletter(20)
	article
		h3 Second Column Title
		p
			+blockletter(20)
```

### .wrap

__Description:__

Use this class to wrap an element in a containing box.  Has styles to work within both `+panel('light')` and `+panel('dark')`.

__Example:__

```
- var iteration = 0
+column-loop(3)
	article
		div.wrap
			h3= titles[iteration++] + " Title"
			p
				+blockletter(25)
```

__Result:__

![Wrap Class Example](http://www.mightywebtools.com/wirestorm/readme-images/wrap-thumb.png)

### .button, button

__Description:__

For buttons, you can use the `button` tag, or - if you need a link - add the class `.button` to an anchor tag

__Example:__

```
p
	a.button(href="to/some/link.html") Link Button
p
	button Another Button
```

## Other Classes

- .border-wrap
- .clear-wrap
- .left
- .center
- .right
- .cf (clearfix)
- .left-justify
- .center-justify
- .right-justify





