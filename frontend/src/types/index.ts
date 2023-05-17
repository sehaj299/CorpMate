
export interface IResources{
  name: any;
  id:number;
  attributes: IResourceAttribute;
}

export interface IResourceAttribute{
  name: string;
  email: string;
  phone:  number;
}
export interface IPagination{
  page:number;
  pageSize:number;
  pageCount:number;
  total:number;

}

export interface IResourceMeta{
  pagination: IPagination;
}

export interface ICollectionResponse<T> {
data:T;
meta: IResourceMeta
}
