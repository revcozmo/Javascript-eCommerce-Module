
import ComponentsException from './ComponentsException.js';
import BadEventCallException from './BadEventCallException.js';
import InvalidArgumentException from './InvalidArgumentException.js';
import InvalidBindingException from './InvalidBindingException.js';
import ComponentNotRegisteredException from './ComponentNotRegisteredException.js';
import NodeElementDoesNotExistException from './NodeElementDoesNotExistException.js';


class ExceptionHandler
{
	/**
	 * Handle all the errors
	 */
	static initalize() {	
		window.onerror = function(message, source, lineno, colno, error) {

			if (error instanceof InvalidArgumentException) {
				// handle
			} else if (error instanceof InvalidBindingException) {
				// handle
			} else if (error instanceof BadEventCallException) {
				// handle
			} else if (error instanceof ComponentsException) {
				// handle
			} else if (error instanceof ComponentNotRegisteredException) {
				// handle
			} else if (error instanceof NodeElementDoesNotExistException) {
				
			} else {
				return false;
			}

			return true;
		};
	}
}

export default ExceptionHandler;