import { v4 as uuidv4 } from 'uuid';
export const imageNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, fileName: string) => void,
) => {
  const fileExtension: string = file.originalname.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtension}`;
  callback(null, fileName);
};
