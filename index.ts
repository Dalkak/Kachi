import { Block, Pack, Dict } from "dalkak";

export default new Pack(
    new Dict,
    "kachi",
    {
        link: new Block(
            new Dict,
            "link",
            "변수(val)을(url)에 연결해 서버 만들기",
            (param, info) => {
                var Entry = (info as {data}).data.Entry;
                if(!Entry.variableContainer.getVariableByName(param.val)){
                    Entry.variableContainer.appendVariables([{name: param.val}]);
                }
                Entry.variableContainer.getVariableByName(param.val).setValue(new WebSocket(param.url));
            }
        ),
        send: new Block(
            new Dict,
            "send",
            "서버(server)에(data)보내기",
            (param, info) => {
                var Entry = (info as {data}).data.Entry;
                Entry.variableContainer.getVariableByName(param.server).send(param.data);
            }
        ),
        ready: new Block(
            new Dict,
            "ready",
            "서버(server)과 신호(msg), 변수(val) 연결하기",
            (param, info) => {
                var Entry = (info as {data}).data.Entry;
                if(!Entry.variableContainer.messages_.find(x=>x.name == param.msg)){
                    Entry.variableContainer.appendMessages([{name: param.msg}]);
                }
                if(!Entry.variableContainer.getVariableByName(param.val)){
                    Entry.variableContainer.appendVariables([{name: param.val}]);
                }
                var entMsg = Entry.variableContainer.messages_.find(x=>x.name == param.msg);
                Entry.variableContainer.getVariableByName(param.server).onmessage(event => {
                    Entry.variableContainer.getVariableByName(param.val).setValue(event.data);
                    Entry.engine.raiseMessage(entMsg.id);
                });
            }
        )
    }
);