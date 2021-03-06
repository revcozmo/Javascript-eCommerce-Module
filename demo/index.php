<!DOCTYPE html>
<html>
<head>
	<title>eCommerce Module</title>
	<script type="text/javascript" src="../src/eCommerce.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<h1 class="col-xs-offset-1">eCommerce</h1>
<hr>

<div class="filter"></div>
<div class="products"></div>
<nav class="pagination-links"></nav>

<?php 
	
	$products = json_encode([
		[
			'name' => 'Example Product 1', 
			'price' => 100.00, 
			'deliveryTime' => '6 days', 
			'image' => 'images/1.jpg'
		],
		[
			'name' => 'Example Product 2', 
			'price' => 120.00, 
			'deliveryTime' => '6 days', 
			'image' => 'images/2.jpg'
		],
		[
			'name' => 'Example Product 3', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/3.jpg'
		],
		[
			'name' => 'Example Product 4', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/4.jpg'
		],
		[
			'name' => 'Example Product 5', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/5.jpg'
		],
	]); 

?>
<script type="text/javascript">
	(function(eCommerce) {

		var eCommerce = new eCommerce;
		
		eCommerce.Settings({
			components: ['Products', 'Services', 'Filter', 'Pagination']
		});

		eCommerce.Products().Settings({
			element: '.products',
			class: 'col-xs-9',
			itemClass: 'col-xs-3',
			width: '200px',
			height: '280px',
			attributes: ['name', 'price', 'deliveryTime', 'image'],
			url: 'products.php',
			initStaticData: <?php echo $products ?>
		});

		eCommerce.Pagination().Settings({
			element: '.pagination-links',
			class: 'col-xs-offset-4 col-xs-10',
		});

		eCommerce.Products().AfterLoaded = function (product) {
			// run something after the products has been loaded.
		};

		eCommerce.Filter().Settings({
			bindTo: '.filter',
			class: 'col-xs-3',
			width: '',
			height: '',
		});

	})(eCommerce);
</script>
</body>
</html>