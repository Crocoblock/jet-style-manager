# Jet Style Manager
Integration of styles into gutenberg blocks

## How to use:
To add style to Gutenberg blocks, you need to call the `jet_sm_register_style_for_block` function on `wp` hook `init` with priority 10, and before the block `register_block_type` function, if you register the php callback for a block.

Example:

```php
<?php
    add_action( 'init', 'gutenberg_blocks_add_style', 10 );
    function gutenberg_blocks_add_style() {
        //Registering a manager for a block 'jet-plugin/my-amazing-block'
        $controls_manager = jet_sm_register_style_for_block( 'jet-plugin/my-amazing-block' );

        //Start section with options
    	$controls_manager->start_section(
    		'style_controls',
    		[
    			'id'          => 'item_style',
    			'initialOpen' => true,
    			'title'       => esc_html__( 'Item', 'jet-plugin' ),
    		]
    	);
    	/*
    	*Block controls code....
    	*/

    	//End section with options
        $this->controls_manager->end_section();

       //Only needed if you register php callback for a block.
        register_gutenberg_block();
    }
    function register_gutenberg_block() {
        register_block_type(
    		 'jet-plugin/my-amazing-block',
    		[
    			'attributes'      => [],
    			'render_callback' => 'amazing_render_callback',
    		]
    	);
    }
?>
```
##### Arguments:
`jet_sm_register_style_for_block` function takes one parameter - name of the block:
* `name` - Block name, it must match the registered block name. Example: `jet-smart-filters/checkboxes` or `core/heading`

# Adding Options
Methods for adding style options. After adding styles, a sidebar button with styles will appear in the editor.

![sidebar](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/sidebar.png)

## start_section
Opens a section wrapper for options (toggle)

![sidebar](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/section.png)

##### Arguments:
* `sidebar_name` - Sidebar slug to which options will be added. Works only if the function was used.
    *Values*: `style_controls` | `controls` - Works only if the function [register_block
    ](#) used.
    *Default*: `style_controls`
* args
    * `id` - Section ID. Must be unique.
    * `class_name` - Section CSS class.
    *Default*: `jet-st-section`
    * `title` - Section title.
        *Default*: `''`
    * `icon` -  Section icon. You can use inline SVG or [Dashicons
    ](https://developer.wordpress.org/resource/dashicons/#arrow-right-alt2)    *Default*: `''`
    * `initial_open` - Section open or closed when block is selected
        *Values*: `true` | `false`
        *Default*: `false`

Example:

```php
<?php
	$controls_manager->start_section(
		'style_controls',
		[
			'id'          => 'section_content_style',
			'initialOpen' => true,
			'title'       => esc_html__( 'Content', 'jet-plugin' ),
		]
	);
?>
```
## end_section
Closes a section.
Example:
```php
<?php
    $controls_manager->end_section();
?>
```

## start_tabs
Opens a wrapper for tabs.
![sidebar](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/tabs.png)

##### Arguments:
* `sidebar_name` - Sidebar slug to which options will be added. Works only if the function was used.
    *Values*: `style_controls` | `controls` - Works only if the function [register_block
    ](#) used.
    *Default*: `style_controls`
* args
    * `id` - Tabs ID. Must be unique.
    * `class_name` - Tabs wrapper CSS class.
    *Default*: `jet-st-tabs`
    * `active_class` - Active tab CSS class.
    *Default*: `jet-st-active-tab`
    * `orientation` - Tabs type
    *Values*: `horizontal` | `vertical`
    *Default*: `horizontal`
    * `initialTabName` - Name of the tab that will be active
    *Default*: `''`
    * `separator` - Separator between options
    *Values*: `before` | `after`| `both`
    *Default*: `''`

Example:
```php
<?php
	$controls_manager->start_tabs(
		'style_controls',
		[
			'id'         => 'style_tabs',
			'separator'  => 'both',
		]
	);
?>
```

## end_tabs
Closes a wrapper for tabs.
Example:
```php
<?php
	$controls_manager->end_tabs();
?>
```
## start_tab
Open new tab.

##### Arguments:
* `sidebar_name` - Sidebar slug to which options will be added. Works only if the function was used.
    *Values*: `style_controls` | `controls` - Works only if the function [register_block
    ](#) used.
    *Default*: `style_controls`
* args
    * `id` - Tab ID. Must be unique.
    * `title` - Tab name.
    *Default*: `''`

Example:
```php
<?php
	$controls_manager->start_tab(
		'style_controls',
		[
			'id'    => 'normal_styles',
			'title' => esc_html__( 'Normal', 'jet-plugin' ),
		]
	);
?>
```

## end_tab
Close tab.
Example:
```php
<?php
	$controls_manager->end_tab();
?>
```
