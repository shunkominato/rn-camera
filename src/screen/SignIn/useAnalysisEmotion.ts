import { useMutation, useQuery } from '@tanstack/react-query';
import { IApiAnalysisEmotion, apiAnalysisEmotion } from './apiAnalysisEmotion';
import { useState } from 'react';

export type Emotion = {
  happy: number;
  sad: number;
  angry: number;
  crying: number;
  anxious: number;
};

export const useAnalysisEmotion = () => {
  const [emotion, setEmotion] = useState<Emotion>({} as Emotion);
  const { mutate, isPending, isError } = useMutation({
    mutationFn: apiAnalysisEmotion,
    onSuccess: (data) => {
      setEmotion(data.emotion);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const analysisEmotion = (image: any, fileName: string) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('fileName', fileName);
    console.log(image);
    console.log(fileName);
    mutate(formData);
  };

  return {
    emotion,
    analysisEmotion,
    isPending,
    isError,
  };
};
// export const useAnalysisEmotion = () => {
//   const analysisEmotion = async (image: any) => {
//     const { data, isError, isLoading } = useQuery({
//       queryKey: ['analysisEmotion'],
//       queryFn: apiAnalysisEmotion,
//     });

//     return {
//       data,
//       isError,
//       isLoading,
//     };
//   };

//   return { analysisEmotion };
// };
