var a=require("dalkak"),e=new a.Pack(new a.Dict,"kachi",{link:new a.Block(new a.Dict,"link","변수(val)을(url)에 연결해 서버 만들기",function(a,e){var n=e.data.Entry;n.variableContainer.getVariableByName(a.val)||n.variableContainer.appendVariables([{name:a.val}]),n.variableContainer.getVariableByName(a.val).setValue(new WebSocket(a.url))}),send:new a.Block(new a.Dict,"send","서버(server)에(data)보내기",function(a,e){var n=e.data.Entry.variableContainer.getVariableByName(a.server).getValue();0==n.readyState?n.onopen=function(){n.send(a.data)}:n.send(a.data)}),ready:new a.Block(new a.Dict,"ready","서버(server)과 신호(msg), 변수(val) 연결하기",function(a,e){var n=e.data.Entry;n.variableContainer.messages_.find(function(e){return e.name==a.msg})||n.variableContainer.appendMessages([{name:a.msg}]),n.variableContainer.getVariableByName(a.val)||n.variableContainer.appendVariables([{name:a.val}]);var r=n.variableContainer.messages_.find(function(e){return e.name==a.msg});n.variableContainer.getVariableByName(a.server).getValue().onmessage=function(e){n.variableContainer.getVariableByName(a.val).setValue(e.data),n.engine.raiseMessage(r.id)}})});module.exports=e;
//# sourceMappingURL=kachi.js.map
