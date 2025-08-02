export const getFormattedErrorMessage = (result: {
  serverError: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationErrors: any;
}): string => {
  let message = '';

  if (result.serverError) {
    message = result.serverError;
  } else {
    const errors = result.validationErrors;
    message = Object.keys(errors || {})
      .map(key => {
        if (key === '_errors') return errors[key].join(', ');
        return `${key ? `${key}` : ''}${errors?.[key]?._errors?.join(', ')}`;
      })
      .join('\n');
  }

  return message;
};
