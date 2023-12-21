//                  THIS WAS MADE BY:            
//                       DONALD D.
//                  Discord: donaldd1
//                Github: theautiscoder
//
//                DO NOT EDIT ANYTHING BELLOW UNLESS
//                   YOU KNOW WHAT YOURE DOING

const Economy = require('discord-economy-super');
const eco = new Economy({
    storagePath: './storage.json',
    updateCountdown: 1000, // DO NOT EDIT
    checkStorage: true, // Checks the storage, Can be disabled
    deprecationWarnings: true, // DO NOT EDIT
    sellingItemPercent: 75, // The percent of the item's price that gets adde onto a Users balance on selling
    savePurchasesHistory: true, // If you do not want this to save, Change "true" to "false"
    hourlyAmount: 5, // How much they get eachtime they do /hourly
    dailyAmount: 150, // How much they get eachtime they do /daily
    workAmount: [25, 250], // How much they get eachtime they work [Min, Max]
    weeklyAmount: 1500, // How much they get eachtime they do /weekly
    monthlyAmount: 6000, // How much they get eachtime they do /monthly
    hourlyCooldown: 60000 * 60, // 60 Minutes
    dailyCooldown: 60000 * 60 * 24, // 24 Hours
    workCooldown: 60000 * 60, // 60 Minutes
    weeklyCooldown: 60000 * 60 * 24 * 7, // 7 days
    monthlyCooldown: 60000 * 60 * 24 * 30, // 30 Days
    dateLocale: 'en', // What county are the dates based on?
    updater: {
        checkUpdates: true, // Checks if the package is up to date
        upToDateMessage: true, // Tells you its up to date - Can disable
    },
    errorHandler: { // DO NOT EDIT
        handleErrors: true,
        attempts: 5,
        time: 3000,
    },
    optionsChecker: { // DO NOT EDIT UNLESS YOU KNOW WHAT THIS MEANS
        ignoreInvalidOptions: false,
        ignoreInvalidTypes: false,
        ignoreUnspecifiedOptions: true,
        showProblems: true,
        sendLog: true,
        sendSuccessLog: true,
    },
});

eco.on('ready', () => {
    console.log('Economy system is now ready to be used')
});

module.exports = eco;