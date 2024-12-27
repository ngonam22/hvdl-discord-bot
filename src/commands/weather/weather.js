const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');

const seasonConfig = [
    { name: "Mùa Xuân", code: "spring" },
    { name: "Mùa Hè", code: "summer" },
    { name: "Mùa Thu", code: "autumn" },
    { name: "Mùa Đông", code: "winter" },
  ];
  
  const weatherConfig = [
    { name: "Nắng nhẹ", season: ["spring", "summer", "autumn"], code: "light", icon: "🌤️", emoji: "🌞" },
    { name: "Có mây", season: ["spring", "summer"], code: "cloudy", icon: "☁️", emoji: "🌥️" },
    { name: "Mưa phùn", season: ["spring", "summer", "autumn"], code: "drizzle", icon: "🌧️", emoji: "💧" },
    { name: "Sương mù", season: ["spring", "summer"], code: "foggy", icon: "🌫️", emoji: "🌁" },
    { name: "Nắng gắt", season: ["summer"], code: "scorching", icon: "🌞", emoji: "🔥" },
    { name: "Mưa rào", season: ["summer"], code: "showers", icon: "🌦️", emoji: "💦" },
    { name: "Bão", season: ["summer"], code: "storm", icon: "🌪️", emoji: "⚡" },
    { name: "Gió mát", season: ["spring","autumn"], code: "breezy", icon: "🍂", emoji: "🍃" },
    { name: "Lạnh buốt", season: ["winter"], code: "freezing", icon: "❄️", emoji: "🧊" },
    { name: "Tuyết rơi", season: ["winter"], code: "snowfall", icon: "🌨️", emoji: "☃️" },
];

let currentSeason = seasonConfig[0]; // Default to spring
let currentWeather = {
  ...weatherConfig.find(w => w.season.includes(currentSeason.code)),
  timestamp: Date.now(),
};
let customWeather = null; // Active custom weather
let customWeatherExpiry = null;
  
module.exports = {
    name: 'weather',
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Thời tiết hiện tại')
    ,

    async execute(interaction) {
        const now = Date.now();

        if (now - currentWeather.timestamp > 1 * 60 * 1000) {
            const seasonalWeather = weatherConfig.filter(w => w.season.includes(currentSeason.code));
            console.log(seasonalWeather);
            currentWeather = {
              ...seasonalWeather[Math.floor(Math.random() * seasonalWeather.length)],
              timestamp: now,
            };
        }
        console.log(
            now - currentWeather.timestamp,
            now - currentWeather.timestamp > 1 * 60 * 1000,
            `now ${now} - currentWeather.timestamp ${currentWeather.timestamp}`
        )
        
        // Create embed
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({ 
                name: `${interaction.user.displayName}`,
                iconURL: interaction.user.displayAvatarURL()
            })
            .setTitle('Thời Tiết Hiện Tại')
            .setDescription('Dự báo thời tiết tại khu vực của bạn')
            .addFields(
                { name: 'Nhiệt Độ', value: '25°C', inline: true },
                { name: 'Độ Ẩm', value: '75%', inline: true },
                { name: 'Gió', value: '10 km/h', inline: true },
                { name: 'Thời Tiết', value: `${currentWeather.emoji} ${currentWeather.name}`, inline: true },
                { name: 'Khả Năng Mưa', value: '20%', inline: true },
                { name: 'Chỉ Số UV', value: 'Cao', inline: true }
            )
            .setTimestamp()
            .setFooter({ 
                text: '"Trời nắng hay mưa, tâm luôn bình an"'
            });

        await interaction.reply({ embeds: [embed] });
    }
}