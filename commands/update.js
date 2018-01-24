"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command = require('../ember-cli/lib/models/command');
const update_1 = require("../tasks/update");
const UpdateCommand = Command.extend({
    name: 'update',
    description: 'Updates your application.',
    works: 'everywhere',
    availableOptions: [
        {
            name: 'dry-run',
            type: Boolean,
            default: false,
            aliases: ['d'],
            description: 'Run through without making any changes.'
        }
    ],
    anonymousOptions: [],
    run: function (commandOptions) {
        const schematic = '@schematics/package-update:all';
        const updateTask = new update_1.UpdateTask({
            ui: this.ui,
            project: this.project
        });
        return updateTask.run(schematic, commandOptions);
    }
});
exports.default = UpdateCommand;
//# sourceMappingURL=/home/travis/build/angular/angular-cli/commands/update.js.map