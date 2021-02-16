# Jet Style Manager
Integration of styles into gutenberg blocks

## How to use:
To add style to Gutenberg blocks, you need to call the `jet_sm_register_style_for_block` function on `wp` hook `init` with priority 10, and before the block `register_block_type` function, if you register the php callback for a block.

Example:

```php
<?php
    add_action( 'init', 'gutenberg_blocks_add_style', 10 );
    function gutenberg_blocks_add_style() {
        if( ! function_exists('jet_sm_register_style_for_block') ){
            return;
        }
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
        $controls_manager->end_section();

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
<br/>*Values*: `style_controls` | `controls` - Works only if the function [register_block
    ](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#register_block) used.
<br/>*Default*: `style_controls`
* args
    * `id` - Section ID. Must be unique.
    * `class_name` - Section CSS class in editor.
<br/>*Default*: `jet-st-section`
    * `title` - Section title.
<br/>*Default*: `''`
    * `icon` -  Section icon. You can use inline SVG or [Dashicons
    ](https://developer.wordpress.org/resource/dashicons/#arrow-right-alt2)
<br/>*Default*: `''`
    * `initial_open` - Section open or closed when block is selected
<br/> *Values*: `true` | `false`
<br/>*Default*: `false`

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
<br/>*Values*: `style_controls` | `controls` - Works only if the function [register_block
    ](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#register_block) used.
<br/>*Default*: `style_controls`
* args
    * `id` - Tabs ID. Must be unique.
    * `class_name` - Tabs wrapper CSS class in editor.
<br/>*Default*: `jet-st-tabs`
    * `active_class` - Active tab CSS class in editor.
<br/>*Default*: `jet-st-active-tab`
    * `orientation` - Tabs type
<br/>*Values*: `horizontal` | `vertical`
<br/>*Default*: `horizontal`
    * `initialTabName` - Name of the tab that will be active
<br/>*Default*: `''`
    * `separator` - Separator between options
<br/>*Values*: `before` | `after`| `both`
<br/>*Default*: `''`

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
<br/>*Values*: `style_controls` | `controls` - Works only if the function [register_block
    ](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#register_block) used.
<br/>*Default*: `style_controls`
* args
    * `id` - Tab ID. Must be unique.
    * `title` - Tab name.
<br/>*Default*: `''`

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
<br/>*Default*: `''`
* `label` - Сontrol label.
<br/>*Default*: `''`
* `help` - Control description.
<br/>*Default*: `''`
* `separator` - Separator between options
<br/>*Values*: `before` | `after`| `both`
<br/>*Default*: `''`
 * `condition` - Сondition on other options, this allows you to hide or show an option.
<br/>*Values exemple*: `[ 'show_label' => true ]`
<br/>*Default*: `[]`
* `css_selector` - Option to create selector and style options for elements.
<br/>*Default*: `[]`
<br/>*Values exemple*: `[ '{{WRAPPER}} .my_html_element' => '...' ]`
<br/>*Macros*:
    * `{{ID}}` - Gutenberg Block ID
    * `{{WRAPPER}}` - Gutenberg Block Class
* `return_value` - Array with overridden values of the main value. Works with `{{VALUE}}` macros
<br/>*Default*: `[]`
<br/>*Values exemple*: `[ 'left'   => 'margin-left: 0; margin-right: auto;' ]`
 * `attributes` - Default values. If a responsive control is used, you can set a default value for devices.
<br/>*Values exemple*: `[  'default' => [ 'mobile' => '#fff','tablet'  => '#fff', 'value' => '#fff',  'desktop_large' => '#fff', ] ]`
<br/>*Default*: `[]`

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
    'attributes' => [
      'default' => [
        'value' => '#fff',
      ]
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
    'attributes' => [
      'default' => [
        'mobile'        => '#fff',
        'tablet'        => '#fff',
        'value'         => '#fff', //Desktop
        'desktop_large' => '#fff',
      ]
    ],
  ]);
?>
```

# Style Controls

## Border

![border](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/border.png)

