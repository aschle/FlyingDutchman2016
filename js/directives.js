/**
 * directives.js
 * 
 * Drag and Drop is in here.
 * 
 * Reference:
 * https://blog.parkji.co.uk/2013/08/11/native-drag-and-drop-in-angularjs.html
 * 
 */

 angular.module('barApp')
    .directive('draggable', function() {
        return function(scope, element) {

            // native JS object
            var el = element[0];

            // TODO: only be draggable if still in stock
            // TODO: only be draggable if 5 is not reached
            // TODO: only be draggable if credit limit will not be exceeded
            // TODO: also tmp-stock should be kept in mind
            el.draggable = true; 

            // Dragstart-Handler
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

            //Dragend-Listener
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

    .directive('droppable', function() {
        return {
            scope: {},
            link: function(scope, element) {

                // native JS object
                var el = element[0];

                // Dragover-Listener
                el.addEventListener(
                    'dragover',
                    function(e) {
                        e.dataTransfer.dropEffect = 'move';
                        // allows us to drop
                        if (e.preventDefault) e.preventDefault();
                        this.classList.add('dnd-over');
                        return false;
                    },
                    false
                );

                // Dragenter-Listener
                el.addEventListener(
                    'dragenter',
                    function(e) {
                        this.classList.add('dnd-over');
                        return false;
                    },
                    false
                );

                // Dragleave-Listener
                el.addEventListener(
                    'dragleave',
                    function(e) {
                        this.classList.remove('dnd-over');
                        return false;
                    },
                    false
                );

                // Drop-Listener
                el.addEventListener(
                    'drop',
                    function(e) {
                        // Stops some browsers from redirecting.
                        if (e.stopPropagation) e.stopPropagation();

                        this.classList.remove('dnd-over');

                        var item = document.getElementById(e.dataTransfer.getData('text'));
                        this.appendChild(item);

                        return false;
                    },
                    false
                );
            }
        }
    })