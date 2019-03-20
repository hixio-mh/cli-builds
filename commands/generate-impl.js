"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-global-tslint-disable no-any
const core_1 = require("@angular-devkit/core");
const schematic_command_1 = require("../models/schematic-command");
const json_schema_1 = require("../utilities/json-schema");
class GenerateCommand extends schematic_command_1.SchematicCommand {
    async initialize(options) {
        await super.initialize(options);
        // Fill up the schematics property of the command description.
        const [collectionName, schematicName] = this.parseSchematicInfo(options);
        const collection = this.getCollection(collectionName);
        const subcommands = {};
        const schematicNames = schematicName ? [schematicName] : collection.listSchematicNames();
        // Sort as a courtesy for the user.
        schematicNames.sort();
        for (const name of schematicNames) {
            const schematic = this.getSchematic(collection, name, true);
            let subcommand;
            if (schematic.description.schemaJson) {
                subcommand = await json_schema_1.parseJsonSchemaToSubCommandDescription(name, schematic.description.path, this._workflow.registry, schematic.description.schemaJson);
            }
            else {
                continue;
            }
            if (this.getDefaultSchematicCollection() == collectionName) {
                subcommands[name] = subcommand;
            }
            else {
                subcommands[`${collectionName}:${name}`] = subcommand;
            }
        }
        this.description.options.forEach(option => {
            if (option.name == 'schematic') {
                option.subcommands = subcommands;
            }
        });
    }
    async run(options) {
        const [collectionName, schematicName] = this.parseSchematicInfo(options);
        if (!schematicName || !collectionName) {
            return this.printHelp(options);
        }
        return this.runSchematic({
            collectionName,
            schematicName,
            schematicOptions: options['--'] || [],
            debug: !!options.debug || false,
            dryRun: !!options.dryRun || false,
            force: !!options.force || false,
        });
    }
    async reportAnalytics(paths, options) {
        const [collectionName, schematicName] = this.parseSchematicInfo(options);
        if (!schematicName || !collectionName) {
            return;
        }
        return super.reportAnalytics(['generate', collectionName.replace(/\//g, '_'), schematicName.replace(/\//g, '_')], options);
    }
    parseSchematicInfo(options) {
        let collectionName = this.getDefaultSchematicCollection();
        let schematicName = options.schematic;
        if (schematicName) {
            if (schematicName.includes(':')) {
                [collectionName, schematicName] = schematicName.split(':', 2);
            }
        }
        return [collectionName, schematicName];
    }
    async printHelp(options) {
        await super.printHelp(options);
        this.logger.info('');
        // Find the generate subcommand.
        const subcommand = this.description.options.filter(x => x.subcommands)[0];
        if (Object.keys((subcommand && subcommand.subcommands) || {}).length == 1) {
            this.logger.info(`\nTo see help for a schematic run:`);
            this.logger.info(core_1.terminal.cyan(`  ng generate <schematic> --help`));
        }
        return 0;
    }
}
exports.GenerateCommand = GenerateCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhci9jbGkvY29tbWFuZHMvZ2VuZXJhdGUtaW1wbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILGlEQUFpRDtBQUNqRCwrQ0FBZ0Q7QUFFaEQsbUVBQStEO0FBQy9ELDBEQUFrRjtBQUdsRixNQUFhLGVBQWdCLFNBQVEsb0NBQXVDO0lBQzFFLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBMEM7UUFDekQsTUFBTSxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWhDLDhEQUE4RDtRQUM5RCxNQUFNLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV6RSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sV0FBVyxHQUE4QyxFQUFFLENBQUM7UUFFbEUsTUFBTSxjQUFjLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUN6RixtQ0FBbUM7UUFDbkMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXRCLEtBQUssTUFBTSxJQUFJLElBQUksY0FBYyxFQUFFO1lBQ2pDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM1RCxJQUFJLFVBQWlDLENBQUM7WUFDdEMsSUFBSSxTQUFTLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRTtnQkFDcEMsVUFBVSxHQUFHLE1BQU0sb0RBQXNDLENBQ3ZELElBQUksRUFDSixTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksRUFDMUIsSUFBSSxDQUFDLFNB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QyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUN6RSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQVEsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxDQUFDO1NBQ3JFO1FBRUQsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDO0NBQ0Y7QUF0R0QsMENBc0dDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1nbG9iYWwtdHNsaW50LWRpc2FibGUgbm8tYW55XG5pbXBvcnQgeyB0ZXJtaW5hbCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IEFyZ3VtZW50cywgU3ViQ29tbWFuZERlc2NyaXB0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBTY2hlbWF0aWNDb21tYW5kIH0gZnJvbSAnLi4vbW9kZWxzL3NjaGVtYXRpYy1jb21tYW5kJztcbmltcG9ydCB7IHBhcnNlSnNvblNjaGVtYVRvU3ViQ29tbWFuZERlc2NyaXB0aW9uIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2pzb24tc2NoZW1hJztcbmltcG9ydCB7IFNjaGVtYSBhcyBHZW5lcmF0ZUNvbW1hbmRTY2hlbWEgfSBmcm9tICcuL2dlbmVyYXRlJztcblxuZXhwb3J0IGNsYXNzIEdlbmVyYXRlQ29tbWFuZCBleHRlbmRzIFNjaGVtYXRpY0NvbW1hbmQ8R2VuZXJhdGVDb21tYW5kU2NoZW1hPiB7XG4gIGFzeW5jIGluaXRpYWxpemUob3B0aW9uczogR2VuZXJhdGVDb21tYW5kU2NoZW1hICYgQXJndW1lbnRzKSB7XG4gICAgYXdhaXQgc3VwZXIuaW5pdGlhbGl6ZShvcHRpb25zKTtcblxuICAgIC8vIEZpbGwgdXAgdGhlIHNjaGVtYXRpY3MgcHJvcGVydHkgb2YgdGhlIGNvbW1hbmQgZGVzY3JpcHRpb24uXG4gICAgY29uc3QgW2NvbGxlY3Rpb25OYW1lLCBzY2hlbWF0aWNOYW1lXSA9IHRoaXMucGFyc2VTY2hlbWF0aWNJbmZvKG9wdGlvbnMpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IHRoaXMuZ2V0Q29sbGVjdGlvbihjb2xsZWN0aW9uTmFtZSk7XG4gICAgY29uc3Qgc3ViY29tbWFuZHM6IHsgW25hbWU6IHN0cmluZ106IFN1YkNvbW1hbmREZXNjcmlwdGlvbiB9ID0ge307XG5cbiAgICBjb25zdCBzY2hlbWF0aWNOYW1lcyA9IHNjaGVtYXRpY05hbWUgPyBbc2NoZW1hdGljTmFtZV0gOiBjb2xsZWN0aW9uLmxpc3RTY2hlbWF0aWNOYW1lcygpO1xuICAgIC8vIFNvcnQgYXMgYSBjb3VydGVzeSBmb3IgdGhlIHVzZXIuXG4gICAgc2NoZW1hdGljTmFtZXMuc29ydCgpO1xuXG4gICAgZm9yIChjb25zdCBuYW1lIG9mIHNjaGVtYXRpY05hbWVzKSB7XG4gICAgICBjb25zdCBzY2hlbWF0aWMgPSB0aGlzLmdldFNjaGVtYXRpYyhjb2xsZWN0aW9uLCBuYW1lLCB0cnVlKTtcbiAgICAgIGxldCBzdWJjb21tYW5kOiBTdWJDb21tYW5kRGVzY3JpcHRpb247XG4gICAgICBpZiAoc2NoZW1hdGljLmRlc2NyaXB0aW9uLnNjaGVtYUpzb24pIHtcbiAgICAgICAgc3ViY29tbWFuZCA9IGF3YWl0IHBhcnNlSnNvblNjaGVtYVRvU3ViQ29tbWFuZERlc2NyaXB0aW9uKFxuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgc2NoZW1hdGljLmRlc2NyaXB0aW9uLnBhdGgsXG4gICAgICAgICAgdGhpcy5fd29ya2Zsb3cucmVnaXN0cnksXG4gICAgICAgICAgc2NoZW1hdGljLmRlc2NyaXB0aW9uLnNjaGVtYUpzb24sXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZ2V0RGVmYXVsdFNjaGVtYXRpY0NvbGxlY3Rpb24oKSA9PSBjb2xsZWN0aW9uTmFtZSkge1xuICAgICAgICBzdWJjb21tYW5kc1tuYW1lXSA9IHN1YmNvbW1hbmQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdWJjb21tYW5kc1tgJHtjb2xsZWN0aW9uTmFtZX06JHtuYW1lfWBdID0gc3ViY29tbWFuZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmRlc2NyaXB0aW9uLm9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgaWYgKG9wdGlvbi5uYW1lID09ICdzY2hlbWF0aWMnKSB7XG4gICAgICAgIG9wdGlvbi5zdWJjb21tYW5kcyA9IHN1YmNvbW1hbmRzO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJ1bihvcHRpb25zOiBHZW5lcmF0ZUNvbW1hbmRTY2hlbWEgJiBBcmd1bWVudHMpIHtcbiAgICBjb25zdCBbY29sbGVjdGlvbk5hbWUsIHNjaGVtYXRpY05hbWVdID0gdGhpcy5wYXJzZVNjaGVtYXRpY0luZm8ob3B0aW9ucyk7XG5cbiAgICBpZiAoIXNjaGVtYXRpY05hbWUgfHwgIWNvbGxlY3Rpb25OYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcmludEhlbHAob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucnVuU2NoZW1hdGljKHtcbiAgICAgIGNvbGxlY3Rpb25OYW1lLFxuICAgICAgc2NoZW1hdGljTmFtZSxcbiAgICAgIHNjaGVtYXRpY09wdGlvbnM6IG9wdGlvbnNbJy0tJ10gfHwgW10sXG4gICAgICBkZWJ1ZzogISFvcHRpb25zLmRlYnVnIHx8IGZhbHNlLFxuICAgICAgZHJ5UnVuOiAhIW9wdGlvbnMuZHJ5UnVuIHx8IGZhbHNlLFxuICAgICAgZm9yY2U6ICEhb3B0aW9ucy5mb3JjZSB8fCBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHJlcG9ydEFuYWx5dGljcyhcbiAgICBwYXRoczogc3RyaW5nW10sXG4gICAgb3B0aW9uczogR2VuZXJhdGVDb21tYW5kU2NoZW1hICYgQXJndW1lbnRzLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBbY29sbGVjdGlvbk5hbWUsIHNjaGVtYXRpY05hbWVdID0gdGhpcy5wYXJzZVNjaGVtYXRpY0luZm8ob3B0aW9ucyk7XG5cbiAgICBpZiAoIXNjaGVtYXRpY05hbWUgfHwgIWNvbGxlY3Rpb25OYW1lKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLnJlcG9ydEFuYWx5dGljcyhcbiAgICAgIFsnZ2VuZXJhdGUnLCBjb2xsZWN0aW9uTmFtZS5yZXBsYWNlKC9cXC8vZywgJ18nKSwgc2NoZW1hdGljTmFtZS5yZXBsYWNlKC9cXC8vZywgJ18nKV0sXG4gICAgICBvcHRpb25zLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlU2NoZW1hdGljSW5mbyhvcHRpb25zOiB7IHNjaGVtYXRpYz86IHN0cmluZyB9KTogW3N0cmluZywgc3RyaW5nIHwgdW5kZWZpbmVkXSB7XG4gICAgbGV0IGNvbGxlY3Rpb25OYW1lID0gdGhpcy5nZXREZWZhdWx0U2NoZW1hdGljQ29sbGVjdGlvbigpO1xuXG4gICAgbGV0IHNjaGVtYXRpY05hbWUgPSBvcHRpb25zLnNjaGVtYXRpYztcblxuICAgIGlmIChzY2hlbWF0aWNOYW1lKSB7XG4gICAgICBpZiAoc2NoZW1hdGljTmFtZS5pbmNsdWRlcygnOicpKSB7XG4gICAgICAgIFtjb2xsZWN0aW9uTmFtZSwgc2NoZW1hdGljTmFtZV0gPSBzY2hlbWF0aWNOYW1lLnNwbGl0KCc6JywgMik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFtjb2xsZWN0aW9uTmFtZSwgc2NoZW1hdGljTmFtZV07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcHJpbnRIZWxwKG9wdGlvbnM6IEdlbmVyYXRlQ29tbWFuZFNjaGVtYSAmIEFyZ3VtZW50cykge1xuICAgIGF3YWl0IHN1cGVyLnByaW50SGVscChvcHRpb25zKTtcblxuICAgIHRoaXMubG9nZ2VyLmluZm8oJycpO1xuICAgIC8vIEZpbmQgdGhlIGdlbmVyYXRlIHN1YmNvbW1hbmQuXG4gICAgY29uc3Qgc3ViY29tbWFuZCA9IHRoaXMuZGVzY3JpcHRpb24ub3B0aW9ucy5maWx0ZXIoeCA9PiB4LnN1YmNvbW1hbmRzKVswXTtcbiAgICBpZiAoT2JqZWN0LmtleXMoKHN1YmNvbW1hbmQgJiYgc3ViY29tbWFuZC5zdWJjb21tYW5kcykgfHwge30pLmxlbmd0aCA9PSAxKSB7XG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKGBcXG5UbyBzZWUgaGVscCBmb3IgYSBzY2hlbWF0aWMgcnVuOmApO1xuICAgICAgdGhpcy5sb2dnZXIuaW5mbyh0ZXJtaW5hbC5jeWFuKGAgIG5nIGdlbmVyYXRlIDxzY2hlbWF0aWM+IC0taGVscGApKTtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxufVxuIl19