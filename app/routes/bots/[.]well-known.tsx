 
import path from 'path';

export const loader = async ( ) => {
  
    const jsonData = {
       workspace: {
           root: path.resolve(),
           uuid: 'my-uuid',
       }
    };
    return Response.json(jsonData );
};

export default function ChromeDevTools() {
    return null;
}


