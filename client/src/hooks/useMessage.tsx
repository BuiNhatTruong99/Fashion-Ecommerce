import { OptionsObject, useSnackbar } from 'notistack';
import React, { ReactNode } from 'react';

interface IMessageContent {
  content: ReactNode | string;
}
export const MessageContent = ({ content }: IMessageContent) => {
  return <>{content}</>;
};

export const useMessage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const popMessage = React.useCallback(
    (variant: 'success' | 'info' | 'warning' | 'error', placement?: 'top-center' | 'top-left') =>
      (content: ReactNode | string, options?: OptionsObject<typeof variant>) => {
        enqueueSnackbar(<MessageContent content={content} />, {
          ...options,
          variant,
          transitionDuration: 1000,
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: placement ? (placement.split('-')[0] as any) : 'top',
            horizontal: placement ? (placement.split('-')[1] as any) : 'center'
          }
        });
      },
    [enqueueSnackbar]
  );

  return React.useMemo(() => {
    return {
      error: popMessage('error'),
      info: popMessage('info'),
      success: popMessage('success'),
      warning: popMessage('warning'),
      message: popMessage
    };
  }, [popMessage]);
};
