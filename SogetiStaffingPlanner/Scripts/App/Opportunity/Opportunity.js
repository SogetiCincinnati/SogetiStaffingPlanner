new Vue({
    el: '#opportunity',
    data: {
        opportunities: '',
        addState: false,
    },
    methods: {
        onSubmit: function () {
            data.clientName = this.ClientName;
            data.clientSubbusiness = this.ClientSubbusiness;
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
                    alert('Client Name: "' + this.ClientName + '" and Client Subbusiness: "' + this.ClientSubbusiness + '" successfully added.');
                    this.ClientName = '';
                    this.ClientSubbusiness = '';

                    this.clients.push(refreshData);
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
            url: "GetOpportunities",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                
                this.opportunities = data;
                console.log(this.opportunities);
            }.bind(this)
        });
    }
});