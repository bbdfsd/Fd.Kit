declare namespace API {
  type ActionApiDescriptionModel = {
    uniqueName?: string;
    name?: string;
    httpMethod?: string;
    url?: string;
    supportedVersions?: string[];
    parametersOnMethod?: MethodParameterApiDescriptionModel[];
    parameters?: ParameterApiDescriptionModel[];
    returnValue?: ReturnValueApiDescriptionModel;
    allowAnonymous?: boolean;
    implementFrom?: string;
  };

  type AddRoleToOrganizationUnitInput = {
    roleIds?: string[];
  };

  type AddUserToOrganizationUnitInput = {
    userIds?: string[];
  };

  type ApplicationApiDescriptionModel = {
    modules?: Record<string, any>;
    types?: Record<string, any>;
  };

  type ApplicationAuthConfigurationDto = {
    grantedPolicies?: Record<string, any>;
  };

  type ApplicationConfigurationDto = {
    localization?: ApplicationLocalizationConfigurationDto;
    auth?: ApplicationAuthConfigurationDto;
    setting?: ApplicationSettingConfigurationDto;
    currentUser?: CurrentUserDto;
    features?: ApplicationFeatureConfigurationDto;
    globalFeatures?: ApplicationGlobalFeatureConfigurationDto;
    multiTenancy?: MultiTenancyInfoDto;
    currentTenant?: CurrentTenantDto;
    timing?: TimingDto;
    clock?: ClockDto;
    objectExtensions?: ObjectExtensionsDto;
    extraProperties?: Record<string, any>;
  };

  type ApplicationFeatureConfigurationDto = {
    values?: Record<string, any>;
  };

  type ApplicationGlobalFeatureConfigurationDto = {
    enabledFeatures?: string[];
  };

  type ApplicationLocalizationConfigurationDto = {
    values?: Record<string, any>;
    resources?: Record<string, any>;
    languages?: LanguageInfo[];
    currentCulture?: CurrentCultureDto;
    defaultResourceName?: string;
    languagesMap?: Record<string, any>;
    languageFilesMap?: Record<string, any>;
  };

  type ApplicationLocalizationDto = {
    resources?: Record<string, any>;
    currentCulture?: CurrentCultureDto;
  };

  type ApplicationLocalizationResourceDto = {
    texts?: Record<string, any>;
    baseResources?: string[];
  };

  type ApplicationSettingConfigurationDto = {
    values?: Record<string, any>;
  };

  type AuditLogActionDto = {
    extraProperties?: Record<string, any>;
    id?: string;
    tenantId?: string;
    auditLogId?: string;
    serviceName?: string;
    methodName?: string;
    parameters?: string;
    executionTime?: string;
    executionDuration?: number;
  };

  type AuditLogDto = {
    extraProperties?: Record<string, any>;
    id?: string;
    userId?: string;
    userName?: string;
    tenantId?: string;
    tenantName?: string;
    impersonatorUserId?: string;
    impersonatorUserName?: string;
    impersonatorTenantId?: string;
    impersonatorTenantName?: string;
    executionTime?: string;
    executionDuration?: number;
    clientIpAddress?: string;
    clientName?: string;
    browserInfo?: string;
    httpMethod?: string;
    url?: string;
    exceptions?: string;
    comments?: string;
    httpStatusCode?: number;
    applicationName?: string;
    correlationId?: string;
    entityChanges?: EntityChangeDto[];
    actions?: AuditLogActionDto[];
  };

  type AuditLogDtoPagedResultDto = {
    items?: AuditLogDto[];
    totalCount?: number;
  };

  type ChangePasswordInput = {
    currentPassword?: string;
    newPassword: string;
  };

  type ClockDto = {
    kind?: string;
  };

  type ControllerApiDescriptionModel = {
    controllerName?: string;
    controllerGroupName?: string;
    isRemoteService?: boolean;
    isIntegrationService?: boolean;
    apiVersion?: string;
    type?: string;
    interfaces?: ControllerInterfaceApiDescriptionModel[];
    actions?: Record<string, any>;
  };

  type ControllerInterfaceApiDescriptionModel = {
    type?: string;
    name?: string;
    methods?: InterfaceMethodApiDescriptionModel[];
  };

  type CreateOrganizationUnitInput = {
    displayName?: string;
    parentId?: string;
  };

  type CurrentCultureDto = {
    displayName?: string;
    englishName?: string;
    threeLetterIsoLanguageName?: string;
    twoLetterIsoLanguageName?: string;
    isRightToLeft?: boolean;
    cultureName?: string;
    name?: string;
    nativeName?: string;
    dateTimeFormat?: DateTimeFormatDto;
  };

  type CurrentTenantDto = {
    id?: string;
    name?: string;
    isAvailable?: boolean;
  };

  type CurrentUserDto = {
    isAuthenticated?: boolean;
    id?: string;
    tenantId?: string;
    impersonatorUserId?: string;
    impersonatorTenantId?: string;
    impersonatorUserName?: string;
    impersonatorTenantName?: string;
    userName?: string;
    name?: string;
    surName?: string;
    email?: string;
    emailVerified?: boolean;
    phoneNumber?: string;
    phoneNumberVerified?: boolean;
    roles?: string[];
    sessionId?: string;
  };

  type DateTimeFormatDto = {
    calendarAlgorithmType?: string;
    dateTimeFormatLong?: string;
    shortDatePattern?: string;
    fullDateTimePattern?: string;
    dateSeparator?: string;
    shortTimePattern?: string;
    longTimePattern?: string;
  };

  type deleteBasicManagementFeatureParams = {
    ProviderName?: string;
    ProviderKey?: string;
  };

  type deleteIdentityOrganizationUnitsIdMembersUserIdParams = {
    id: string;
    userId: string;
  };

  type deleteIdentityOrganizationUnitsIdParams = {
    id: string;
  };

  type deleteIdentityOrganizationUnitsIdRolesRoleIdParams = {
    id: string;
    roleId: string;
  };

  type deleteIdentityRolesIdParams = {
    id: string;
  };

  type deleteIdentityUsersIdParams = {
    id: string;
  };

  type deleteSaasTenantsIdParams = {
    id: string;
  };

  type EntityChangeDto = {
    extraProperties?: Record<string, any>;
    id?: string;
    auditLogId?: string;
    tenantId?: string;
    changeTime?: string;
    changeType?: EntityChangeType;
    entityId?: string;
    entityTypeFullName?: string;
    propertyChanges?: EntityPropertyChangeDto[];
  };

  type EntityChangeDtoPagedResultDto = {
    items?: EntityChangeDto[];
    totalCount?: number;
  };

  type EntityChangeType = 0 | 1 | 2;

  type EntityChangeWithUsernameDto = {
    entityChange?: EntityChangeDto;
    userName?: string;
  };

  type EntityExtensionDto = {
    properties?: Record<string, any>;
    configuration?: Record<string, any>;
  };

  type EntityPropertyChangeDto = {
    id?: string;
    tenantId?: string;
    entityChangeId?: string;
    newValue?: string;
    originalValue?: string;
    propertyName?: string;
    propertyTypeFullName?: string;
  };

  type ExtensionEnumDto = {
    fields?: ExtensionEnumFieldDto[];
    localizationResource?: string;
  };

  type ExtensionEnumFieldDto = {
    name?: string;
    value?: any;
  };

  type ExtensionPropertyApiCreateDto = {
    isAvailable?: boolean;
  };

  type ExtensionPropertyApiDto = {
    onGet?: ExtensionPropertyApiGetDto;
    onCreate?: ExtensionPropertyApiCreateDto;
    onUpdate?: ExtensionPropertyApiUpdateDto;
  };

  type ExtensionPropertyApiGetDto = {
    isAvailable?: boolean;
  };

  type ExtensionPropertyApiUpdateDto = {
    isAvailable?: boolean;
  };

  type ExtensionPropertyAttributeDto = {
    typeSimple?: string;
    config?: Record<string, any>;
  };

  type ExtensionPropertyDto = {
    type?: string;
    typeSimple?: string;
    displayName?: LocalizableStringDto;
    api?: ExtensionPropertyApiDto;
    ui?: ExtensionPropertyUiDto;
    attributes?: ExtensionPropertyAttributeDto[];
    configuration?: Record<string, any>;
    defaultValue?: any;
  };

  type ExtensionPropertyUiDto = {
    onTable?: ExtensionPropertyUiTableDto;
    onCreateForm?: ExtensionPropertyUiFormDto;
    onEditForm?: ExtensionPropertyUiFormDto;
    lookup?: ExtensionPropertyUiLookupDto;
  };

  type ExtensionPropertyUiFormDto = {
    isVisible?: boolean;
  };

  type ExtensionPropertyUiLookupDto = {
    url?: string;
    resultListPropertyName?: string;
    displayPropertyName?: string;
    valuePropertyName?: string;
    filterParamName?: string;
  };

  type ExtensionPropertyUiTableDto = {
    isVisible?: boolean;
  };

  type FdUserDto = {
    extraProperties?: Record<string, any>;
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    isDeleted?: boolean;
    deleterId?: string;
    deletionTime?: string;
    tenantId?: string;
    userName?: string;
    name?: string;
    surname?: string;
    email?: string;
    emailConfirmed?: boolean;
    phoneNumber?: string;
    phoneNumberConfirmed?: boolean;
    isActive?: boolean;
    lockoutEnabled?: boolean;
    accessFailedCount?: number;
    lockoutEnd?: string;
    concurrencyStamp?: string;
    entityVersion?: number;
    lastPasswordChangeTime?: string;
    roleNames?: string[];
  };

  type FdUserDtoPagedResultDto = {
    items?: FdUserDto[];
    totalCount?: number;
  };

  type FeatureDto = {
    name?: string;
    displayName?: string;
    value?: string;
    provider?: FeatureProviderDto;
    description?: string;
    valueType?: IStringValueType;
    depth?: number;
    parentName?: string;
  };

  type FeatureGroupDto = {
    name?: string;
    displayName?: string;
    features?: FeatureDto[];
  };

  type FeatureProviderDto = {
    name?: string;
    key?: string;
  };

  type FindTenantResultDto = {
    success?: boolean;
    tenantId?: string;
    name?: string;
    normalizedName?: string;
    isActive?: boolean;
  };

  type getAbpApiDefinitionParams = {
    IncludeTypes?: boolean;
  };

  type getAbpApplicationConfigurationParams = {
    IncludeLocalizationResources?: boolean;
  };

  type getAbpApplicationLocalizationParams = {
    CultureName: string;
    OnlyDynamics?: boolean;
  };

  type getAbpMultiTenancyTenantsByIdIdParams = {
    id: string;
  };

  type getAbpMultiTenancyTenantsByNameNameParams = {
    name: string;
  };

  type getAuditLoggingAuditLogsEntityChangesEntityChangeIdParams = {
    entityChangeId: string;
  };

  type getAuditLoggingAuditLogsEntityChangesParams = {
    AuditLogId?: string;
    EntityChangeType?: EntityChangeType;
    EntityId?: string;
    EntityTypeFullName?: string;
    StartDate?: string;
    EndDate?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type getAuditLoggingAuditLogsEntityChangesWithUsernameParams = {
    EntityId?: string;
    EntityTypeFullName?: string;
  };

  type getAuditLoggingAuditLogsEntityChangeWithUsernameEntityChangeIdParams = {
    entityChangeId: string;
  };

  type getAuditLoggingAuditLogsIdParams = {
    id: string;
  };

  type getAuditLoggingAuditLogsParams = {
    StartTime?: string;
    EndTime?: string;
    Url?: string;
    UserName?: string;
    ApplicationName?: string;
    ClientIpAddress?: string;
    CorrelationId?: string;
    HttpMethod?: string;
    HttpStatusCode?: HttpStatusCode;
    MaxExecutionDuration?: number;
    MinExecutionDuration?: number;
    HasException?: boolean;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type getAuditLoggingAuditLogsStatisticsAverageExecutionDurationPerDayParams = {
    StartDate?: string;
    EndDate?: string;
  };

  type getAuditLoggingAuditLogsStatisticsErrorRateParams = {
    StartDate?: string;
    EndDate?: string;
  };

  type GetAverageExecutionDurationPerDayOutput = {
    data?: Record<string, any>;
  };

  type getBasicManagementFeatureParams = {
    ProviderName?: string;
    ProviderKey?: string;
  };

  type GetErrorRateOutput = {
    data?: Record<string, any>;
  };

  type GetFeatureListResultDto = {
    groups?: FeatureGroupDto[];
  };

  type getIdentityOrganizationUnitsIdAvailableRolesParams = {
    id: string;
    Filter?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type getIdentityOrganizationUnitsIdAvailableUsersParams = {
    id: string;
    Filter?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type getIdentityOrganizationUnitsIdMembersParams = {
    id: string;
    Filter?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type getIdentityOrganizationUnitsIdParams = {
    id: string;
  };

  type getIdentityOrganizationUnitsIdRolesParams = {
    id: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type getIdentityRolesIdParams = {
    id: string;
  };

  type getIdentityRolesParams = {
    Filter?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type getIdentitySecurityLogsParams = {
    StartTime?: string;
    EndTime?: string;
    Identity?: string;
    RequestUrl?: string;
    UserId?: string;
    UserName?: string;
    ApplicationName?: string;
    CorrelationId?: string;
    ClientId?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type getIdentityUsersAllParams = {
    /** 关键字 */
    Filter?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type getIdentityUsersIdOrganizationUnitsParams = {
    id: string;
  };

  type getIdentityUsersIdParams = {
    id: string;
  };

  type getIdentityUsersIdRolesParams = {
    id: string;
  };

  type getIdentityUsersParams = {
    /** 关键字 */
    Filter?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type GetOrganizationUnitRoleOutput = {
    id?: string;
    name?: string;
  };

  type GetOrganizationUnitRoleOutputPagedResultDto = {
    items?: GetOrganizationUnitRoleOutput[];
    totalCount?: number;
  };

  type GetOrganizationUnitUserOutput = {
    id?: string;
    userName?: string;
    email?: string;
  };

  type GetOrganizationUnitUserOutputPagedResultDto = {
    items?: GetOrganizationUnitUserOutput[];
    totalCount?: number;
  };

  type GetPermissionListResultDto = {
    entityDisplayName?: string;
    groups?: PermissionGroupDto[];
  };

  type getPermissionManagementPermissionsParams = {
    providerName?: string;
    providerKey?: string;
  };

  type getSaasTenantsIdConnectionStringsParams = {
    id: string;
  };

  type getSaasTenantsNameParams = {
    Name?: string;
  };

  type getSaasTenantsParams = {
    Filter?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type GetUnAddRoleOutput = {
    id?: string;
    name?: string;
  };

  type GetUnAddRoleOutputPagedResultDto = {
    items?: GetUnAddRoleOutput[];
    totalCount?: number;
  };

  type GetUnAddUserOutput = {
    id?: string;
    userName?: string;
    email?: string;
  };

  type GetUnAddUserOutputPagedResultDto = {
    items?: GetUnAddUserOutput[];
    totalCount?: number;
  };

  type HttpStatusCode =
    | 100
    | 101
    | 102
    | 103
    | 200
    | 201
    | 202
    | 203
    | 204
    | 205
    | 206
    | 207
    | 208
    | 226
    | 300
    | 301
    | 302
    | 303
    | 304
    | 305
    | 306
    | 307
    | 308
    | 400
    | 401
    | 402
    | 403
    | 404
    | 405
    | 406
    | 407
    | 408
    | 409
    | 410
    | 411
    | 412
    | 413
    | 414
    | 415
    | 416
    | 417
    | 421
    | 422
    | 423
    | 424
    | 426
    | 428
    | 429
    | 431
    | 451
    | 500
    | 501
    | 502
    | 503
    | 504
    | 505
    | 506
    | 507
    | 508
    | 510
    | 511;

  type IanaTimeZone = {
    timeZoneName?: string;
  };

  type IdentityRoleCreateDto = {
    extraProperties?: Record<string, any>;
    name: string;
    isDefault?: boolean;
    isPublic?: boolean;
  };

  type IdentityRoleDto = {
    extraProperties?: Record<string, any>;
    id?: string;
    name?: string;
    isDefault?: boolean;
    isStatic?: boolean;
    isPublic?: boolean;
    concurrencyStamp?: string;
  };

  type IdentityRoleDtoListResultDto = {
    items?: IdentityRoleDto[];
  };

  type IdentityRoleDtoPagedResultDto = {
    items?: IdentityRoleDto[];
    totalCount?: number;
  };

  type IdentitySecurityLogDto = {
    id?: string;
    tenantId?: string;
    applicationName?: string;
    identity?: string;
    action?: string;
    userId?: string;
    userName?: string;
    tenantName?: string;
    clientId?: string;
    correlationId?: string;
    clientIpAddress?: string;
    browserInfo?: string;
    creationTime?: string;
  };

  type IdentitySecurityLogDtoPagedResultDto = {
    items?: IdentitySecurityLogDto[];
    totalCount?: number;
  };

  type IdentityUserCreateDto = {
    extraProperties?: Record<string, any>;
    userName: string;
    name?: string;
    surname?: string;
    email: string;
    phoneNumber?: string;
    isActive?: boolean;
    lockoutEnabled?: boolean;
    roleNames?: string[];
    password: string;
  };

  type IdentityUserDto = {
    extraProperties?: Record<string, any>;
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    isDeleted?: boolean;
    deleterId?: string;
    deletionTime?: string;
    tenantId?: string;
    userName?: string;
    name?: string;
    surname?: string;
    email?: string;
    emailConfirmed?: boolean;
    phoneNumber?: string;
    phoneNumberConfirmed?: boolean;
    isActive?: boolean;
    lockoutEnabled?: boolean;
    accessFailedCount?: number;
    lockoutEnd?: string;
    concurrencyStamp?: string;
    entityVersion?: number;
    lastPasswordChangeTime?: string;
  };

  type InterfaceMethodApiDescriptionModel = {
    name?: string;
    parametersOnMethod?: MethodParameterApiDescriptionModel[];
    returnValue?: ReturnValueApiDescriptionModel;
  };

  type IStringValueType = {
    name?: string;
    properties?: Record<string, any>;
    validator?: IValueValidator;
  };

  type IValueValidator = {
    name?: string;
    properties?: Record<string, any>;
  };

  type LanguageInfo = {
    cultureName?: string;
    uiCultureName?: string;
    displayName?: string;
    twoLetterISOLanguageName?: string;
  };

  type LocalizableStringDto = {
    name?: string;
    resource?: string;
  };

  type LockUserInput = {
    locked?: boolean;
  };

  type LoginInput = {
    /** 用户名或者邮箱 */
    userNameOrEmailAddress?: string;
    /** 密码 */
    password?: string;
  };

  type LoginOutput = {
    id?: string;
    name?: string;
    userName?: string;
    token?: string;
    roles?: string[];
  };

  type MethodParameterApiDescriptionModel = {
    name?: string;
    typeAsString?: string;
    type?: string;
    typeSimple?: string;
    isOptional?: boolean;
    defaultValue?: any;
  };

  type ModuleApiDescriptionModel = {
    rootPath?: string;
    remoteServiceName?: string;
    controllers?: Record<string, any>;
  };

  type ModuleExtensionDto = {
    entities?: Record<string, any>;
    configuration?: Record<string, any>;
  };

  type MultiTenancyInfoDto = {
    isEnabled?: boolean;
  };

  type NameValue = {
    name?: string;
    value?: string;
  };

  type ObjectExtensionsDto = {
    modules?: Record<string, any>;
    enums?: Record<string, any>;
  };

  type OrganizationUnitDto = {
    id?: string;
    tenantId?: string;
    code?: string;
    displayName?: string;
    parentId?: string;
    roles?: OrganizationUnitRoleDto[];
  };

  type OrganizationUnitRoleDto = {
    creationTime?: string;
    creatorId?: string;
    tenantId?: string;
    organizationUnitId?: string;
    roleId?: string;
  };

  type PagingUserListInput = {
    maxResultCount?: number;
    skipCount?: number;
    /** 关键字 */
    filter?: string;
  };

  type ParameterApiDescriptionModel = {
    nameOnMethod?: string;
    name?: string;
    jsonName?: string;
    type?: string;
    typeSimple?: string;
    isOptional?: boolean;
    defaultValue?: any;
    constraintTypes?: string[];
    bindingSourceId?: string;
    descriptorName?: string;
  };

  type PermissionGrantInfoDto = {
    name?: string;
    displayName?: string;
    parentName?: string;
    isGranted?: boolean;
    allowedProviders?: string[];
    grantedProviders?: ProviderInfoDto[];
  };

  type PermissionGroupDto = {
    name?: string;
    displayName?: string;
    displayNameKey?: string;
    displayNameResource?: string;
    permissions?: PermissionGrantInfoDto[];
  };

  type PropertyApiDescriptionModel = {
    name?: string;
    jsonName?: string;
    type?: string;
    typeSimple?: string;
    isRequired?: boolean;
    minLength?: number;
    maxLength?: number;
    minimum?: string;
    maximum?: string;
    regex?: string;
  };

  type ProviderInfoDto = {
    providerName?: string;
    providerKey?: string;
  };

  type putIdentityOrganizationUnitsIdMembersParams = {
    id: string;
  };

  type putIdentityOrganizationUnitsIdParams = {
    id: string;
  };

  type putIdentityOrganizationUnitsIdRolesParams = {
    id: string;
  };

  type putIdentityRolesIdParams = {
    id: string;
  };

  type putIdentityUsersIdLockParams = {
    id: string;
  };

  type putIdentityUsersIdParams = {
    id: string;
  };

  type putPermissionManagementPermissionsParams = {
    providerName?: string;
    providerKey?: string;
  };

  type putSaasTenantsIdConnectionStringsParams = {
    id: string;
  };

  type putSaasTenantsIdParams = {
    id: string;
  };

  type RemoteServiceErrorInfo = {
    code?: string;
    message?: string;
    details?: string;
    data?: Record<string, any>;
    validationErrors?: RemoteServiceValidationErrorInfo[];
  };

  type RemoteServiceErrorResponse = {
    error?: RemoteServiceErrorInfo;
  };

  type RemoteServiceValidationErrorInfo = {
    message?: string;
    members?: string[];
  };

  type ReturnValueApiDescriptionModel = {
    type?: string;
    typeSimple?: string;
  };

  type SassTenantConnectionStringInputDto = {
    /** 连接字符串名称 */
    name?: string;
    /** 连接字符串地址 */
    value?: string;
  };

  type SettingItemOutput = {
    /** 名称 */
    name?: string;
    /** 显示名称 */
    displayName?: string;
    /** 描述 */
    description?: string;
    /** 值 */
    value?: string;
    /** 前端控件类型 */
    type?: string;
  };

  type SettingOutput = {
    /** 分组 */
    group?: string;
    /** 分组显示名称 */
    groupDisplayName?: string;
    settingItemOutput?: SettingItemOutput[];
  };

  type TenantCreateDto = {
    extraProperties?: Record<string, any>;
    name: string;
    adminEmailAddress: string;
    adminPassword: string;
  };

  type TenantDto = {
    extraProperties?: Record<string, any>;
    id?: string;
    name?: string;
    concurrencyStamp?: string;
  };

  type TenantDtoPagedResultDto = {
    items?: TenantDto[];
    totalCount?: number;
  };

  type TimeZone = {
    iana?: IanaTimeZone;
    windows?: WindowsTimeZone;
  };

  type TimingDto = {
    timeZone?: TimeZone;
  };

  type TypeApiDescriptionModel = {
    baseType?: string;
    isEnum?: boolean;
    enumNames?: string[];
    enumValues?: any[];
    genericArguments?: string[];
    properties?: PropertyApiDescriptionModel[];
  };

  type UpdateFeatureDto = {
    name?: string;
    value?: string;
  };

  type UpdateFeatureInput = {
    providerName?: string;
    providerKey?: string;
    updateFeaturesDto?: UpdateFeaturesDto;
  };

  type UpdateFeaturesDto = {
    features?: UpdateFeatureDto[];
  };

  type UpdateOrganizationUnitInput = {
    displayName?: string;
  };

  type UpdatePermissionDto = {
    name?: string;
    isGranted?: boolean;
  };

  type UpdatePermissionsDto = {
    permissions?: UpdatePermissionDto[];
  };

  type UpdateRoleInput = {
    extraProperties?: Record<string, any>;
    name: string;
    isDefault?: boolean;
    isPublic?: boolean;
    concurrencyStamp?: string;
  };

  type UpdateSettingInput = {
    values?: Record<string, any>;
  };

  type UpdateTenantInput = {
    extraProperties?: Record<string, any>;
    name: string;
    concurrencyStamp?: string;
  };

  type UpdateUserInput = {
    extraProperties?: Record<string, any>;
    userName: string;
    name?: string;
    surname?: string;
    email: string;
    phoneNumber?: string;
    isActive?: boolean;
    lockoutEnabled?: boolean;
    roleNames?: string[];
    password?: string;
    concurrencyStamp?: string;
  };

  type WindowsTimeZone = {
    timeZoneId?: string;
  };
}
