(function(){
	Lib.update(Page.getUpdateObject());
	
	if(Page.attachUpdateEvents)
		Page.attachUpdateEvents(function(){Lib.update(Page.getUpdateObject())});
		
	if(Page.insertObjects)
	{
		if(Page.insertObjects.script)
			Page.insertObjects.script.map(Lib.insertScript);
			
	}
})();
