const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

async function loadCommands(client) {
    client.commands = new Collection();
    const commandsPath = path.join(__dirname, '../commands');
    
    console.log('[-] Loading commands...');

    // Read all items in commands directory
    const items = fs.readdirSync(commandsPath);

    for (const item of items) {
        const itemPath = path.join(commandsPath, item);
        const isDirectory = fs.statSync(itemPath).isDirectory();

        if (isDirectory) {
            // Handle commands in category folders
            const commandFiles = fs.readdirSync(itemPath).filter(file => file.endsWith('.js'));
            
            for (const file of commandFiles) {
                const filePath = path.join(itemPath, file);
                const command = require(filePath);

                if ('name' in command && 'execute' in command) {
                    client.commands.set(command.name, command);
                    console.log(`[✓] Loaded command: ${command.name} (${item})`);
                } else {
                    console.log(`[⚠] Failed to load command: ${file} - Missing required properties`);
                }
            }
        } else if (item.endsWith('.js')) {
            // Handle commands directly in commands folder
            const command = require(itemPath);

            if ('name' in command && 'execute' in command) {
                client.commands.set(command.name, command);
                console.log(`[✓] Loaded command: ${command.name} (root)`);
            } else {
                console.log(`[⚠] Failed to load command: ${item} - Missing required properties`);
            }
        }
    }

    console.log(`Successfully loaded ${client.commands.size} commands!`);
}

module.exports = { loadCommands };