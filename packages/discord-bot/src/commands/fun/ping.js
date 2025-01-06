const { 
    SlashCommandBuilder, 
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle, 
    ActionRowBuilder,
    EmbedBuilder 
} = require('discord.js');

module.exports = {
    name: 'ping',
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Introduce yourself to the bot'),

    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('introModal')
            .setTitle('Introduce Yourself');

        const nameInput = new TextInputBuilder()
            .setCustomId('nameInput')
            .setLabel("What's your name?")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Enter your name here')
            .setRequired(true)
            .setMinLength(2)
            .setMaxLength(32);

        const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
        modal.addComponents(firstActionRow);

        await interaction.showModal(modal);

        try {
            const response = await interaction.awaitModalSubmit({
                filter: i => i.customId === 'introModal',
                time: 60000
            });

            const name = response.fields.getTextInputValue('nameInput');
            
            const embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('👋 New Friend!')
                .setDescription(`Welcome, **${name}**! It's wonderful to meet you!`)
                .setThumbnail(interaction.user.displayAvatarURL())
                .addFields(
                    { name: 'User', value: `<@${interaction.user.id}>`, inline: true },
                    { name: 'Joined', value: `<t:${Math.floor(interaction.user.createdTimestamp / 1000)}:R>`, inline: true }
                )
                .setTimestamp()
                .setFooter({ 
                    text: `ID: ${interaction.user.id}`,
                    iconURL: interaction.user.displayAvatarURL()
                });

            await response.reply({
                embeds: [embed],
                ephemeral: true
            });

        } catch (error) {
            console.error('Error with modal:', error);
            // Optionally handle timeout
            if (error.code === 'InteractionCollectorError') {
                await interaction.followUp({
                    content: 'The introduction timed out. Please try again!',
                    ephemeral: true
                });
            }
        }
    }
};