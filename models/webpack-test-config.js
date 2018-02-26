"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpackMerge = require('webpack-merge');
const webpack_config_1 = require("./webpack-config");
const webpack_configs_1 = require("./webpack-configs");
class WebpackTestConfig extends webpack_config_1.NgCliWebpackConfig {
    constructor(testOptions, appConfig) {
        super(testOptions, appConfig);
    }
    buildConfig() {
        const webpackConfigs = [
            webpack_configs_1.getCommonConfig(this.wco),
            webpack_configs_1.getStylesConfig(this.wco),
            webpack_configs_1.getNonAotTestConfig(this.wco),
            webpack_configs_1.getTestConfig(this.wco)
        ];
        this.config = webpackMerge(webpackConfigs);
        return this.config;
    }
}
exports.WebpackTestConfig = WebpackTestConfig;
//# sourceMappingURL=/home/travis/build/angular/angular-cli/models/webpack-test-config.js.map