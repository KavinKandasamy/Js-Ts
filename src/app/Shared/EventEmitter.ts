export default class EventEmitter {
  callbacks: any;

  constructor() {
    this.callbacks = {};
    this.callbacks.base = {};
  }
  on(_names: any, callback: any) {
    // Errors
    if (typeof _names === 'undefined' || _names === '') {
      console.warn('wrong names');
      return false;
    }

    if (typeof callback === 'undefined') {
      console.warn('wrong callback');
      return false;
    }

    // Resolve names
    const names = this.resolveNames(_names);

    // Each name
    names.forEach((_name: any) => {
      /*
            const newName = {}
            const parts = name.split('.')

            newName.original  = name
            newName.value     = parts[ 0 ]
            newName.namespace = 'base' // Base namespace
            return newName
        */
      //-- -------------
      // Resolve name
      const name = this.resolveName(_name);

      // Create namespace if not exist
      if (!(this.callbacks[name.namespace] instanceof Object))
        this.callbacks[name.namespace] = {};
      //-- If no namespace - the value is set as 'base' in the resolveName() method

      // Create callback if not exist
      if (!(this.callbacks[name.namespace][name.value] instanceof Array))
        this.callbacks[name.namespace][name.value] = [];
      //-- value is the name that is passed to this method

      // Add callback
      this.callbacks[name.namespace][name.value].push(callback);
    });

    return this;
  }

  off(_names: any) {
    // Errors
    if (typeof _names === 'undefined' || _names === '') {
      console.warn('wrong name');
      return false;
    }

    // Resolve names
    const names = this.resolveNames(_names);

    // Each name
    names.forEach((_name: any) => {
      // Resolve name
      const name = this.resolveName(_name);

      // Remove namespace
      if (name.namespace !== 'base' && name.value === '') {
        delete this.callbacks[name.namespace];
      }

      // Remove specific callback in namespace
      else {
        // Default
        if (name.namespace === 'base') {
          // Try to remove from each namespace
          for (const namespace in this.callbacks) {
            if (
              this.callbacks[namespace] instanceof Object &&
              this.callbacks[namespace][name.value] instanceof Array
            ) {
              delete this.callbacks[namespace][name.value];

              // Remove namespace if empty
              if (Object.keys(this.callbacks[namespace]).length === 0)
                delete this.callbacks[namespace];
            }
          }
        }

        // Specified namespace
        else if (
          this.callbacks[name.namespace] instanceof Object &&
          this.callbacks[name.namespace][name.value] instanceof Array
        ) {
          delete this.callbacks[name.namespace][name.value];

          // Remove namespace if empty
          if (Object.keys(this.callbacks[name.namespace]).length === 0)
            delete this.callbacks[name.namespace];
        }
      }
    });

    return this;
  }

  trigger(_name: string, _args: any) : any {
    // Errors
    if (typeof _name === 'undefined' || _name === '') {
      console.warn('wrong name');
      return false;
    }

    let finalResult: any | undefined;
    let result = null;

    // Default args
    const args = !(_args instanceof Array) ? [] : _args;

    // Resolve names (should on have one event)
    let name = this.resolveNames(_name);

    // Resolve name
    name = this.resolveName(name[0]);

    // Default namespace
    if (name.namespace === 'base') {
      // Try to find callback in each namespace
      for (const namespace in this.callbacks) {
        if (
          this.callbacks[namespace] instanceof Object &&
          this.callbacks[namespace][name.value] instanceof Array
        ) {
          this.callbacks[namespace][name.value].forEach(function (callback: any) {
            result = callback.apply(args);

            if (finalResult === null) {
              finalResult = result;
            }
          });
        }
      }
    }

    // Specified namespace
    else if (this.callbacks[name.namespace] instanceof Object) {
      if (name.value === '') {
        console.warn('wrong name');
        return this;
      }

      this.callbacks[name.namespace][name.value].forEach(function (callback: any) {
        //-- The apply in Javascript is used to call a function in a different object with the given
        //-- this value, and the arguments are passed in the form of an array
        result = callback.apply( args);

        if (typeof finalResult === 'undefined') finalResult = result;
      });
    }

    return finalResult;
  }

  resolveNames(_names: any) {
    let names = _names;
    names = names.replace(/[^a-zA-Z0-9 ,/.]/g, '');
    names = names.replace(/[,/]+/g, ' ');
    names = names.split(' ');

    return names;
  }

  resolveName(name: string) {

    const newName = {
      original: '',
      value: '',
      namespace: '',
    };
    const parts = name.split('.');

    newName.original = name;
    newName.value = parts[0];
    newName.namespace = 'base'; // Base namespace

    // Specified namespace
    if (parts.length > 1 && parts[1] !== '') {
      newName.namespace = parts[1];
    }

    return newName;
  }
}

