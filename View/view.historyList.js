(function( global ){

	var ListView = global.ListView ,
		ListItem = global.ListItem ;

	var HistoryListView = ListView.extend({
		addOne: function( task ){
			this.el.append(new ListItem({ model: task , tpl : $('#history_tpl').html() }).render().el) ;
		}
	});

	global.HistoryListView = HistoryListView ;
})( window );