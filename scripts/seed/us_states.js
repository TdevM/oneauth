/**
 * Created by Tridev on 11-02-2019.
 */

const config = require('../../config');
const secret = config.SECRETS;
const debug = require('debug')('oauth:states.js')
const {db, models: {
    Country,
    State
}} = require('../../src/db/models');

async function runSeed() {
    try {
        // await db.sync()
        const country = await Country.findOne({where: {id: 'US'}})
        if (!country) { throw new Error("Country United States is not yet added, so cannot add states")}


        await State.bulkCreate([
            { name: 'Alabama', countryId: 'US', id: 'USAL' },
            { name: 'Alaska', countryId: 'US', id: 'USAK' },
            { name: 'Arizona', countryId: 'US', id: 'USAZ' },
            { name: 'Arkansas', countryId: 'US', id: 'USAR' },
            { name: 'California', countryId: 'US', id: 'USCA' },
            { name: 'Colorado', countryId: 'US', id: 'USCO' },
            { name: 'Connecticut', countryId: 'US', id: 'USCT' },
            { name: 'Delaware', countryId: 'US', id: 'USDE' },
            { name: 'Florida', countryId: 'US', id: 'USFL' },
            { name: 'Georgia', countryId: 'US', id: 'USGA' },
            { name: 'Hawaii', countryId: 'US', id: 'USHI' },
            { name: 'Idaho', countryId: 'US', id: 'USID' },
            { name: 'Illinois', countryId: 'US', id: 'USIL' },
            { name: 'Indiana', countryId: 'US', id: 'USIN' },
            { name: 'Iowa', countryId: 'US', id: 'USIA' },
            { name: 'Kansas', countryId: 'US', id: 'USKS' },
            { name: 'Kentucky', countryId: 'US', id: 'USKY' },
            { name: 'Louisiana', countryId: 'US', id: 'USLA' },
            { name: 'Maine', countryId: 'US', id: 'USME' },
            { name: 'Maryland', countryId: 'US', id: 'USMD' },
            { name: 'Massachusetts', countryId: 'US', id: 'USMA' },
            { name: 'Michigan', countryId: 'US', id: 'USMI' },
            { name: 'Minnesota', countryId: 'US', id: 'USMN' },
            { name: 'Mississippi', countryId: 'US', id: 'USMS' },
            { name: 'Missouri', countryId: 'US', id: 'USMO' },
            { name: 'Montana', countryId: 'US', id: 'USMT' },
            { name: 'Nebraska', countryId: 'US', id: 'USNE' },
            { name: 'Nevada', countryId: 'US', id: 'USNV' },
            { name: 'New Hampshire', countryId: 'US', id: 'USNH' },
            { name: 'New Jersey', countryId: 'US', id: 'USNJ' },
            { name: 'New Mexico', countryId: 'US', id: 'USNM' },
            { name: 'New York', countryId: 'US', id: 'USNY' },
            { name: 'North Carolina', countryId: 'US', id: 'USNC' },
            { name: 'North Dakota', countryId: 'US', id: 'USND' },
            { name: 'Ohio', countryId: 'US', id: 'USOH' },
            { name: 'Oklahoma', countryId: 'US', id: 'USOK' },
            { name: 'Oregon', countryId: 'US', id: 'USOR' },
            { name: 'Pennsylvania', countryId: 'US', id: 'USPA' },
            { name: 'Rhode Island', countryId: 'US', id: 'USRI' },
            { name: 'South Carolina', countryId: 'US', id: 'USSC' },
            { name: 'South Dakota', countryId: 'US', id: 'USSD' },
            { name: 'Tennessee', countryId: 'US', id: 'USTN' },
            { name: 'Texas', countryId: 'US', id: 'USTX' },
            { name: 'Utah', countryId: 'US', id: 'USUT' },
            { name: 'Vermont', countryId: 'US', id: 'USVT' },
            { name: 'Virginia', countryId: 'US', id: 'USVA' },
            { name: 'Washington', countryId: 'US', id: 'USWA' },
            { name: 'West Virginia', countryId: 'US', id: 'USWV' },
            { name: 'Wisconsin', countryId: 'US', id: 'USWI' },
            { name: 'Wyoming', countryId: 'US', id: 'USWY' }
        ])
        debug("Seed ran")

    } catch (err) {
        debug(err)
    } finally {
        process.exit()
    }
}

runSeed()