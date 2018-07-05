new Vue({
    el: '#createClient',
    data: {
        clients: [],
        formData: {
            clientName: '',
            clientSubbusiness: '',
        },
        states: {
            addState: false,
            updateState: false,
        },
        errors: {
            clientName: null,
            clientSubbusiness: null
        }
    },
    computed: {
        computeClientName() {
            return this.formData.clientName;
        },
        computeClientSubbusiness() {
            return this.formData.clientSubbusiness;
        }
    },
    watch: {
        computeClientName: function (val) {
            try {
                if (val || val.length) { this.errors.clientName = ''; }
                else { this.errors.clientName = 'Client name required'; }
            } catch (e) { }


            if (!this.states.updateState) {
                for (let i = 0; i < this.clients.length; i++) {
                    if (val == this.clients[i].ClientName) {
                        this.errors.clientName = '"' + this.clients[i].ClientName + '" already exists.';
                        break;
                    }
                }
            }
        },
        computeClientSubbusiness: function (val) {
            try {
                if (val || val.length) { this.errors.clientSubbusiness = ''; }
                else { this.errors.clientSubbusiness = 'Client Subbusiness required'; }
            } catch (e) { }

        }
    },
    methods: {
        onSubmit: function () {
            $.ajax({
                type: "POST",
                url: "AddClient",
                dataType: "json",
                data: JSON.stringify(this.formData),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    //Receives message from backend for you to do what you want with it
                    console.log('POST request success');
                    alert('Client Name: "' + this.formData.clientName + '" and Client Subbusiness: "' + this.formData.clientSubbusiness + '" successfully added.');
                    this.formData = [];
                    this.states.addState = false;
                    $.ajax({
                        async: false,
                        cache: false,
                        type: "GET",
                        url: "GetClients",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            this.clients = data;
                        }.bind(this)
                    });
                }.bind(this),
                error: function (e) {
                    console.log(e, "Error adding data! Please try again.");
                }
            });
        },
        onEdit: function (client) {
            this.errors = {};
            console.log(client);
            this.states.addState = true;
            this.states.updateState = true;
            this.formData.clientName = client.ClientName;
            this.formData.clientSubbusiness = client.ClientSubbusiness;
            window.scrollTo(0, 100);
        },
        cancel: function () {
            this.states.addState = false;
            this.states.updateState = false;
            this.errors = {};
            this.formData = [];
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