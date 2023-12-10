import apiClient from '../../lib/apiClient';

export interface IApiAnalysisEmotion extends Record<string, any> {}

export const apiAnalysisEmotion = async (image: any) => {
  console.log(image);
  const { data } = await apiClient.post<IApiAnalysisEmotion>({ uri: '/ping', body: image });
  return data;
};
