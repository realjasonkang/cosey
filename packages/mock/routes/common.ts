import { RequestInterceptor } from '@cosey/request-interceptor';
import { db } from '../db';
import { validateCreateAsset } from '../validator/assets';
import { Result } from '../utils/Result';
import CryptoJS from 'crypto-js';

function readAsDataURL(file: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

export default function register(interceptor: RequestInterceptor) {
  const prefix = '/upload';

  interceptor.post<any, { file: File }>(prefix, async ({ req, res }) => {
    if (!validateCreateAsset(req.body)) {
      return res.json(Result.error(400, validateCreateAsset));
    }

    const file = req.body!.file;

    const uuid = CryptoJS.MD5(Date.now() + '' + Math.random()).toString();

    const url = '/mock/uploads/' + uuid + (file.name.match(/\.[^.]+$/)?.[0] || '');

    const dataURL = await readAsDataURL(file);

    await db.assets.add({
      dataURL,
      uuid,
      name: file.name,
      size: file.size,
      type: file.type,
      url,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.json(
      Result.success({
        list: [
          {
            file_url: url,
          },
        ],
      }),
    );
  });
}