##### Arguments:
* [Basic Arguments](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#basic-arguments)
* `type` - Control type
<br/>*Default*: `border`
* `class_name` - Сontrol CSS class in editor.
<br/>*Default*: `jet-st-border-control`
* `disable_custom_colors` - Show / Hide the custom colors button.
<br/>*Values*: `true` | `false`
<br/>*Default*: `false`
* `clearable` - Show / Hide сlear color button.
<br/>*Values*: `true` | `false`
<br/>*Default*: `true`
* `disable_style` - Show / Hide border style select
<br/>*Values*: `true` | `false`
<br/>*Default*: `false`
* `disable_radius` - Show / Hide border radius control
<br/>*Values*: `true` | `false`
<br/>*Default*: `false`
* `disable_width` - Show / Hide border width control
<br/>*Values*: `true` | `false`
<br/>*Default*: `false`
* `disable_color` - Show / Hide border color control
<br/>*Values*: `true` | `false`
<br/>*Default*: `false`
* `css_selector` - Option to create selector and style options for elements.
<br/>*Default*: `[]`
<br/>*Values exemple*: `[
                    '{{WRAPPER}} .my_html_element' => 'border-style: {{STYLE}}; border-width: {{WIDTH}}; border-radius: {{RADIUS}}; border-color: {{COLOR}}',
                ]`
<br/>*Macros*:
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
    'label'       => esc_html__( 'Border', 'jet-plugin' ),
    'css_selector'  => [
      '{{WRAPPER}} .my_html_element' => 'border-style: {{STYLE}}; border-width: {{WIDTH}}; border-radius: {{RADIUS}}; border-color: {{COLOR}}',
    ],
    'attributes' => [
      'default' => [
        'value' => [
            'style' => 'none',
              'radius' => [
                'top'    => '0px',
                'right'  => '0px',
                'bottom' => '0px',
                'left'   => '0px'
              ],
              'width': [
                'top'    => '0px',
                'right'  => '0px',
                'bottom' => '0px',
                'left'   => '0px'
              ],
              'color' => '#000',
        ],
      ]
    ],
  ]);
?>
```

## Choose

![choose](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/choose.png)

##### Arguments:
* [Basic Arguments](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#basic-arguments)
* `type` - Control type
<br/>*Default*: `choose`
* `class_name` - Сontrol CSS class in editor.
<br/>*Default*: `jet-st-choose-control`
* `icon_size` - If provided with icon, sets the icon size.
<br/>*Values*: `Integer`
<br/>*Default*: `20`
* `show_tooltip` - Show hint or not
<br/>*Values*: `true` | `false`
<br/>*Default*: `true`
* `tooltip_position` - Sets the position of the tooltip.
<br/>*Values*:  `top` | `bottom` | `center` | `left` | `right`
<br/>*Default*: `top center`
* `options` - Array with options to be shown in choose
<br/>*Values exemple*: `[
          'center'    => [
                        'shortcut' => esc_html__( 'Center', 'jet-plugin' ),
            'label' => esc_html__( 'Center', 'jet-plugin' ),
            'icon'  => 'dashicons-editor-aligncenter',
          ] ]`
<br/>*Default*: `[]`
* `css_selector` - Option to create selector and style options for elements
<br/>*Default*: `[]`
<br/>*Values exemple*: `[
                    '{{WRAPPER}} .my_html_element' => 'align-self: {{VALUE}};',
                ]`
<br/>*Macros*:
    * [Macros in basic arguments](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#basic-arguments)
    * `{{VALUE}}` - Option value

Example:

```php
<?php
  $controls_manager->add_control([
    'id'        => 'my_style_controls',
    'type'      => 'choose',
    'label'     => esc_html__( 'Alignment', 'jet-plugin' ),
    'options'   =>[
      'flex-start'    => [
        'shortcut' => esc_html__( 'Left', 'jet-plugin' ),
        'icon'  => 'dashicons-editor-alignleft',
      ],
      'center'    => [
        'shortcut' => esc_html__( 'Center', 'jet-plugin' ),
        'icon'  => 'dashicons-editor-aligncenter',
      ],
      'flex-end'    => [
        'shortcut' => esc_html__( 'Right', 'jet-plugin' ),
        'icon'  => 'dashicons-editor-alignright',
      ],
      'stretch'    => [
        'shortcut' => esc_html__( 'Stretch', 'jet-plugin' ),
        'icon'  => 'dashicons-editor-justify',
      ],
    ],
    'css_selector' => [
      '{{WRAPPER}} .my_html_element' => 'align-self: {{VALUE}};',
    ],
    'attributes' => [
      'default' => [
        'value' => 'flex-start',
      ]
    ],
  ]);
