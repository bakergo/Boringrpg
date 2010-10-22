(function(){
	Lib.update(Page.getUpdateObject());
	
	if(Page.attachUpdateEvents)
		Page.attachUpdateEvents(function(){Lib.update(Page.getUpdateObject())});
		
	if(Page.injectObjects)
	{
		if(Page.injectObjects.script)
			for(script in Page.injectObjects.script)
				Lib.insertScript(Page.injectObjects.script[script]);
	}
})();
