export interface QueryParams {
  hospitalId?: string
}

/**
 * 机构类型
 */
export enum OrgType {
  other = '除中医医疗机构外的其他医疗机构'
}

/**
 * 机构性质
 */
export enum OrgNature {
  central = '中央事业单位'
}

/**
 * 医院等级
 */
export enum HospitalLevel {
  One,
  Two,
  Three
}

/**
 * 医院运营信息
 */
export interface HospitalBusinessInfo {
  name: string,
  /**
   * 机构类型
   */
  orgType: OrgType,
  /**
   * 机构性质
   */
  orgNature: OrgNature,
  /**
   * 主办企业
   */
  sponsor: string,
  /**
   * 所在地
   */
  location: string,
  /**
   * 床位数
   */
  bedNum: number,
  /**
   * 在职员工数
   */
  employeeNum: number,
  /**
   * 医院等级
   */
  grade: HospitalLevel,
  /**
   * 医院业务
   */
  business: Array<any>
}