?>
```

## Color Pcker

![Color Pcker](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/color-picker.png)

##### Arguments:
* [Basic Arguments](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#basic-arguments)
* `type` - Control type
<br/>*Default*: `color-picker`
* `class_name` - Сontrol CSS class in editor.
<br/>*Default*: `jet-st-color-picker`
* `disable_custom_colors` - Disables custom color selection.
<br/>*Values*:  `false` | `true`
<br/>*Default*: `false`
* `clearable` - Disables clear button.
<br/>*Values*: `false` | `true`
<br/>*Default*: `true`
* `colors` - Colors to be shown in the color picker.
<br/>*Values*: `Array`
<br/>*Values exemple*: `[ name: "Vivid green cyan", slug: "vivid-green-cyan", color: "#00d084" ]`
<br/>*Default*: The default WordPress colors are set. `wp.data.select('core/block-editor').getSettings().colors`
* `css_selector` - Option to create selector and style options for elements
<br/>*Default*: `[]`
<br/>*Values exemple*: `[ '{{WRAPPER}} .my_html_element' => 'color: {{VALUE}};' ]`
<br/>*Macros*:
    * [Macros in basic arguments](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#basic-arguments)
    * `{{VALUE}}` - Option value

Example:

```php
<?php
  $controls_manager->add_control([
    'id'         => 'color',
    'type'       => 'color-picker',
    'label'      => esc_html__( 'Color', 'jet-plugin' ),
    'attributes' => [
      'default' => [
        'value' => '#fff',
      ],
    ],
    'css_selector' => array(
      '{{WRAPPER}}  .my_html_element' => 'color: {{VALUE}}',
    ),
  ]);
?>
```

## Dimensions

![dimensions](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/dimensions.png)

##### Arguments:
* [Basic Arguments](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#basic-arguments)
* `type` - Control type
<br/>*Default*: `dimensions`
* `class_name` - Сontrol CSS class in editor.
<br/>*Default*: `jet-st-dimensions-control`
* `units` - Units.
<br/>*Default*: `[ 'px', '%',]`
* `css_selector` - Option to create selector and style options for elements
<br/>*Default*: `[]`
<br/>*Values exemple*: `[ '{{WRAPPER}} .my_html_element' => 'padding: {{TOP}} {{RIGHT}} {{BOTTOM}} {{LEFT}};' ]`
<br/>*Macros*:
    * [Macros in basic arguments](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#basic-arguments)
    * `{{TOP}}` - Top value (with units)
    * `{{RIGHT}}` - Right value (with units)
    * `{{BOTTOM}}` - Bottom value (with units)
    * `{{LEFT}}` - Left value (with units)

Example:

```php
<?php
    $controls_manager->add_control([
    'id'            => 'padding_cintrol',
    'type'          => 'dimensions',
    'label'         => esc_html__( 'Padding', 'jet-plugin' ),
    'units'         =>  ['px', '%'],
    'css_selector'  => array(
      '{{WRAPPER}}  .my_html_element' => 'padding: {{TOP}} {{RIGHT}} {{BOTTOM}} {{LEFT}};',
    ),
    'attributes' => [
      'default' => [
        'value' =>[
          'top' => '50px',
          'left' =>'10%',
          'right' => '10%',
          'bottom' => '50px',
        ],
      ],
    ],
  ]);
