(function( global ) {
	var BaseModel = global.BaseModel ;
/**
 * [基础Collection]
 * 
 */
	var ListCollection = Backbone.Collection.extend({
		model: BaseModel ,
		initialize : function( data , options ){
			var that = this ;
			if( options ){
				this.name = options.name ;
			}

			if( !data ){
				var data = localStorage.getItem( this.name );

				try{
					data = JSON.parse( data );

					data.forEach( function( item ){
						that.add( item );
					});
				}catch(e){

				}
			}
		} ,
		save : function(){
			localStorage.setItem( this.name , JSON.stringify(this.toJSON() ) );
		}
	});


    global.ListCollection = ListCollection ;

})( window );

