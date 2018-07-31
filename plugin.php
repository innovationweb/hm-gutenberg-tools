<?php
/*
Plugin Name:  HM Gutenberg Tools Plugin
Plugin URI:   https://hmn.md
Description:  Tools for Gutenberg.
Version:      0.1
Author:       Human Made Limited
Author URI:   https://hmn.md
License:      GPL2
License URI:  https://www.gnu.org/licenses/gpl-2.0.html
Text Domain:  hm-gb
Domain Path:  /languages
*/

require_once __DIR__ . '/inc/constants.php';
require_once __DIR__ . '/inc/namespace.php';

add_action( 'after_setup_theme', function() {
	\HM\GutenbergTools\setup();
});
