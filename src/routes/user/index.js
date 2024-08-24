import express, { Router } from 'express';
import { UserRole, Role, RolePermission, Permission } from '../../models/index.js';
import fetchRoleAndPermissions from '../../../helpers/fetchRolesAndPermissions.js';

const router = express.Router();


router.get('/permissions', async (req, res) => {

    try {
        const data = await fetchRoleAndPermissions(req)
        res.status(200).json({
            data
        })

    } catch (e) {
        res.status(500).json({ error: 'Failed to get permissions' });
    }

})

router.post('/upgrade', async (req, res) => {
    // add permium role to the user
    try {
        const { _id: roleId } = await Role.findOne({ role: 'premium' });
        const userRole = new UserRole({
            userId: req.user._id,
            roleId
        });
        await userRole.save();
        const data = await fetchRoleAndPermissions(req)
        res.status(201).json({
            data
        })
    } catch (err) {
        res.status(500).json({ error: 'Upgrade failed' });
    }
})


export default router;