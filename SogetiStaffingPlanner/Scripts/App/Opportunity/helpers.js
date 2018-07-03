let helpers = {
    buildJSON: function(that) {
        let data = {};
        data.id = that.opportunityId;
        data.opportunityName = that.opportunityName;
        data.opportunityNotes = that.opportunityNotes;
        data.clientContact = that.clientContact;
        data.clientId = that.clientId;
        data.accountExecutiveUserId = that.accountExecutiveUserId;
        data.unitId = that.unitId;
        data.regionId = that.regionId;
        data.soldStatusId = that.soldStatusId;
        data.opportunityOwnerUserId = that.opportunityOwnerUserId;
        data.active = that.active;
        return data;
    },
    clearForm: function (that) {
        that.opportunityId = null;
        that.addState = false;
        that.updateState = false;
        that.opportunityName = null;
        that.opportunityNotes = null;
        that.clientContact = null;
        that.clientID = null;
        that.accountExecutiveUserId = null;
        that.unitId = null;
        that.regionId = null;
        that.soldStatusId = null;
        that.opportunityOwnerUserId = null;
        that.clientId = null;
        that.active = false;
        that.errors = [];
    },
    displayDate: function (date) {
        let returnDate = date;
        returnDate = parseInt(returnDate.slice(6));
        returnDate = new Date(returnDate);
        returnDate = returnDate.toISOString().slice(0, 10);
        return returnDate;
    }
}