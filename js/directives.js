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

    /**
    * Directive for internationalisation.
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

                scope.$on('onLanguageChange', function() {
                    changeString();
                });
            }
        }
    }])


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
            scope: {
                // parent
                drop: '&'
            },
            link: function(scope, element, attrs) {

                // native JS object
                var el = element[0];

                // Dragover-Listener
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

                        var data = e.dataTransfer.getData("text");

                        // prevent from dragging into an dragged beer
                        if (data.startsWith("src_copy") == true &&
                            e.target.id == "dest_copy") {
                            
                            // make a copy of the dragged element
                            //var node = $('#' + data).clone()

                            // remove css classes
                            this.classList.remove('dnd-over');
                            //node.removeClass("dnd-drag");

                            // prevent from making things draggable again
                            //node.attr("draggable", "false");

                            // add trash icon
                            //node.find("p").append("<i class='fa fa-fw fa-trash pull-right'></i>")

                            // nur wenn man es nicht darf nix mehr reindraggen
                            // attrs.$set('draggable', "false");
                            
                            // add element to cart
                            //$(e.target).append(node);

                            // find out beerID
                            var id = $('#' + data).data("beerid");

                            // call the drop passed function in the controller
                            scope.drop({beerID: id});

                        } else {
                            this.classList.remove('dnd-over');
                        }

                        return false;
                    },
                    false
                );
            }
        }
    })