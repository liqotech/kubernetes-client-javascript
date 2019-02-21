module.exports.Config = (function() {
    function Config(apiServer, token, tokenType) {
        if (!apiServer) {
            throw new Error('No API server address specified');
        }

        this._apiServer = apiServer;
        this._token = token;
        this._tokenType = tokenType || 'Bearer';
    }

    Config.prototype = {
        get apiServer() {
            return this._apiServer;
        },

        get token() {
            return this._token;
        },

        get tokenType() {
            return this._tokenType;
        },

        makeApiClient: function(apiClientType) {
            const apiClient = new apiClientType(this.apiServer);
            apiClient.setDefaultAuthentication(this);
            return apiClient;
        },

        applyToRequest: function(request) {
            if (this.token) {
                request.headers['authorization'] = this.tokenType + ' ' + this.token;
            }
        },
    };

    return Config;
})();
