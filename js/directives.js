/**
 * directives.js
 * 
 * This is the place for our own angular directive. Directives are makers on a * DOM element. The angular compiler attaches specific behavior to those DOM
 * elements. Those elements and its children can be manipulated or event
 * listener attached.
 *
 * This file includes:
 * - Internationalisation
 * - DragNDrop 
 * 
 * 
 * References:
 * https://blog.parkji.co.uk/2013/08/11/native-drag-and-drop-in-angularjs.html
 * 
 */

 angular.module('barApp')

    /**
    * Internationalisation
    *
    * This directive is responsible for replacing the language key with the
    * corresponding language string. The attribute 'i18n' (key) is handed over
    * to the internationalisation service (i18nService), which returns the
    * translated string. The i18nService knows about the current language
    * setting.
    *
    * The function changeString() only manipulates the DOM element. This
    * function is also triggered when the user changes the language
    * ('onLanguageChange')
    */
    .directive('i18n', ['I18nService', function(i18nService) {
        return {
            link: function(scope, element, attrs) {

                function changeString() {
                    // get key from attribute
                    var key = attrs.i18n;
                    // use service for translation
                    var translation = i18nService.translate(key);
                    // put translation into html tag
                    element.html(translation);
                }

                changeString();

                // event listener - change language when user selects another
                scope.$on('onLanguageChange', function() {
                    changeString();
                });
            }
        }
    }])


    /**
    * Drag and Drop - Draggable element
    *
    * This directive is implementing the eventlistener which are nessesary for
    * dragging, this inludes 'dragstart' and 'dragend'.
    */
    .directive('draggable', function() {
        return function(scope, element) {

            // native JS object
            var el = element[0];

            // set the attribute draggable to true
            el.draggable = true; 

            // ******
            // Dragstart handler
            // ******
            /*
            * Set the ID of the dragged element and attaches a css class for
            * styling the dragged element.
            */
            el.addEventListener(
                'dragstart',
                function(e) {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text', this.id);
                    this.classList.add('dnd-drag');
                    return false;
                },
                false
            );

            // ******
            // Dragend-Listener
            // ******
            /*
            * Removes the css class again, when dragging is finished.
            */
            el.addEventListener(
                'dragend',
                function(e) {
                    this.classList.remove('dnd-drag');
                    return false;
                },
                false
            );
        }   
    })

    /**
    * Drag and Drop - Droppable element
    *
    * This directive is implementing the eventlistener which are nessesary for
    * the dropping area, this inludes 'dragover', 'dragenter', 'dragleave' and
    * most important 'drop'.
    */
    .directive('droppable', function() {
        return {
            scope: {
                // parent
                drop: '&'
            },

            link: function(scope, element, attrs) {

                // native JS object
                var el = element[0];

                // ******
                // Dragover-Listener
                // ******
                /*
                * Changes the styling of the droppable area, if a draggable
                * element is over it.
                */
                el.addEventListener(
                    'dragover',
                    function(e) {

                        e.dataTransfer.dropEffect = 'move';
                        if (e.preventDefault) e.preventDefault();
                        this.classList.add('dnd-over');
                        return false;
                    },
                    false
                );

                // ******
                // Dragenter-Listener
                // ******
                /*
                * Changes the styling of the droppable area, if a draggable
                * element is entering the area.
                */
                el.addEventListener(
                    'dragenter',
                    function(e) {

                        this.classList.add('dnd-over');
                        return false;
                    },
                    false
                );

                // ******
                // Dragleave-Listener
                // ******
                /*
                * Changes the styling of the droppable area, if a draggable
                * element is leaves the area.
                */
                el.addEventListener(
                    'dragleave',
                    function(e) {

                        this.classList.remove('dnd-over');
                        return false;
                    },
                    false
                );

                // ******
                // Drop-Listener
                // ******
                /*
                * The drop listener calls the drop function, which is specified
                * as an attribute called drop="addAction('add',beerID)". This
                * calles the function 'addAction' of the AllBeersController.
                * So this event listener is not manipulating the DOM, it
                * delegates the work to the controller. 
                */
                el.addEventListener(
                    'drop',
                    function(e) {

                        // stops some browsers from redirecting
                        if (e.stopPropagation) e.stopPropagation();

                        // remember the source and destination
                        var data = e.dataTransfer.getData("text");

                        // prevent from dragging into a already dragged beer
                        if (data.startsWith("src_copy") == true &&
                            e.target.id == "dest_copy") {

                            // remove css classes
                            this.classList.remove('dnd-over');

                            // find out the beer id
                            var id = $('#' + data).data("beerid");

                            // call the drop passed function in the controller
                            scope.drop( { beerID: id } );

                        } else {
                            // abort dropping
                            this.classList.remove('dnd-over');
                        }

                        return false;
                    },
                    false
                );
            }
        }
    })