export default {
  AbpIdentity: {
    AuditLog: {
      list: 'AbpIdentity.AuditLog',
    },
    FeatureManagement: {
      list: 'AbpIdentity.FeatureManagement',
    },
    IdentitySecurityLogs: {
      list: 'AbpIdentity.IdentitySecurityLogs',
    },
    OrganizationUnits: {
      list: 'AbpIdentity.OrganizationUnits',
      manageOu: 'AbpIdentity.OrganizationUnits.ManageOU',
      manageMembers: 'AbpIdentity.OrganizationUnits.ManageMembers',
      manageRoles: 'AbpIdentity.OrganizationUnits.ManageRoles',
    },
    Roles: {
      list: 'AbpIdentity.Roles',
      create: 'AbpIdentity.Roles.Create',
      delete: 'AbpIdentity.Roles.Delete',
      update: 'AbpIdentity.Roles.Update',
      managePermissions: 'AbpIdentity.Roles.ManagePermissions',
    },
    Setting: {
      list: 'AbpIdentity.Setting',
    },
    Users: {
      list: 'AbpIdentity.Users',
      create: 'AbpIdentity.Users.Create',
      delete: 'AbpIdentity.Users.Delete',
      update: 'AbpIdentity.Users.Update',
      enable: 'AbpIdentity.Users.Enable',
      export: 'AbpIdentity.Users.Export',
      managePermissions: 'AbpIdentity.Users.ManagePermissions',
      manageRoles: 'AbpIdentity.Users.Update.ManageRoles',
    },
  },
  Sass: {
    AbpTenantManagement: {
      list: 'AbpTenantManagement.Tenants',
      create: 'AbpTenantManagement.Tenants.Create',
      delete: 'AbpTenantManagement.Tenants.Delete',
      update: 'AbpTenantManagement.Tenants.Update',
      manageConnectionStrings: 'AbpTenantManagement.Tenants.ManageConnectionStrings',
      manageFeatures: 'AbpTenantManagement.Tenants.ManageFeatures',
    },
  },
};
