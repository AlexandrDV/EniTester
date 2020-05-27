
	    var testResult={},testMaxResult={}
	    var getResult=function()
	    {
	        var r=""
	        var testCount=0,testCount2=0
	        for(var vv in testResult)
	        {
	            var taskCount=0,taskCount2=0
    	        for(var v in testResult[vv])
    	        {
    	            r+="\t\t"+v+" Element result="+testResult[vv][v]+"/"+testMaxResult[vv][v]+ "\n"
    	            taskCount+=Number(testResult[vv][v])||0
    	            taskCount2+=Number(testMaxResult[vv][v])||0
    	        }
    	        r+="\t"+vv+" Task result="+taskCount+"/"+taskCount2+ "\n"
    	        testCount+=taskCount
    	        testCount2+=taskCount2
	        }
    	    r+="Test result="+testCount+"/"+testCount2
	        return r
	    }
	    var setTestMode=function(mode)
	    {
	        testBuildDiv.style["background"]=mode=="build"?"blue":"none"
	        testMakeDiv.style["background"]=mode=="make"?"blue":"none"
	        testResultDiv.style["background"]=mode=="result"?"blue":"none"
	        switch(mode)
	        {
	            case "build":
	                break
	            case "make":
	                break
	            case "result":
	                testResultGenerated.innerHTML=getResult()
	                break
	        }
	    }
	    endTestButton.onclick=function()
	    {
	        setTestMode("result")
	    }
	    var curTask=0
	    taskNumberField.oninput=function()
	    {
	        openTask(taskNumberField.value)
	    }
	    var openTask=function(taskNum)
	    {
	        taskNum=Number(taskNum)
	        if(curTask>=0&&curTask<taskBlocks.length)
	            if(taskBlocks[curTask])
	                taskBlocks[curTask].style.display="none"
	        curTask=taskNum>=0?(taskNum<taskBlocks.length?taskNum:taskBlocks.length-1):0
	        if(curTask>=0&&curTask<taskBlocks.length)
	            if(taskBlocks[curTask])
	                taskBlocks[curTask].style.display=""
	       taskNumberField.value=curTask
	       previousTaskButton.style.display=curTask>0?"":"none"
	       nextTaskButton.style.display=curTask<taskBlocks.length-1?"":"none"
	    }
	    previousTaskButton.onclick=function()
	    {
	        openTask(curTask-1)
	    }
	    nextTaskButton.onclick=function()
	    {
	        openTask(curTask+1)
	    }
	    var taskBlocks=[]
	    testCodeArea.value=test
	    testCodeArea.oninput=function()
	    {
	        testResult=[]
	        testMaxResult=[]
	            
	        testMakeGenerated.innerHTML=""
	        testResultGenerated.innerHTML=""
	            
	        test=testCodeArea.value
	        curTask=0
	        taskBlocks=[]
	        for(var vvvvv in test.split("-----"))
	        {
	            testResult[vvvvv]={}
	            testMaxResult[vvvvv]={}
	            
	            taskBlocks[vvvvv]=document.createElement("div")
	            taskBlocks[vvvvv].style.display="none"
	            testMakeGenerated.appendChild(taskBlocks[vvvvv])
	            for(var vv in test.split("-----")[vvvvv].split("\n"))
	            {
	                var f=function()
	                {
	                    var taskResult=testResult[vvvvv]
	                    var taskMaxResult=testMaxResult[vvvvv]
	            
	                    var v=test.split("-----")[vvvvv].split("\n")[vv]
	                    if(!v)
	                        return
	                    var args=v.split(/\s+/)
	                    console.log(args)
	                    switch(args[0])
	                    {
	                        case "any":
        	                    var el=document.createElement(args[1].split(/[.]/)[0])
        	                    el.type=args[1].split(/[.]/)[1]
        	                    el.innerText=el.value=args[2]
        	                    taskMaxResult[args[5]]=args[6]
        	                    var resUpd=function(){taskResult[args[5]]=el.value==args[3]?args[6]:(args[7]||0);}
        	                    el.oninput=function(){resUpd();if(el.value==args[3]&&args[4]!="null")alert(args[4])}
        	                    resUpd()
        	                    taskBlocks[vvvvv].appendChild(el)
	                            console.log(el)
        	                    break
            	            case "html":
            	                var el=document.createElement("div")
            	                el.innerHTML=v.substr(args[0].length+1)
            	                taskBlocks[vvvvv].appendChild(el)
            	                break
    	                    case "radio":
    	                    case "checkbox":
            	                var el=document.createElement("input")
            	                el.type=args[0]
            	                el.checked=args[1]&&args[1]!=0?"checked":""
            	                taskMaxResult[args[4]]=args[5]
            	                var resUpd=function(){taskResult[args[4]]=el.checked==args[2]?args[5]:(args[6]||0);}
            	                el.onchange=function(){resUpd();if(el.checked==args[2]&&args[3]!="null")alert(args[3]);new Function(v.replace(args[0],"").replace(args[1],"").replace(args[2],"").replace(args[3],""))()}
            	                resUpd()
            	                taskBlocks[vvvvv].appendChild(el)
            	                break
    	                    case "enter":
            	                var el=document.createElement("input")
            	                el.type=args[1]
            	                el.value=args[2]
            	                taskMaxResult[args[5]]=args[6]
            	                var resUpd=function(){taskResult[args[5]]=el.value==args[3]?args[6]:(args[7]||0);}
            	                el.onchange=function(){resUpd();if(el.value==args[3]&&args[4]!="null")alert(args[4]);new Function(v.replace(args[1],"").replace(args[2],"").replace(args[3],"").replace(args[4],""))()}
            	                resUpd()
            	                taskBlocks[vvvvv].appendChild(el)
            	                break
    	                    case "button":
                	            var el=document.createElement("button")
                	            el.innerText=args[1]
                	            el.onclick=new Function(v.replace(args[0],"").replace(args[1],""))
                	            taskBlocks[vvvvv].appendChild(el)
                	            break
        	                case "label":
                	            var el=document.createElement("label")
                	            el.innerText=v.substr(args[0].length+1)
                	            taskBlocks[vvvvv].appendChild(el)
                	            break
        	                case "text":
                	            var el=document.createElement("div")
                	            el.innerText=v.substr(args[0].length+1)
                	            taskBlocks[vvvvv].appendChild(el)
                	            break
        	                case "newline":
                	            taskBlocks[vvvvv].appendChild(document.createElement("br"))
                	            break
	                    }
	                }
	                f()
	            }
	        }
	        openTask(0)
	    }
	    testCodeArea.oninput()
