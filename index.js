( function( global ){

	var HistoryListView = global.HistoryListView ,
		ListView = global.ListView ,
		ListCollection = global.ListCollection ;



	var taskHistoryCollection = new ListCollection( null , {
			name : 'taskHistory'
		}) ,
		rewardsHistoryCollection = new ListCollection( null , {
			name : 'rewardsHistory'
		}) ;


	var baseData = (function(){
		return new ListCollection( null , {
					name : 'taskName'
				});
		})() ,
		rewardsData = new ListCollection([{
			title : '获得一块饼干'
		},{
			title : '允许玩一局游戏'
		},{
			title : '睡觉一小时'
		},{
			title : '获得两片感冒药'
		},{
			title : '在游泳池边休息半小时'
		},{
			title : '获得一些薯片'
		},{
			title : '得到30Q币'
		},{
			title : '得到一些奇妙的网址'
		}]);

		
	baseData.on('remove' , function( changes ){
		var num = Math.floor( Math.random() * rewardsData.length ) ,
			model = rewardsData.at(num) ;
			alert( '恭喜！' + model.get('title') );

		taskHistoryCollection.add(changes.toJSON());
		rewardsHistoryCollection.add( model.toJSON() );
		taskHistoryCollection.save();
		rewardsHistoryCollection.save();
		baseData.save();
	});

	var taskList = new ListView({
		el : '#remind_list' ,
		collection : baseData
	}) ,
	historyList = new HistoryListView({
		el : '#task_history_list' ,
		collection : taskHistoryCollection
	}) ,
	rewardsList = new HistoryListView({
		el : '#rewards_list' ,
		collection : rewardsHistoryCollection
	});


	var AppView = Backbone.View.extend({
		el : 'body',
		events: {
		    'click .action_show' : 'open' ,
		    'click #add_aim' : 'addTask' ,
		    'click .close_win' : 'hide'
		},
		open: function( e ){ 
			var target = e.target ,
				typeMap = {
					'tasks' :function(){
						historyList.show();
						rewardsList.hide();
						return '任务记录' ;
					},
					'rewards' : function(){
						historyList.hide();
						rewardsList.show();
						return '奖励记录' ;
					} 
				} ,
				type = target.getAttribute('data-type');
			$('#c_records').removeClass('c-hide');
			$('#win_title').html( typeMap[type]() );

		} ,
		hide : function(){
			$('#c_records').addClass('c-hide');
		} ,
		addTask: function() {
			var values = $('#new_task').val() ;
			if(!values || ( $.trim( values ) === '' ) ){
				alert('输入不能为空');
				return ;
				}
			baseData.add({
				title : $('#new_task').val()
			});
			baseData.save();
			$('#new_task').val('');

		}
	});



	function main(){
		new AppView({ el : 'body' } );
	}

	main();

})( window );