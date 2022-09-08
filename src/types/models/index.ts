// import IndicatorItem from './indicator'

interface UMCareResponse<T = any> {
  success: boolean;
  data: T;
  errCode: number;
  errMessage: string;
  message?: string;
}
