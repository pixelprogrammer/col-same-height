# Installation and Basic Usage

You will want to include jquery and then the `jquery.col-same-height.min.js` script. 

```html
<script src="jquery.js"></script>
<script src="jquery.col-same-height.min.js"></script>
```

If you have some columns you wish to set as the same height as each other just give them a similar class name like so

```html
<div class="col-same-height">
	some text
</div>
<div class="col-same-height">
	lots of text...
</div>
<div class="col-same-height">
	some text
</div>
```

In your javascript file, target those elements with that class and initialize the plugin for those elements

## JavaScript

```javascript
$(document).ready(function() {
	$('.col-same-height').colSameHeight();
})
```

# Responsive Breakpoints

You might not want the columns to be the same height on certain screen sizes. Lets say the columns stack on top of each other when the width of the screen is less than 800px. We can define our own callback breakpoint functions. Lets take our example from before and add a `data-col-break` attribute. The value you set will be the name of the callback function. In this case we will name it 'lg':

## HTML

```html
<div class="col-same-height" data-col-break="lg">
	some text
</div>
<div class="col-same-height" data-col-break="lg">
	lots of text...
</div>
<div class="col-same-height" data-col-break="lg">
	some text
</div>
```

Now lets define our own callback method. It should return true if we want the columns to be the same height or false if we don't.

## JavaScript

```javascript
$(document).ready(function() {
	$('.col-same-height').colSameHeight({
		breakpointCBs: {
			lg: function(el) { // lg is the value of data-col-break
				var screen_width = $(window).width();
				if( screen_width >= 800 ) {
					return true;
				}

				return false;
			}
		}
	})
})
```

Now when you play around with the size of the window you can see that the columns will only be the same height when the window is 800px or larger.

# Grouping Columns

While its easy to separate your columns from eachother by just doing this in your script file:

```javascript
$('.col-same-height').colSameHeight();
$('.col-same-height-alt').colSameHeight();
```

You can reuse the same class if needed and just add them to a group with the `data-col-group` attribute like so

```html
<!-- row 1 -->
<div class="col-same-height" data-col-group="row-1"></div>
<div class="col-same-height" data-col-group="row-1"></div>
<div class="col-same-height" data-col-group="row-1"></div>
<!-- row 2 -->
<div class="col-same-height" data-col-group="row-2"></div>
<div class="col-same-height" data-col-group="row-2"></div>
<div class="col-same-height" data-col-group="row-2"></div>
```

This allows you to group your columns within your HTML.

# Known Issues

- Columns within an element with css `display: flex` have some issues when resizing the window. The height is slightly off