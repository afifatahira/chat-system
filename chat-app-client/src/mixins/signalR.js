import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";

export default ({

    data() {
        return {
            connection: null,
            connectionUrl: "https://localhost:44391/chatsocket"
        };
    },

    mounted() {
        const vm = this;

        vm.connection = new HubConnectionBuilder()
            .withUrl(vm.connectionUrl + `?userId=${vm.userId}`, {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
            })
            .build();

        vm.connection.start();

        vm.connection.on("ReceiveOne", function (data) {
            vm.$emit("MessageReceived", data);
        });
    },

    unmounted() {
        const vm = this;
        vm.connection.close();
    }
})