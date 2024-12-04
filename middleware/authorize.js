import { Permission, RolePermission, UserRole } from "../src/models/index.js";

export const canUserLikeSong = async (req, res, next) => {
  // check if user has permission to like
  const permission = await Permission.find({
    subject: "song",
    action: "like",
  });

  const userRoles = await UserRole.find({
    userId: req.user._id,
  });

  const rolePermissions = await RolePermission.find({
    roleId: { $in: userRoles.map(({ roleId }) => roleId) },
  });
  if (
    rolePermissions.some(({ permissionId }) =>
      permissionId.equals(permission._id)
    )
  )
    next();

    else res.status(401).json({error: "Insufficient Permission"});
};

export const canUserDownloadSong = async (req, res, next) => {
  // check if user has permission to like

  const permisssion = await Permission.findOne({
    subject: "song",
    action:"download",
  });

  const userRoles = await UserRole.find({
    userId: req.user._id,
  });

  const rolePermissions = await RolePermission.find({
    roleId:{ $in: userRoles.map(({roleId})=> roleId)},
  })

  if(rolePermissions.some(({ permissionId})=> permissionId.equals(permisssion._id)); 

  next();
};