?>
```

## Range

![range](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/range.png)

##### Arguments:
* [Basic Arguments](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#basic-arguments)
* `type` - Control type
<br/>*Default*: `range`
* `class_name` - Сontrol CSS class in editor.
<br/>*Default*: `jet-st-range-control`
* `beforeIcon` - If this property is added, a DashIcon component will be rendered before the slider with the icon equal to beforeIcon.
<br/>*Default*: `''`
* `afterIcon` - If this property is added, a DashIcon component will be rendered after the slider with the icon equal to afterIcon.
<br/>*Default*: `''`
* `icon` - icon.
<br/>*Default*: `''`
* `disabled` - Disables the input, preventing new values from being applied.
<br/>*Default*: `false`
<br/>*Values*: `true` | `false`
* `initial_position` - If no value exists this prop contains the slider starting position.
<br/>*Default*: `0`
* `is_shift_step_enabled` - If true, pressing UP or DOWN along with the SHIFT key will increment the value by the shiftStep value.
<br/>*Default*: `true`
<br/>*Values*: `true` | `false`
* `allow_reset` - If this property is true, a button to reset the the slider is rendered.
<br/>*Default*: `false`
<br/>*Values*: `true` | `false`
* `marks` - Renders a visual representation of step ticks. Custom mark indicators can be provided by an Array.
<br/>*Values exemple*: `[ [ value: 0, label: '0', ] ]`
<br/>*Default*: `[]`
* `min` - The minimum value allowed.
<br/>*Default*: `0`
* `max` - The maximum value allowed.
<br/>*Default*: `100`
* `step` - The stepping interval between min and max values. Step is used both for user interface and validation purposes.
<br/>*Default*: `1`
* `rail_color` - Customizes the (background) color of the rail element.
<br/>*Default*: `''`
* `track_color` - Customizes the (background) color of the track element.
<br/>*Default*: `''`
* `show_tooltip` - Forcing the Tooltip UI to show or hide.
<br/>*Default*: `false`
<br/>*Values*: `true` | `false`
* `with_input_field` - Determines if the input number field will render next to the RangeControl.
<br/>*Default*: `true`
<br/>*Values*: `true` | `false`
* `separator_type` - Define if separator line under/above control row should be disabled or full width. By default it is placed below excluding underline the control icon.
<br/>*Default*: `none`
<br/>*Values*: `none` | `fullWidth` | `topFullWidth`
* `units` - Units.
<br/>*Default*: ``
* `css_selector` - Option to create selector and style options for elements
<br/>*Default*: `[]`
<br/>*Values exemple*: `[ '{{WRAPPER}} .my_html_element' => 'width: {{VALUE}}{{UNIT}}; max-width: {{VALUE}}{{UNIT}}' ]`
<br/>*Macros*:
    * [Macros in basic arguments](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#basic-arguments)
    * `{{VALUE}}` - Value (without units)
    * `{{UNIT}}`  - Value unit

Example:

```php
<?php
    $controls_manager->add_control([
    'id'           => 'my_range',
    'type'         => 'range',
    'label'        => esc_html__( 'Select Width', 'jet-plugin' ),
    'css_selector' => [
      '{{WRAPPER}} .my_html_element' => 'width: {{VALUE}}{{UNIT}}; max-width: {{VALUE}}{{UNIT}}',
    ],
    'attributes' => [
      'default' => [
        'value' => [
          'value' => 50,
          'unit' => '%'
        ]
      ]
    ],
    'units' => [
      [
        'value' => '%',
        'intervals' => [
          'step' => 1,
          'min'  => 10,
          'max'  => 100,
        ]
      ],
    ],
  ]);
?>
```

## Text

![text](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/text.png)

##### Arguments:
* [Basic Arguments](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#basic-arguments)
* `type` - Control type
<br/>*Default*: `text`
* `class_name` - Сontrol CSS class in editor.
<br/>*Default*: `jet-st-text`
* `as` - Determines the HTML selector for the text.
* <br/>*Values*: `h1` | `h2` | `h3` | `h4` | `h5` | `h6` | `p`
<br/>*Default*: `h3`
* `variant` - Determines the style for the text.
<br/>*Values*: `title` | `title.large` | `title.medium` | `title.small` | `subtitle` | `subtitle.large` | `subtitle.small`| `body`| `body.large`| `body.small`| `button`| `caption`| `label`
<br/>*Default*: `title`
* `content` - Content.
<br/>*Default*: `''`

Example:

```php
<?php
    $controls_manager->add_control([
    'id'      => 'label_heading',
    'type'    => 'text',
    'content' => esc_html__( 'Label', 'jet-plugin' ),
  ]);
