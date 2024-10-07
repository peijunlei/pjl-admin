
/**
 *  数组转树形结构
 * @param data
 * @param parentId
 * @param id
 * @param parentIdKey
 * @returns
 */
interface ITreeData {
  id: string;
  parentId: string | null;
  parentPath?: string;
  [key: string]: any;
}
interface IOptions {
  id: string;
  parentIdKey: string;
}
export function arryToTree(  data: ITreeData[], parentId = null,parentPath='', options?: IOptions) {
  const { id, parentIdKey } = options || { id: 'id', parentIdKey: 'parentId' };
  const arr: ITreeData[] = [];
  data.forEach((item) => {
    if (item[parentIdKey] === parentId) {
      const path = parentPath ? `${parentPath}/${item['route']}` : `/${item['route']}`;
      item.path =  path;
      const children = arryToTree(data, item[id], path,{id, parentIdKey});
      if (children.length) {
        item.children = children;
      }
      arr.push(item);
    }
  });
  return arr;
}