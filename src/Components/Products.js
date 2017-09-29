
import DOM from '../Helpers/DOM.js';
import Common from '../Helpers/Common.js';
import InvalidArgumentException from '../Exceptions/InvalidArgumentException.js';

/**
 * The default settings of each product.
 */
let defaultSettings = {
	element: '.products',
	class: '',
	itemClass: '',
	width: '200px',
	height: '250px',
	attributes: ['name', 'price', 'deliveryTime', 'image'],
	url: 'products.php',
	initStaticData: {},
};

let Container;

/**
 * The Products Object, handles the products.
 */
class Products 
{
	/**
	 * Initalize the Container and the paginator
	 */
	constructor(container, paginator) 
	{
		this.setup(defaultSettings);

		Container = container;
		this.paginator = paginator;
	}

	setup(settings)
	{
		if (typeof settings != 'object') {
			throw new InvalidArgumentException;
		}

		this.settings = Common.extend(defaultSettings, settings);

		this.setElement(this.settings.element);

		this.addStyleTag();	
	
		if (typeof Container == 'undefined') {
			return;
		}

		if (Container.instanceExist('Pagination')) {
			this.paginator.reset(this.settings.initStaticData);
			let request = this.getProductsByPage(this.paginator.getCurrent());
			
			request.then(function(items) {
				this.replaceItems(items);
			}.bind(this)).catch(function(error) {

			});
		}
	}

	setElement(selector)
	{
		this.wrapper = DOM.element(selector);
		
		DOM.addClass(this.wrapper, this.settings.class);
	}

	/**
	 * Replace items in the container.
	 */
	replaceItems(items) 
	{
		if (! Array.isArray(items) || typeof items[0] == 'string') {
			throw new InvalidArgumentException;
		}

		let wrappedItems = this.wrapAllWithHTML(items, this.settings.itemClass, 'div');

		this.wrapper.innerHTML = wrappedItems;

		return items;
	}

	/**
	 * Makes an Ajax call to the server.
	 */
	getProductsByPage(pageNumber) 
	{
		return new Promise(function(resolve, reject) {
			if (this.paginator.notInPageRange(pageNumber)) {
				return reject('Not in pagination range');
			}

			let xhr = new XMLHttpRequest || new ActiveXObject("Microsoft.XMLHTTP");

			xhr.open('GET', this.settings.url + '?page=' + pageNumber, true); 
			xhr.setRequestHeader('Content-Type', 'application/json');
			
			let instance = this;

			xhr.onreadystatechange = function() {console.log(this.status);
				if (this.readyState == 4) {
					if (this.status == 200) {
						instance.currentItems = JSON.parse(this.responseText);
					
						for (var i = 0; i < instance.currentItems.length; i++) {
							var product = instance.currentItems[i];
							instance.AfterLoaded.call(this, product);
						}

						resolve(instance.currentItems);
					} else {
						reject(this.statusText);
					}
				}
			};

			xhr.onerror = function(error) {
				reject(error);
			};

			xhr.send(null);
		}.bind(this));
	}

	/**
	 * Wrap all the items with specifc tag and classname.
	 */
	wrapAllWithHTML(items, className, tagType) 
	{
		className = className || null;
		className = (className) ? 'product ' + className : 'product';
		
		var wrappedItems = '';

		items = items.map(function(product, index) {
			var item = document.createElement(tagType);
			item = DOM.addClass(item, className);

			var overlay = document.createElement('div');
			overlay.className = 'product-overlay';
			item.appendChild(overlay);

			for(var prop in product) {
				if(this.settings.attributes.indexOf(prop) == -1) {
					continue;
				}

				var tag = document.createElement(tagType);

				if(prop == 'image') {
					var image = document.createElement('img');
					image.setAttribute('src', product[prop]);
					item.appendChild(image);
				} else {
					tag.innerHTML = product[prop] || '';
				}

				tag.className = 'product-' + Common.kebabCase(prop);
				overlay.appendChild(tag);
			}

			var temp = document.createElement(tagType);
			temp.appendChild(item);
			
			wrappedItems += temp.innerHTML + "\n";

			return product;
		}.bind(this));

		return wrappedItems;
	}

	AfterLoaded(products) 
	{
		//
	}

	/**
	 * Add the eCommerce style tags to the DOM.
	 */
	addStyleTag() 
	{
		let css = `
			.product {
				position: relative;
				margin: 5px 5px;
				border: 1px solid #e4e4e4;
				width: ${this.settings.width};
				height: ${this.settings.height};
				cursor: pointer;
				color: #ffffff;
				overflow: hidden;
			}

			.product > .product-overlay {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				opacity: 0.5;
				z-index: 5;
				transition: 1s all;
				transform: translateX(-250px);
			}

			.product:hover > .product-overlay {
				background: rgba(0, 0, 0, 0.45);
				transform: translateX(0px);
				opacity: 1;
				transition: 1s all;
			}

			.product > img {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
			}

			.product > .product-image {
				z-index: 0;
				position: absolute;
				top: 0;
				left: 0;
			}

			.product > .product-overlay > .product-name, 
			.product > .product-overlay > .product-price,
			.product > .product-overlay > .product-delivery-time {
				z-index: 1;
				position: relative;
				text-align: center;
				margin-top: 25px;
			}
		`;
	    
	    return DOM.addStyle('eCommerce-Products', css);
	}
}

export default Products;