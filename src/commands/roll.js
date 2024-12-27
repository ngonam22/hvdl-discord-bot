const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder  } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const crypto = require('crypto');
const path = require('path');

async function generateImage(diceResults) {
    const folder = path.join(__dirname, '../assets/');
    const canvas = createCanvas(diceResults.length * 100, 100); // Adjust size based on number of dice
    const ctx = canvas.getContext('2d');


    for (let i in diceResults) {
        const result = diceResults[i];
        const image = await loadImage(`${folder}dice-${result}.png`);
        ctx.drawImage(image, i * 100, 0, 100, 100); // Adjust spacing as needed
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
                .setDescription('Số lượng Dice giao (mặc định là 1)')
                .setMinValue(1)
                .setMaxValue(6)),

    async execute(interaction) {
        const numberOfDice = interaction.options.getInteger('số_lượng_dice') || 1;
        
        let rolls = [];
        let total = 0;
        let successCount = 0;

        // Roll the dice
        for (let i = 0; i < numberOfDice; i++) {
            const roll = crypto.randomInt(1, 11);
            if (roll > 6) {
                successCount++;
            }
            rolls.push(roll);
            total += roll;
        }

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
                {
                    name: 'Kết Quả', value: `${rolls.map(roll => roll > 6 ? '**' + roll + '**' : roll).join(', ')}`, inline: true
                },
            )
            // .setTimestamp()
            .setFooter({ 
                text: `“Xúc xắc đã gieo, vận mệnh đã định.
                 Lời vàng ngọc tạc, Nhật Nguyệt trường minh”`,
            })
        ;


        if (numberOfDice > 1) {
            embed
                .addFields(
                    { name: 'Tổng', value: total.toString(), inline: true },
                    { name: 'Thành Công', value: '**' + successCount.toString() + '**', inline: true }
                );
        }

        const attachment = await generateImage(rolls);

        await interaction.reply({ embeds: [embed], files: [attachment] });
    }
};