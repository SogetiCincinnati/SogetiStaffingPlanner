new Vue({
    el: '#opportunity',
    data: {
        opportunities: '',
        opportunityName: '',
        opportunityNotes: '',
        clientContact: '',
        clientID: null,
        addState: false,
        accountExecutiveUserId: null,
        unitId: null,
        regionId: null,
        soldStatusId: null,
        opportunityOwnerUserId: null
    },
    methods: {
        onSubmit: function () {
            let data = {};
            data.opportunityName = this.opportunityName;
            data.opportunityNotes = this.opportunityNotes;
            data.clientContact = this.clientContact;
            data.clientID = this.clientID;
            data.accountExecutiveUserId = this.accountExecutiveUserId;
            data.unitId = this.unitId;
            data.regionId = this.regionId;
            data.soldStatusId = this.soldStatusId;
            data.opportunityOwnerUserId = this.opportunityOwnerUserId;
            console.log(data);
            $.ajax({
                type: "POST",
                url: "AddOpportunity",
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    alert("Added " + this.opportunityName + "!");
                    console.log('POST request success');
                    console.log('data', data);
                    this.opportunities.push(data);
                    console.log(this.opportunities);
                    this.addState = false;
                    this.opportunityName = '';
                    this.opportunityNotes = '';
                    this.clientContact = '';
                    this.accountExecutiveUserId = null;
                    this.unitId = null;
                    this.regionId = null;
                    this.soldStatusId = null;
                    this.opportunityOwnerUserId = null;
                }.bind(this),
                error: function (e) {
                    console.log(e);
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