?>
```

## toggle

![toggle](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/toggle.png)

##### Arguments:
* [Basic Arguments](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#basic-arguments)
* `type` - Control type
<br/>*Default*: `toggle`
* `class_name` - Сontrol CSS class in editor.
<br/>*Default*: `jet-st-toggle-control`
* `css_selector` - Option to create selector and style options for elements
<br/>*Default*: `[]`
<br/>*Values exemple*: `[ '{{WRAPPER}} .my_html_element' => '{{VALUE}}' ]`
<br/>*Macros*:
    * [Macros in basic arguments](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#basic-arguments)
    * `{{VALUE}}` - Value

Example:

```php
<?php
    $controls_manager->add_control([
    'id'         => 'my_toggle',
    'type'       => 'toggle',
    'label'      => esc_html__( 'Reset Field Appearance', 'jet-plugin' ),
    'help'       => esc_html__( 'Check this option to reset field appearance CSS value. This will make field appearance the same for all browsers', 'jet-plugin' ),
    'return_value' => [
      'true'  => '-webkit-appearance: none; appearance: none;',
      'false' => '',
    ],
    'css_selector' => [
      '{{WRAPPER}} .my_html_element' => '{{VALUE}}',
    ],
    'attributes' => [
      'default' => [
        'value' => false,
      ]
    ],
  ]);
