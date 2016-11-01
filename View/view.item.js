(function( global ){

	/**
	 * [initialize description]
	 * 
	 */ 
	var ListItem = Backbone.View.extend({
		tagName : 'LI' ,
		events: {
			/**
			 * 监听点击事件.触发完成
			 */
		    "click .task_done" : "done"
		},
		/**
		 * 默认使用的模板
		 * @type {[type]}
		 */
		template: _.template($('#unit_tpl').html()) ,
		initialize: function( options ) {
	        /**
	         * 如果从外部可以传入模板，则使用外部模板，这样让视图更加灵活
	         */
	        if( options.tpl ){
	        	this.template =  _.template( options.tpl )  ;
	        }

	        /**
	         * 监听模型被摧毁事件，
	         * 重新渲染自身
	         */
	        this.listenTo(this.model, 'destroy', this.remove);

		},
		render: function() {
	        this.$el.html(this.template(this.model.toJSON()));
	        return this;
		} ,
		done : function(){
			/**
			 * 点击完成，摧毁数据
			 */
			this.model.destroy();
		}
	});

	global.ListItem = ListItem ;
})( window );