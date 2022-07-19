// pages/api/s3-upload.js
import { APIRoute } from 'next-s3-upload';

// export default APIRoute.configure({
//     async key(req, filename) {
//         let path = await getPath();
//         return `${path}/${filename}`;
//     }
// });
// pages/api/s3-upload.js

export default APIRoute.configure({
    key(req, filename) {
        return `my/uploads/path/${filename.toUpperCase()}`;
    }
});
