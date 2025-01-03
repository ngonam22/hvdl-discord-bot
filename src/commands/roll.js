const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder  } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const crypto = require('crypto');
const path = require('path');
const rollDice = require('../utilities/rollDice');

async function generateImage(diceResults) {
    const folder = path.join(__dirname, '../assets/');
    const canvas = createCanvas(diceResults.length * 100, 100); // Adjust size based on number of dice
    const ctx = canvas.getContext('2d');

    for (let i in diceResults) {
        const result = diceResults[i];
        const baseX = i * 100;

        if (result.rerollFrom) {
            let image = await loadImage(`${folder}dice-${result.rerollFrom}.png`);
            ctx.drawImage(image, baseX - 5, 50, 50, 50); // Adjust spacing as needed
            
            image = await loadImage(`${folder}dice-${result.value}.png`);
            ctx.drawImage(image, baseX + 10, 0, 100, 100); // Adjust spacing as needed
        } else {
            const image = await loadImage(`${folder}dice-${result.value}.png`);
            ctx.drawImage(image, i * 100, 0, 100, 100); // Adjust spacing as needed
        }
        
    }

    return new AttachmentBuilder(canvas.toBuffer(), { name: 'dice-roll.png' });
}

module.exports = {
    name: 'roll',
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Gieo xúc xắc của bạn')
        .addIntegerOption(option =>
            option.setName('số_lượng_dice')
                .setDescription('Số lượng Dice (mặc định là 1)')
                .setMinValue(1)
                .setMaxValue(6)
        )
        .addStringOption(option =>
            option.setName('loại_xúc_xắc')
                .setDescription('Loại xúc xắc (mặc định là không có)')
                .addChoices(
                    { name: 'Advantage', value: 'advantage' },
                    { name: 'Disadvantage', value: 'disadvantage' },
            )
                .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('số_lượng_reroll')
                .setDescription('Số lượng gieo lại (mặc định là 1)')
                .setMinValue(1)
                .setMaxValue(6)
                .setRequired(false)
        )
    ,

    async execute(interaction) {
        const numberOfDice = interaction.options.getInteger('số_lượng_dice') || 1;
        const rollType = interaction.options.getString('loại_xúc_xắc') || null;
        const rerollCount = interaction.options.getInteger('số_lượng_reroll') || 0;

        // Roll the dice
        const { rolls, total, duongResult, binhResult, amResult } = rollDice(numberOfDice, rollType, rerollCount);

        // Create embed
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({ 
                name: `${interaction.user.displayName}`,
                iconURL: interaction.user.displayAvatarURL()
            })
            .setImage('attachment://dice-roll.png')
            .setDescription(`Đã gieo ${numberOfDice} viên xúc xắc`)
            .addFields(
                { name: 'Dương', value: `**${duongResult}**`, inline: true},            
                { name: 'Bình', value: `**${binhResult}**`, inline: true },
                { name: 'Âm', value: `**${amResult}**`, inline: true },
            )
            .addFields(
                {
                    name: 'Kết Quả', value: `${rolls.map(roll => {
                        let text = (roll.value > 6 ? '**' + roll.value + '**' : roll.value)
                        if (roll.rerollFrom) {
                            text += ` *(${roll.rerollFrom})* `
                        }

                        return text
                    }).join(', ')}`
                },
            )
            // .setTimestamp()
            .setFooter({ 
                text: `“Xúc xắc đã gieo, vận mệnh đã định.
                 Lời vàng ngọc tạc, Nhật Nguyệt trường minh”`,
            })
        ;

        

        const attachment = await generateImage(rolls);

        await interaction.reply({ embeds: [embed], files: [attachment] });
    }
};