import { useQuery } from '@tanstack/react-query';
import { apiAnalysisEmotion } from './apiAnalysisEmotion';

export const useAnalysisEmotion = () => {
  const analysisEmotion = async (image: any) => {
    const { data, isError, isLoading } = useQuery({
      queryKey: ['analysisEmotion'],
      queryFn: apiAnalysisEmotion,
    });

    return {
      data,
      isError,
      isLoading,
    };
  };
};
