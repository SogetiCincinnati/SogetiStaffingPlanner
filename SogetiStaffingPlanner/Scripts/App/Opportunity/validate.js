let validate = {
    checkOpportunityName: function (val, that) {
        try {
            if (val.length || val) { that.errors.opportunityName = ''; }
            else {
                that.errors.opportunityName = 'Opportunity Name required';
            }
            if (!that.updateState) {
                for (let i = 0; i < that.opportunities.length; i++) {
                    if (val == that.opportunities[i].opportunityName) {
                        that.errors.opportunityName = '"' + that.opportunityName + '" already exists.';
                        break;
                    }
                }
            }
        } catch (e) { }
    },
    checkClientId: function (val, that) {
        try {
            if (val || val.length) {
                that.errors.clientId = '';
            } else { that.errors.clientId = 'Client required'; }
        } catch (e) { }
    },
    checkAccountExecutiveUserId: function (val, that) {
        try {
            if (val || val.length) { that.errors.accountExecutiveUserId = ''; }
            else { that.errors.accountExecutiveUserId = 'AE required'; }
        } catch (e) { }
    },
    checkUnitId: function (val, that) {
        try {
            if (val || val.length) { that.errors.unitId = ''; }
            else { that.errors.unitId = 'Unit required'; }
        } catch (e) { }
    },
    checkRegionId: function (val, that) {
        try {
            if (val || val.length) { that.errors.regionId = ''; }
            else { that.errors.regionId = 'Region required'; }
        } catch (e) { }
    },
    displayData: function (item) {
        if (item.length > 15) {
            return item.slice(0, 20) + "...";
        }
        else {
            return item;
        }
    },
    checkForm: function (that) {
        that.errors.opportunityName = null;
        that.errors.clientId = null;
        that.errors.accountExecutiveUserId = null;
        that.errors.unitId = null;
        that.errors.regionId = null;

        /*Checks to see if forms are empty */
        if (!that.opportunityName) {
            that.errors.opportunityName = 'Opportunity Name required.';
        } if (!that.clientId) {
            that.errors.clientId = 'Client required.';
        }if (!that.accountExecutiveUserId) {
            that.errors.accountExecutiveUserId = 'Account Executive required.';
        } if (!that.clientId) {
            that.errors.clientId = 'Client required.';
        } if (!that.regionId) {
            that.errors.regionId = 'Region required.';
        }if (!that.unitId) {
            that.errors.unitId = 'Unit Id required.';
        }
        /* Looks for duplicate Opportunity Names - if adding NEW, but not if UPDATING */
        if (!that.updateState) {
            for (let i = 0; i < that.opportunities.length; i++) {
                if (that.opportunityName == that.opportunities[i]['opportunityName']) {
                    that.errors.push('Opportunity Name: "' + that.opportunityName + '" already exists.')
                    break;
                }
            }
        }
        if (!that.errors.length) { return true; }
    }
}
