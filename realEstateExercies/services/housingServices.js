const Housing = require('../models/Housing');
const User = require('../models/User')
exports.create = (housingData) => Housing.create(housingData)

exports.getAll = () => Housing.find().lean();

exports.getOne = (housingId) => Housing.findById(housingId);

exports.update = (housingId, housingData) => Housing.findByIdAndUpdate(housingId,housingData);

exports.rentersInfo = async (bookId) => {
    const house = await Housing.findById(bookId);
    const rentedHomeIds = house.rentedHome;
    const result = await Promise.all(rentedHomeIds.map(x => User.findById(x).lean()));
    return result;
}

exports.search = (houseText) => {
    if (houseText) {
        return (Housing.find({ type: {$regex: houseText, $options: 'i'} }).lean());
    }

}