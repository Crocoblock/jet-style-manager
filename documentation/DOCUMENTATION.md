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

![sidebar](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/section.gif)

##### Arguments:
* `sidebar_name` - Sidebar slug to which options will be added. Works only if the function was used.
*Values*: `style_controls` | `controls` - Works only if the function [register_block
    ](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#register_block) used.
*Default*: `style_controls`
* args
    * `id` - Section ID. Must be unique.
    * `class_name` - Section CSS class in editor.
    *Default*: `jet-st-section`
    * `title` - Section title.
    *Default*: `''`
    * `icon` -  Section icon. You can use inline SVG or [Dashicons
    ](https://developer.wordpress.org/resource/dashicons/#arrow-right-alt2)
*Default*: `''`
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
Open a wrapper for tabs.
![sidebar](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/tabs.png)

##### Arguments:
* `sidebar_name` - Sidebar slug to which options will be added. Works only if the function was used.
*Values*: `style_controls` | `controls` - Works only if the function [register_block
    ](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#register_block) used.
*Default*: `style_controls`
* args
    * `id` - Tabs ID. Must be unique.
    * `class_name` - Tabs wrapper CSS class in editor.
*Default*: `jet-st-tabs`
    * `active_class` - Active tab CSS class in editor.
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
Close a wrapper for tabs.
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
    ](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#register_block) used.
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

## add_control | add_responsive_control
The method adds a new controller with options. `add_responsive_control` adds a control with the ability to change settings on different devices.

![responsive](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/responsive.png)

##### Basic Arguments:
* `id` - Сontrol ID. Must be unique.
* `class_name` - Сontrol CSS class in editor.
* `type` - Control type.
*Default*: `''`
* `label` - Сontrol label.
*Default*: `''`
* `help` - Control description.
*Default*: `''`
* `separator` - Separator between options
*Values*: `before` | `after`| `both`
*Default*: `''`
 * `condition` - Сondition on other options, this allows you to hide or show an option.
    *Values exemple*: `[ 'show_label' => true ]`
    *Default*: `[]`
* `css_selector` - Option to create selector and style options for elements.
*Default*: `[]`
Values exemple: `[
                    '{{WRAPPER}} .my_border_control' => '...',
                ]`
*Macros*:
    * `{{ID}}` - Gutenberg Block ID
    * `{{WRAPPER}}` - Gutenberg Block Class

Example:

```php
<?php
  $controls_manager->add_control([
    'id'           => 'my_style_controls',
    'type'         => 'color-picker',
    'label'        => esc_html__( 'Color', 'jet-plugin' ),
    'separator'    => 'before',
    'condition'    => [
      'show_label' => true,
    ],
  ]);

  $controls_manager->add_responsive_control([
    'id'           => 'my_style_controls_2',
    'type'         => 'color-picker',
    'label'        => esc_html__( 'Color', 'jet-plugin' ),
    'separator'    => 'before',
    'condition'    => [
      'show_label' => true,
    ],
  ]);
?>
```

# Style Controls
## Border

![border](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/border.png)

##### Arguments:
* [Basic Arguments](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#basic-arguments)
* `disable_custom_colors` - Show / Hide the custom colors button.
*Values*: `true` | `false`
*Default*: `false`
* `clearable` - Show / Hide сlear color button.
*Values*: `true` | `false`
*Default*: `true`
* `disable_style` - Show / Hide border style select
*Values*: `true` | `false`
*Default*: `false`
* `disable_radius` - Show / Hide border radius control
*Values*: `true` | `false`
*Default*: `false`
* `disable_width` - Show / Hide border width control
*Values*: `true` | `false`
*Default*: `false`
* `disable_color` - Show / Hide border color control
*Values*: `true` | `false`
*Default*: `false`
* `css_selector` - Option to create selector and style options for elements.
*Default*: `[]`
Values exemple: `[
                    '{{WRAPPER}} .my_border_control' => 'border-style: {{STYLE}}; border-width: {{WIDTH}}; border-radius: {{RADIUS}}; border-color: {{COLOR}}',
                ]`
*Macros*:
    * [Macros in basic arguments](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#basic-arguments)
    * `{{STYLE}}` - Border style
    * `{{WIDTH}}` - Border width ( with units )
    * `{{RADIUS}}` - Border radius ( with units )
    * `{{COLOR}}` - Border color

Example:

```php
<?php
  $controls_manager->add_control([
        'id'          => 'my_border_control',
        'type'        => 'border',
        'label'       => esc_html__( 'Border', 'jet-smart-filters' ),
        'css_selector'  => [
          '{{WRAPPER}} .my_border_control' => 'border-style: {{STYLE}}; border-width: {{WIDTH}}; border-radius: {{RADIUS}}; border-color: {{COLOR}}',
        ],
      ]);
?>
```

