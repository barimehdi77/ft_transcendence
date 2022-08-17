import { ConfigOptions, v2 } from 'cloudinary';
import { CLOUDINARY } from './cloudinary';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): ConfigOptions => {
    return v2.config({
		cloud_name: 'barimehdi77',
		api_key: '882468627886226',
		api_secret: '0IEttSBVGScTGjew295c4Sy3L4I'
	  });
  },
};
