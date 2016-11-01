(function( global ){
		/**
		 * [ItemView description]
		 */
	var ItemView = global.ListItem ;

	var ListView = Backbone.View.extend({
		initialize: function( options ) {
			var that = this ;
			this.el = $(options.el) ;
			this._collection = options.collection ;

			this._collection.on('add' , function( e){
				that.addOne( e );
			});
			this.render();
		},
		/**
		 * 总是添加全部数据
		 * @return {[type]} [description]
		 */
		render: function(){
			this.addAll();
		} ,
		hide : function(){
			this.el.hide();
		} ,
		show : function(){
			this.el.show();
		} ,
		addOne: function( task ){
			this.el.append(new ItemView({ model: task }).render().el) ;
		} ,
		addAll : function(){
        	this._collection.each(this.addOne, this);
		}
	});

	global.ListView = ListView ;
})( window );