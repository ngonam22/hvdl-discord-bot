const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const commands = [];
const commandsPath = path.join(__dirname, './../commands');

// Function to load commands from a directory
function loadCommandsFromDir(dirPath) {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const isDirectory = fs.statSync(itemPath).isDirectory();

        if (isDirectory) {
            const files = fs.readdirSync(itemPath).filter(file => file.endsWith('.js'));
            for (const file of files) {
                const command = require(path.join(itemPath, file));
                if ('data' in command) {
                    commands.push(command.data.toJSON());
                }
            }
        } else if (item.endsWith('.js')) {
            const command = require(itemPath);
            if ('data' in command) {
                commands.push(command.data.toJSON());
            }
        }
    }
}

// Load all commands
loadCommandsFromDir(commandsPath);

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.TOKEN);
// Deploy commands
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands
        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.log('++++++++')
        console.error(error);
    }
})();