<?php

namespace HM\GutenbergTools;

/**
 * Setup the plugin.
 */
function setup() {
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_block_editor_assets' );
	add_action( 'rest_api_init', __NAMESPACE__ . '\\setup_rest_api_endpoint' );
}

/**
 * Enqueue assets in the editor.
 */
function enqueue_block_editor_assets() {
	wp_enqueue_script(
		'hm-gb-tools-editor',
		HM_GB_TOOLS_URL . '/build/editor.bundle.js',
		[ 'wp-blocks', 'wp-element', 'wp-data' ],
		filemtime( HM_GB_TOOLS_DIR . '/build/editor.bundle.js' ),
		false
	);

	wp_enqueue_style(
		'hm-gb-tools-editor',
		HM_GB_TOOLS_URL . '/build/editor.css',
		[],
		filemtime( HM_GB_TOOLS_DIR . '/build/editor.css' )
	);

	wp_localize_script( 'hm-gb-tools-editor', 'hmGbToolsData', [
		'endpoint' => 'hm-gb-tools/v1/multi-post-type',
	] );
}

function setup_rest_api_endpoint() {
	$controller = new Multi_Post_Type_Endpoint_Controller();
	$controller->register_routes();
}
