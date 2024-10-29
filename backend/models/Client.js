import { Schema, model } from 'mongoose';

const clientSchema = new Schema({
    ClientId: { type: String, required: true, unique: true },
    AgencyId: { type: Schema.Types.ObjectId, ref: 'Agency', required: true },
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    TotalBill: { type: Number, required: true }
});

export default model('clients', clientSchema);


