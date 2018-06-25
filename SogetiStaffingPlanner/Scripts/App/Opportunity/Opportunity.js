new Vue({
    el: '#opportunity',
    data: {
        opportunities: '',
        opportunityName: '',
        opportunityNotes: '',
        clientContact: '',
        clientId: null,
        addState: false,
    },
    methods: {
        onSubmit: function () {
            let data = {};
            data.opportunityName = this.opportunityName;
            data.opportunityNotes = this.opportunityNotes;
            data.clientContact = this.clientContact;
            data.clientId = this.clientId;
            console.log(data);
            $.ajax({
                type: "POST",
                url: "AddOpportunity",
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    //Receives message from backend for you to do what you want with it
                    console.log('POST request success');
                    
                    this.addState = true;
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