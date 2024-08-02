namespace Fd.Kit.BasicManagement;

public static class BasicManagementErrorCodes
{
    public const string OrganizationUnitNotExist = BasicManagementConsts.NameSpace + ":100001";
    public const string UserLockedOut = BasicManagementConsts.NameSpace + ":100002";
    public const string UserOrPasswordMismatch = BasicManagementConsts.NameSpace + ":100003";
    public const string UserDisabled = BasicManagementConsts.NameSpace + ":100004";
    public const string TenantNotExist = BasicManagementConsts.NameSpace + ":100005";
    public const string NotSupportSetConnectionString = BasicManagementConsts.NameSpace + ":100006";
    public const string NotEmpty = BasicManagementConsts.NameSpace + ":NotEmpty";
    public const string PermissionDenied = BasicManagementConsts.NameSpace + ":PermissionDenied";
    public const string ParameterValidationFailed = BasicManagementConsts.NameSpace + ":ParameterValidationFailed";
    public const string EntityNotFound = BasicManagementConsts.NameSpace + ":EntityNotFound";
    public const string Unimplemented = BasicManagementConsts.NameSpace + ":Unimplemented";
    public const string DbUpdateConcurrency = BasicManagementConsts.NameSpace + ":DbUpdateConcurrency";
}