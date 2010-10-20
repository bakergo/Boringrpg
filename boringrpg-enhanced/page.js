(function(){
	Lib.update(Page.getUpdateObject());
	
	if(Page.attachUpdateEvents)
		Page.attachUpdateEvents(function(){Lib.update(Page.getUpdateObject())});
})();
