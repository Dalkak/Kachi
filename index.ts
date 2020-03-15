import {
    Block,
    Extension,
    Variable,
    Event,
} from "dalkak";
import basic from "@dalkak/basic";

let ws: WebSocket;
export default new Extension({
    name: "kachi", 
    on: {
        stop(){
            ws.close();
        }
    },
    blocks: {
        link: new Block({
            name: "link",
            template: "(서버 (url)와 연결하기)",
            func: ({url}) => {
                ws = new WebSocket(url);
                return ws;
            }
        }),
        send: new Block({
            name: "send",
            template: "서버 (server)에 (data) 보내기",
            func: ({server, data}) => {
                var ws = server as WebSocket;
                if (ws.readyState == 0) {
                    ws.onopen = () => {
                        ws.send(JSON.stringify(data));
                    }
                } else {
                    ws.send(JSON.stringify(data));
                }
            }
        }),
        ready: new Block({
            pack: basic,
            name: "ready",
            template: "서버(server)와 신호(msg: Event), 변수(val: Variable) 연결하기",
            func: ({server, msg, val}: {
                server: WebSocket,
                msg: Event,
                val: Variable,
            }, project, platform) => {
                server.onmessage = event => {
                    val.value = event.data;
                    msg.fire(project, platform);
                };
            }
        })
    }
});