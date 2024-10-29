import express from 'express';
import Agency from '../models/Agency.js';
import Client from '../models/Client.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    const { agency, client } = req.body;

    console.log('Incoming Agency Data:', agency); 
    try {
        // Create agency
        const agencyData = await Agency.create(agency);
        console.log('Created Agency:', agencyData); 

       
        client.AgencyId = agencyData._id; 
        client.ClientId=agencyData._id;
        
        const clientData = await Client.create(client);
        // console.log('Created Client:', clientData); 
        res.status(201).json({ message: 'Agency and Client created successfully' });
    } catch (error) {
        console.error('Error creating Agency/Client:', error); 
        res.status(400).json({ error: error.message });
    }
});

// Update client by ID
router.put('/update/:clientId', async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.clientId, req.body, { new: true });
        res.status(200).json(updatedClient);
    } catch (error) {
        console.error('Error updating Client:', error);
        res.status(400).json({ error: error.message });
    }
});

// Get top client based on TotalBill
router.get('/top-client', async (req, res) => {
    try {
        const topClient = await Client.aggregate([
            { $group: { _id: '$AgencyId', maxTotalBill: { $max: '$TotalBill' } } },
            { $lookup: { from: 'agencies', localField: '_id', foreignField: '_id', as: 'agency' } },
            { $unwind: '$agency' },
            { $project: { AgencyName: '$agency.Name', TotalBill: '$maxTotalBill' } }
        ]);

        res.status(200).json(topClient);
    } catch (error) {
        console.error('Error fetching top clients:', error);
        res.status(400).json({ error: error.message });
    }
});

export default router;
