var tnkfl = (function (tnkfl) {

    var createShoppinglistItem = function (itemElement) {
        var item = {
            toggleActiveState: function () {
                this.activated = !this.activated;
            }
        };

        Object.defineProperties(item, {
            el: {
                value: itemElement
            },
            enabled: {
                get: function() {
                    return !this.el.classList.contains("disabled");
                },
                set: function (value) {
                    if(value){
                        this.el.classList.remove("disabled");
                    } else {
                        this.el.classList.add("disabled");
                    }
                }
            },
            activated: {
                get: function() {
                    return this.el.classList.contains("active");
                },
                set: function (value) {
                    if(value){
                        this.el.classList.add("active");
                    } else {
                        this.el.classList.remove("active");
                    }
                }
            }
        });

        return item;
    };

    var createShoppinglistItems = function (itemElements) {
        var items = [];

         [].forEach.call(itemElements, function (el, index, array){
            var item = createShoppinglistItem(el);

             items.push(item);
         });

        return items;
    };

    tnkfl.createShoppingList = function (elementID) {
        var element = document.getElementById(elementID);

        if(!element) {
            element = document.createElement("DIV");
            element.id = elementID;
            element.className = 'shoppinglist';
        }

        var items = element.querySelectorAll(".shoppinglist-item");

        var shoppinglist = {
            add: function (options) {
                var span = document.createElement("SPAN");
                span.className = "shoppinglist-item";
                // added this to get text into span.
                span.innerHTML = options;
                this.el.appendChild(span);

                var item = createShoppinglistItem(span);

                this.items.push(item);
            },
            remove: function (index) {
                var len = this.items.length;

                if(index > len || index < 0) {
                    throw new Error("Index is out of range");
                }

                var item = this.items[index];
                this.items.splice(index, 1);

                this.el.removeChild(item.el);
                // garbage collection
                item = null;
            },
            appendTo: function (parentElement) {
                parentElement.appendChild(this.el);
            }
        };

        Object.defineProperties(shoppinglist, {
            el: {
                value: element
            },
            items: {
                value: createShoppinglistItems(items),
                enumerable : true
            }
        });

        return shoppinglist;

    };

    return tnkfl;
}( tnkfl || {}));



