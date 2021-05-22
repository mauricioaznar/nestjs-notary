import * as moment from 'moment';

export const dateTimeTransformer = {
  to: (value: string) => value,
  from: (value: string) => {
    return moment(value, 'YYYY-MM-DD HH:mm:ss').isValid()
      ? moment(value, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
      : null;
  },
};
