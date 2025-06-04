/**
 * @name 1337x stereo negro x)
 * @description Stereo Super 1337x
 * @version 1337
 * @author Moi negro
 * @authorId 1331352861619257345
 * @invite cQYfcHZ663
 * @website https://guns.lol/1337b
 */

module.exports = class stereo {                   // if you steal this your a fucking nigger 13h1 on top 
    constructor() {
        this.voiceModule = null;
    }

    start() {
        this.voiceModule = BdApi.Webpack.getModule(m => m.prototype && "setLocalVolume" in m.prototype);
        if (!this.voiceModule) return;
        
        BdApi.Patcher.before("stereo", this.voiceModule.prototype, "setLocalVolume", (thisObj) => {
            if (!thisObj || !thisObj.conn || !thisObj.conn.setTransportOptions) return;
            
            const conn = thisObj.conn;
            const setTransportOptions = conn.setTransportOptions.bind(conn);
            
            conn.setTransportOptions = (options) => {
                if (!options || typeof options !== "object") return setTransportOptions(options);
                
                Object.assign(options, {
                    audioEncoder: {
                        ...options.audioEncoder,
                        channels: 2,
                        freq: 48000,
                        rate: 512000,
                        pacsize: 960,
                    },
                    packetLossRate: 0,
                    encodingBitRate: 512000,
                    callBitrate: 512000,
                    callMaxBitRate: 512000,
                });
                
                setTransportOptions(options);
            };
        });
    }

    stop() {
        BdApi.Patcher.unpatchAll("stereo");
    }
};