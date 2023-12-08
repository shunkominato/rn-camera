import apiClient from '../../lib/apiClient';

export const apiAnalysisEmotion = async (image: any) => {
  const { data } = await apiClient.get({ uri: '/' });
  return data;
};
