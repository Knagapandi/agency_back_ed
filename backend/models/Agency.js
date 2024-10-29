
import { Schema, model } from 'mongoose';

const agencySchema = new Schema({
    Name: { type: String, required: true },
    Address1: { type: String, required: true },
    Address2: { type: String },
    State: { type: String, required: true },
    City: { type: String, required: true },
    PhoneNumber: { type: String, required: true }
});

export default model('agencies', agencySchema);