?>
```


## typography

![typography](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/typography.png)

##### Arguments:
* [Basic Arguments](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#basic-arguments)
* `type` - Control type
<br/>*Default*: `typography`
* `class_name` - Сontrol CSS class in editor.
<br/>*Default*: `jet-st-typography-control`
* `disable_family` - Disable a font family.
<br/>*Values*: `true` | `false`
<br/>*Default*: `false`
* `disable_size` - Disable a font size.
<br/>*Values*: `true` | `false`
<br/>*Default*: `false`
* `disable_weight` - Disable a font weight.
<br/>*Values*: `true` | `false`
<br/>*Default*: `false`
* `disable_transform` - Disable a font transform.
<br/>*Values*: `true` | `false`
<br/>*Default*: `false`
* `disable_style` - Disable a font style.
<br/>*Values*: `true` | `false`
<br/>*Default*: `false`
* `disable_decoration` - Disable a font decoration.
<br/>*Values*: `true` | `false`
<br/>*Default*: `false`
* `disable_line_height` - Disable a font height.
<br/>*Values*: `true` | `false`
<br/>*Default*: `false`
* `disable_letter_spacing` - Disable a font spacing.
<br/>*Values*: `true` | `false`
<br/>*Default*: `false`
* `family` - Font family list.
<br/>*Default*:
```php
[
  [ 'label' => 'Default',         'value' => 'inherit' ],
  [ 'label'=>  'Arial',           'value' => '"Arial", sans-serif' ],
  [ 'label'=>  'Tahoma',          'value' => '"Tahoma"' ],
  [ 'label'=>  'Verdana',         'value' => '"Verdana"' ],
  [ 'label'=>  'Helvetica',       'value' => '"Helvetica"' ],
  [ 'label'=>  'Times New Roman', 'value' => '"Times New Roman"' ],
  [ 'label'=>  'Trebuchet MS',    'value' => '"Trebuchet MS"' ],
  [ 'label'=>  'Georgia',         'value' => '"Georgia"' ],
]
```
* `weight` - Font weight list.
<br/>*Default*:
```php
[
  [ 'label' => '100',     'value' => '100' ],
  [ 'label' => '200',     'value' => '200' ],
  [ 'label' => '300',     'value' => '300' ],
  [ 'label' => '400',     'value' => '400' ],
  [ 'label' => '500',     'value' => '500' ],
  [ 'label' => '600',     'value' => '600' ],
  [ 'label' => '700',     'value' => '700' ],
  [ 'label' => '800',     'value' => '800' ],
  [ 'label' => '900',     'value' => '900' ],
  [ 'label' => 'Default', 'value' => '' ],
  [ 'label' => 'Normal',  'value' => 'normal' ],
  [ 'label' => 'Bold',    'value' => 'bold' ],
]
```
* `transform` - Font transform list.
<br/>*Default*:
```php
[
  [ 'label' => 'Default',    'value' => 'inherit' ],
  [ 'label' => 'Uppercase',  'value' => 'uppercase' ],
  [ 'label' => 'Lowercase',  'value' => 'lowercase' ],
  [ 'label' => 'Capitalize', 'value' => 'capitalize' ],
  [ 'label' => 'Normal',     'value' => 'none' ],
]
```
* `style` - Font style list.
<br/>*Default*:
```php
[
  [ 'label' => 'Default', 'value' => 'inherit' ],
  [ 'label' => 'Normal',  'value' => 'normal' ],
  [ 'label' => 'Italic',  'value' => 'italic' ],
  [ 'label' => 'Oblique', 'value' => 'oblique' ],
]
```
* `decoration` - Font decoration list.
<br/>*Default*:
```php
[
  [ 'label' => 'Default',      'value' => 'inherit' ],
  [ 'label' => 'Underline',    'value' => 'underline' ],
  [ 'label' => 'Overline',     'value' => 'overline' ],
  [ 'label' => 'Line Through', 'value' => 'line-through' ],
  [ 'label' => 'None',         'value' => 'none' ],
]
```
* `s_units` - Font size units list.
<br/>*Default*:
```php
[
  [ 'label' => 'PX', 'value' => 'px', 'intervals' => [ 'step' => 1, 'min' => 1, 'max' =>200, 'initialPosition' => 14 ] ],
  [ 'label' => 'EM', 'value' => 'em', 'intervals' => [ 'step' => 1, 'min' => 1, 'max' =>10, 'initialPosition' => 1 ] ],
  [ 'label' => 'REM', 'value' => 'rem', 'intervals' => [ 'step' => 1, 'min' => 1, 'max' =>10, 'initialPosition' => 1 ] ],
  [ 'label' => 'VW', 'value' => 'vw', 'intervals' => [ 'step' => 1, 'min' => 1, 'max' =>10, 'initialPosition' => 1 ] ],
]
```
* `lh_units` - Font line height units list.
<br/>*Default*:
```php
[
  [ 'label' => 'None', 'value' => '', 'intervals' => [ 'step' => 1, 'min' => 1, 'max' =>10, 'initialPosition' => 1 ] ],
  [ 'label' => 'PX', 'value' => 'px', 'intervals' => [ 'step' => 1, 'min' => 1, 'max' =>10, 'initialPosition' => 14 ] ],
  [ 'label' => 'EM', 'value' => 'em', 'intervals' => [ 'step' => 1, 'min' => 1, 'max' =>10, 'initialPosition' => 1 ] ],
]
```
* `ls_units` - Font letter spacing units list.
<br/>*Default*: `[]`
* `default_intervals` - .
<br/>*Default*: `[ 'step' => 0.1, 'min' => -2, 'max' => 20, 'initialPosition' => 0 ]`
* `css_selector` - Option to create selector and style options for elements
<br/>*Default*: `[]`
<br/>*Values exemple*: `[  '{{WRAPPER}}  .my_html_element' => 'font-family: {{FAMILY}}; font-weight: {{WEIGHT}}; text-transform: {{TRANSFORM}}; font-style: {{STYLE}}; text-decoration: {{DECORATION}}; line-height: {{LINEHEIGHT}}{{LH_UNIT}}; letter-spacing: {{LETTERSPACING}}{{LS_UNIT}}; font-size: {{SIZE}}{{S_UNIT}};' ]`
<br/>*Macros*:
    * [Macros in basic arguments](https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md#basic-arguments)
    * `{{FAMILY}}` - Returns the font family.
    * `{{WEIGHT}}` - Returns the font weight.
    * `{{TRANSFORM}}` - Returns the font transform.
    * `{{STYLE}}` - Returns the font style.
    * `{{DECORATION}}` - Returns the font decoration.
    * `{{LINEHEIGHT}}` - Returns the line height.
    * `{{LH_UNIT}}` - Returns the line height unit.
    * `{{LETTERSPACING}}` - Returns the letter spacing.
    * `{{LS_UNIT}}` - Returns the letter spacin unit.
    * `{{SIZE}}` - Returns the font size.
    * `{{S_UNIT}}` - Returns the font size unit.

Example:

```php
<?php
    $controls_manager->add_control([
    'id'         => 'my_typography',
    'type'       => 'typography',
    'css_selector' => [
      '{{WRAPPER}}  .my_html_element' => 'font-family: {{FAMILY}}; font-weight: {{WEIGHT}}; text-transform: {{TRANSFORM}}; font-style: {{STYLE}}; text-decoration: {{DECORATION}}; line-height: {{LINEHEIGHT}}{{LH_UNIT}}; letter-spacing: {{LETTERSPACING}}{{LS_UNIT}}; font-size: {{SIZE}}{{S_UNIT}};',
    ],
  ]);
