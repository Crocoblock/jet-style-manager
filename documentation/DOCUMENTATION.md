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
    			'title'       => esc_html__( 'Item', 'jet-plugin' )
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
    		array(
    			'attributes'      => [],
    			'render_callback' => 'amazing_render_callback',
    		)
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
    *Default*: `style_controls`,
* args
    * `id` - Section ID. Must be unique.
    * `class_name` - Section CSS class.
    *Default*: `jet-st-section`,
    * `title` - Section title.
        *Default*: `''`,
    * `icon` -  Section icon. You can use inline SVG or [Dashicons
    ](https://developer.wordpress.org/resource/dashicons/#arrow-right-alt2)  *Default*: `''`,
    * `initial_open` - Section open or closed when block is selected
        *Values*: `true` | `false`
        *Default*: `false`,

Example:

```php
<?php
	$controls_manager->start_section(
		'style_controls',
		[
			'id'          => 'section_content_style',
			'initialOpen' => true,
			'title'       => esc_html__( 'Content', 'jet-smart-filters' )
		]
	);
?>
```
## end_section
Closes a section.

Example:
```php
<?php
    $controls_manager->start_section();
?>
```
