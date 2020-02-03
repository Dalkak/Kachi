import {
    Block,
    Pack,
    Dict
} from "dalkak";

export default new Pack({
    name: "kachi", 
    blocks: {
        link: new Block({
            name: "link",
            template: "(서버 (url)와 연결하기)",
            func: (param) => {
                return new WebSocket(param.url);
            }
        }),
        send: new Block({
            name: "send",
            template: "서버 (server)에 (data) 보내기",
            func: (param) => {
                var ws = param.server as WebSocket;
                if (ws.readyState == 0) {
                    ws.onopen = () => {
                        ws.send(JSON.stringify(param.data));
                    }
                } else {
                    ws.send(JSON.stringify(param.data));
                }
            }
        }),
        ready: new Block({
            name: "ready",
            template: "서버(server)와 신호(msg), 변수(val) 연결하기",
            func: (param, project, platform) => {
                var {
                    server = new WebSocket(""), 
                    msg = "", 
                    val = "",
                } = {...param};
                var Entry = (platform as any).Entry;
                if (!Entry.variableContainer.messages_.find(x => x.name == msg)) {
                    Entry.variableContainer.appendMessages([{
                        name: msg
                    }]);
                }
                var entMsg = Entry.variableContainer.messages_.find(x => x.name == msg);
                server.onmessage = event => {
                    project.variables.value[val].value = event.data;
                    Entry.engine.raiseMessage(entMsg.id);
                };
            }
        })
    }
});