new Vue({
    el: '#createClient',
    data: {
        clients: '',
        clientName: '',
        clientSubbusiness: '',
        addState: false,
    },
    methods: {
        onSubmit: function () {
            let data = {};
            data.clientName = this.clientName;
            data.clientSubbusiness = this.clientSubbusiness;
            console.log(data);
            $.ajax({
                type: "POST",
                url: "AddClient",
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    //Receives message from backend for you to do what you want with it
                    console.log('POST request success');
                    alert('Client Name: "' + this.clientName + '" and Client Subbusiness: "' + this.clientSubbusiness + '" successfully added.');
                    this.clientName = '';
                    this.clientSubbusiness = '';
                    this.clients.push(data);
                }.bind(this),
                error: function (e) {
                    console.log(e, "Error adding data! Please try again.");
                }
            });
        }
    },
    created: function () {
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "GetClients",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(this.clients);
                this.clients = data;
            }.bind(this)
        });
    }
});