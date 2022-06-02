/* eslint-disable no-unused-vars */
const caller = "lottery"
const db = require("quick.db");

// Most of this is code from MrBaggieBug. Find it here: https://github.com/MrBaggieBug/Cookie/

module.exports = async (m) => {

    //this module is called from index.js at the the function at ~83
    const messageID = m.author.id
    const mTime = Math.floor(m.createdTimestamp / 1000)
    //let lastRewarded = userData.lastReward

    // console.log(await userData)
    // console.log(`message at ${messageTimestamp} and last reward at ${lastRewarded}`)

    let lastRewarded = await db.fetch(`lastReward_${m.guild.id}_${messageID}`)
    let isBanned = await db.fetch(`banned_${messageID}`)

    function prizeAmount() {

        let p = Math.floor(Math.random() * 10) + 1;
        console.log(`giving the mf ${p}`)
        return p;

    }

    getsPrize() // no subroutines??? megamind face

    async function getsPrize() {

        let r = Math.floor(Math.random() * 100) + 1;
        //generates a number between 1 & 100
        console.log(r)


        //console.log(userIsBanned)

        if ((r >= 97) && (mTime - lastRewarded > 400)) { //can only be rewarded every 20 seconds

            //wins amounts of cookies that should be decided in the other function
            const num = prizeAmount()

            console.log(messageID)
            m.reply(`YOU WON ${num} COOKIES <:Okay:931961254493421599>!`)
            db.set(`lastReward_${m.guild.id}_${messageID}`, Date.now())
            db.add(`cookies_${m.guild.id}_${messageID}`, num)
        }
    }
}