?>
```
[//]: <> (## select)
[//]: <> (## input)
[//]: <> (## stepper)

## register_block
Function for registering new Gutenberg blocks. You need to call the `register_block` function on `wp` hook `init` with priority `10`, and before the block `register_block_type function`, if you register the php callback for a block.

##### Arguments:
* `name` - The name for a block is a unique string that identifies a block. Names have to be structured as **namespace/block-name**, where namespace is the name of your plugin or theme.
<br/>*Default*: `null`
* args
    * `title` - This is the display title for your block. The block inserter will show this name.
<br/> *Default*: `Jet-Gutenberg-Block`
    * `icon` -  An icon property should be specified to make it easier to identify a block. These can be any of  [WordPress’ Dashicons
    ](https://developer.wordpress.org/resource/dashicons/#reddit), or a custom svg element.
<br/> *Default*: `block-default`
    * `description` - This is a short description for your block. This will be shown in the Block Tab in the Settings Sidebar.
<br/> *Default*: `Jet block for Gutenberg`
    * `category` -  Blocks are grouped into categories to help users browse and discover them.
<br/> *Default*: `layout`
    * `keywords` - Sometimes a block could have aliases that help users discover it while searching. For example, an image block could also want to be discovered by photo. You can do so by providing an array of terms (which can be translated)
<br/> *Default*: `[ 'jet', 'croco' ]`
    * `supports` - Supports contains as set of options to control features used in the editor. See the the [supports documentation](https://developer.wordpress.org/block-editor/developers/block-api/block-supports/) for more details.
<br/> *Default*: `[]`
    * `styles` - Block styles can be used to provide alternative styles to block. It works by adding a class name to the block’s wrapper. Using CSS, a theme developer can target the class name for the style variation if it is selected.
<br/> *Default*: `null`
    * `save_callback` - JS function must be located in the global object `window`. Function gets an argument with properties { attributes, setAttributes, className, isSelected }
<br/> *Default*: `null`

Example:

```php
<?php
    add_action( 'init', 'register_my_block', 10 );
    function register_my_block() {

        if( ! function_exists('jet_sm_register_block') ){
            return;
        }

        //Registering a manager for a block 'jet-plugin/my-amazing-block'
        $my_amazing_block = jet_sm_register_block(
        'myplugin/test-cutenberg',
        [
          'title'         => esc_html__( 'My Gutenberg Block', 'jet-plugin' ),
          'icon'          => 'block-default',
          'description'   => esc_html__( 'Jet block for Gutenberg', 'jet-plugin' ),
          'category'      => 'layout',
          'keywords'      => [ 'jet', 'croco' ],
          'save_callback' => 'myBlockRenderCallback', //JS function must be located in the global object 'window'. Function gets an argument with properties { attributes, setAttributes, className, isSelected }
        ]
      );

        //Start section with options
      $my_amazing_block->start_section(
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
        $my_amazing_block->end_section();
    }
?>
```
