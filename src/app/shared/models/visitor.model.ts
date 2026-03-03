export interface VisitorData {
  type: string;
  visitorId: string;
  welcome: string;
  version: string;
}

export interface CreateVisitorWrapper {
  code: number;
  description: string;
  data: VisitorData;
}

export interface CreateVisitorResponse {
  createVisitorResponse: CreateVisitorWrapper;
}
