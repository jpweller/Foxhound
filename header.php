<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Foxhound
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	
	<a class="skip-link screen-reader-text" href="#main"><?php esc_html_e( 'Skip to content', 'foxhound' ); ?></a>

	<header id="masthead" class="site-header" role="banner">

		<h1 class="site-branding">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
				<span class="screen-reader-text"><?php bloginfo( 'name' ); ?></span>
				<svg class="logo" viewbox="0 0 120 24">
					<path stroke="black" stroke-width="8" fill="none" stroke-dasharray="148 148" stroke-dashoffset="-67.5" d="M -46,4 C -36,4 -36,20 -26,20 C -16,20 -16,4 -6,4 C 4,4 4,20 14,20 C 24,20 24,4 34,4 C 44,4 44,20 54,20 C 64,20 64,4 74,4 C 84,4 84,20 94,20 C 104,20 104,4 114,4">
						<animateTransform attributeType="XML" attributeName="transform" type="translate" values="0 0; 40 0" begin="indefinite" dur="1s" keySplines="0.42 0 0.58 1" calcMode="spline" repeatCount="1"/>
						<animate attributeType="XML" attributeName="stroke-dashoffset" values="-67.5; -13.5" begin="indefinite" dur="1s" keySplines="0.42 0 0.58 1" calcMode="spline" repeatCount="1"/>
					</path>
				</svg>
			</a>
		</h1>

		<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
			<span class="burger"></span>
			<span class="screen-reader-text"><?php esc_html_e( 'Menu', 'foxhound' ); ?></span>
		</button>

		<div class="site-nav">

			<nav class="menu-site" role="navigation" aria-live="assertive">
				<?php 
					$menuParameters = array(
						'theme_location'  => 'primary',
						'container'       => false,
						'echo'            => false,
						'items_wrap'      => '%3$s',
						'depth'           => 0,
					);
					echo strip_tags(wp_nav_menu( $menuParameters ), '<a>' );
				?>
			</nav>

			<aside class="menu-social">
				<a target="_blank" href="https://dribbble.com/jpweller">
					<span class="screen-reader-text">Dribbble</span>
					<svg viewbox="0 0 32 32">
						<path d="M20 25.438c-.156-.907-.75-4.032-2.188-7.782-.015 0-.046.016-.062.016 0 0-6.078 2.125-8.047 6.406-.094-.078-.234-.172-.234-.172A10.296 10.296 0 0 0 16 26.25c1.422 0 2.766-.297 4-.813zm-2.89-9.485a29.114 29.114 0 0 0-.829-1.734C11 15.797 5.938 15.672 5.766 15.672c-.016.11-.016.219-.016.328 0 2.625 1 5.031 2.625 6.844 2.797-4.985 8.328-6.766 8.328-6.766.14-.047.281-.078.406-.125zm-1.672-3.312a61.9 61.9 0 0 0-3.813-5.907 10.266 10.266 0 0 0-5.656 7.157c.265 0 4.547.046 9.468-1.25zm10.687 4.984c-.219-.063-3.078-.969-6.39-.453 1.343 3.703 1.89 6.719 2 7.328a10.29 10.29 0 0 0 4.39-6.875zm-12.6-11.57a.041.041 0 0 1 .022-.008c-.008 0-.012 0-.016.002l-.006.006zm9.24 2.258a10.171 10.171 0 0 0-9.187-2.266c.156.203 2.094 2.75 3.844 5.969 3.86-1.438 5.312-3.657 5.344-3.704zm3.485 7.578a10.272 10.272 0 0 0-2.328-6.407c-.031.032-1.672 2.407-5.719 4.063.235.484.469.984.688 1.484.078.172.14.36.218.531 3.532-.453 7.016.313 7.141.329zM28 16c0 6.625-5.375 12-12 12S4 22.625 4 16 9.375 4 16 4s12 5.375 12 12z"/>
					</svg>
				</a>
				<a target="_blank" href="https://www.codepen.io/jpweller">
					<span class="screen-reader-text">CodePen</span>
					<svg viewbox="0 0 32 32">
						<path d="M5.38 20.27l9.42 6.28v-5.61l-5.22-3.49-4.2 2.82zm-.97-2.25L7.42 16l-3.01-2.02v4.04zm12.8 8.53l9.42-6.28-4.2-2.82-5.23 3.49v5.6zM16 18.85L20.25 16 16 13.16 11.75 16 16 18.84zm-6.42-4.3l5.22-3.49v-5.6l-9.42 6.27 4.2 2.82zm15 1.45l3.01 2.02v-4.04L24.58 16zm-2.16-1.45l4.2-2.82-9.42-6.28v5.61l5.22 3.49zM30 11.73v8.54c0 .39-.2.78-.53 1l-12.8 8.53c-.2.12-.44.2-.67.2a1.3 1.3 0 0 1-.67-.2l-12.8-8.53c-.33-.22-.53-.61-.53-1v-8.54c0-.39.2-.78.53-1l12.8-8.53c.2-.12.44-.2.67-.2.23 0 .47.08.67.2l12.8 8.53c.33.22.53.61.53 1z"/>
					</svg>
				</a>
				<a target="_blank" href="https://github.com/jpweller">
					<span class="screen-reader-text">GitHub</span>
					<svg viewbox="0 0 32 32">
						<path d="M16 4c6.625 0 12 5.375 12 12 0 5.297-3.438 9.797-8.203 11.39-.61.11-.828-.265-.828-.578 0-.39.015-1.687.015-3.296 0-1.125-.375-1.844-.812-2.22 2.672-.296 5.484-1.312 5.484-5.921 0-1.313-.469-2.375-1.234-3.219.125-.312.531-1.531-.125-3.187-1-.313-3.297 1.234-3.297 1.234a11.298 11.298 0 0 0-6 0S10.703 8.656 9.703 8.97c-.656 1.656-.25 2.875-.125 3.187-.766.844-1.234 1.906-1.234 3.219 0 4.594 2.797 5.625 5.468 5.922-.343.312-.656.844-.765 1.61-.688.312-2.438.843-3.485-1-.656-1.141-1.843-1.235-1.843-1.235-1.172-.016-.078.734-.078.734.78.36 1.328 1.75 1.328 1.75.703 2.14 4.047 1.422 4.047 1.422 0 1 .015 1.938.015 2.234 0 .313-.219.688-.828.579C7.437 25.797 4 21.297 4 16 4 9.375 9.375 4 16 4zM8.547 21.234c-.031.063-.125.078-.203.032-.094-.047-.14-.125-.11-.188.032-.047.11-.062.203-.031.094.047.141.125.11.187zm.484.532c-.062.062-.172.03-.25-.047-.078-.094-.094-.203-.031-.25.062-.063.172-.032.25.047.078.093.094.203.031.25zm.469.703c-.063.047-.188 0-.266-.11-.078-.109-.078-.234 0-.28.078-.063.203-.017.266.093.078.11.078.234 0 .297zm.656.656c-.062.078-.203.062-.312-.047-.11-.094-.14-.234-.063-.297.063-.078.203-.062.313.047.093.094.125.234.062.297zm.89.39c-.03.094-.171.141-.296.094-.14-.03-.234-.14-.203-.234s.172-.14.297-.11c.14.047.234.157.203.25zm.985.079c0 .093-.11.172-.25.172-.156.015-.265-.063-.265-.172 0-.094.109-.172.25-.172.14-.016.265.062.265.172zm.906-.157c.016.094-.078.188-.218.22-.14.03-.266-.032-.282-.126-.015-.11.079-.203.22-.234.14-.016.265.047.28.14z"/>
					</svg>
				</a>
				<a target="_blank" href="https://www.instagram.com/jpweller">
					<span class="screen-reader-text">Instagram</span>
					<svg viewbox="0 0 32 32">
						<path d="M20 16c0-2.203-1.797-4-4-4-2.203 0-4 1.797-4 4 0 2.203 1.797 4 4 4 2.203 0 4-1.797 4-4zm2.156 0A6.148 6.148 0 0 1 16 22.156 6.148 6.148 0 0 1 9.844 16 6.148 6.148 0 0 1 16 9.844 6.148 6.148 0 0 1 22.156 16zm1.687-6.406c0 .797-.64 1.438-1.437 1.438s-1.438-.64-1.438-1.438c0-.797.64-1.437 1.438-1.437.797 0 1.437.64 1.437 1.437zM16 6.157c-1.75 0-5.5-.14-7.078.484a3.836 3.836 0 0 0-1.374.907 3.836 3.836 0 0 0-.907 1.374C6.016 10.5 6.157 14.25 6.157 16s-.14 5.5.484 7.078c.22.546.485.953.907 1.374.421.422.828.688 1.374.907 1.578.625 5.328.484 7.078.484s5.5.14 7.078-.484a3.836 3.836 0 0 0 1.374-.907c.422-.421.688-.828.907-1.374.625-1.578.484-5.328.484-7.078s.14-5.5-.484-7.078a3.836 3.836 0 0 0-.907-1.374 3.836 3.836 0 0 0-1.374-.907C21.5 6.016 17.75 6.157 16 6.157zM27.999 16c0 1.656.016 3.297-.078 4.953-.094 1.921-.531 3.624-1.937 5.03-1.407 1.407-3.11 1.844-5.031 1.938-1.656.094-3.297.078-4.953.078-1.656 0-3.297.016-4.953-.078-1.921-.094-3.624-.531-5.03-1.937-1.407-1.407-1.844-3.11-1.938-5.031-.094-1.656-.078-3.297-.078-4.953 0-1.656-.016-3.297.078-4.953.094-1.921.531-3.624 1.937-5.03 1.407-1.407 3.11-1.844 5.031-1.938 1.656-.094 3.297-.078 4.953-.078 1.656 0 3.297-.016 4.953.078 1.921.094 3.624.531 5.03 1.937 1.407 1.407 1.844 3.11 1.938 5.031.094 1.656.078 3.297.078 4.953z"/>
					</svg>
				</a>
			</aside>

		</div>

	</header>
