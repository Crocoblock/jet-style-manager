=== JetStyleManager for Gutenberg ===
Contributors: crocoblock
Tags: blocks, gutenberg, style, styles manager
Requires at least: 5.6
Tested up to: 6.1.1
Requires PHP: 7.2
Stable tag: 1.3.6
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

A plugin that extends Gutenberg functionality. Integrated to a Gutenberg plugin, JetStyleManager allows adding styles to it.

== Description ==

JetStyleManager is a plugin that extends the functionalities of Gutenberg. Combining this plugin with JetEngine, JetSmartFilters, and JetFormBuilder, you will be able to change block styles in the Gutenberg editor. This means that you can make a website built with Gutenberg and JetPlugins even more attractive.

= Compatible plugins =
- <a href="https://wordpress.org/plugins/jetformbuilder/">JetFormBuilder — form builder for Gutenberg</a>
- <a href="https://crocoblock.com/plugins/jetsmartfilters-gutenberg/?utm_source=wpordpress&utm_campaign=jetstylemanager">JetSmartFilters. Advanced filters for any post type</a>
- <a href="https://crocoblock.com/plugins/jetengine-gutenberg/?utm_source=wpordpress&utm_campaign=jetstylemanager">JetEngine. Everything for dynamic content in the block editor</a>
- more coming soon...

= For developers =
If you've got one or more plugins with Gutenberg blocks, JetStyleManager can offer you and your users an API for handy block styles management. As a developer, you get a convenient API that lets you add any custom styles supporting media queries, generate styles in a separate file, and manage them via 10+ different types of controls. Your users get a convenient UI and the ability to customize more styles than allowed by the standard Gutenberg UI. With this solution, you no longer need to add your own APIs for setting and compiling styles in every plugin used. This will ensure high performance both in the editor and on the frontend.

= Integrate into your plugin =

Guide how to integrate JetStyleManager into your blocks plugins you can find <a href="https://github.com/Crocoblock/jet-style-manager/blob/master/documentation/DOCUMENTATION.md" target="_blank">here</a>

Please, feel free to <a href="https://github.com/Crocoblock/jet-style-manager/issues" target="_blank">ask any questions</a> about your plugin integration.

== Changelog ==

**1.3.6**
 - FIX: Allowed memory exhausted in block editor (improving optimization)

**1.3.5**
 - UPD: allow to prevent wrapping blocks which implement SM class from own side
 - FIX: Elementor compatibility

**1.3.4**
 - FIX: better data sanitizing

**1.3.3**
 - UPD: sanitize function

**1.3.2**
 - FIX: WP error in font manager

**1.3.1**
 - FIX: WP error in font manager

**1.3.0**
 - FIX: Saving post meta
 - FIX: Font manager

**1.2.0**
 - ADD: Integrated google fonts in typography control

**1.1.6**
 - ADD: hooks for implementing custom sections and controls

**1.1.5**
 - FIX: Block wrapper

**1.1.4**
 - FIX: Typography control

**1.1.3**
 - FIX: Up init action priority in gutenberg style manager

**1.1.2**
 - FIX: Condition logic in gutenberg style manager

**1.1.1**
 - FIX: Elementor compatibility

**1.1.0**
 - ADD: Gutenberg compatibility
 - ADD: Languages default file

**1.0.0**
 - Initial release