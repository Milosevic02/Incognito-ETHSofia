import { IExecDataProtector, IExecDataProtectorSharing, createArrayBufferFromFile, type OneProtectDataStatus} from '@iexec/dataprotector';
import { Address } from 'viem';

const web3Provider = typeof window !== 'undefined' && window.ethereum;
const dataProtector = web3Provider && new IExecDataProtector(web3Provider);

const dataProtectorCore = dataProtector?.core;
const dataProtectorSharing = dataProtector.sharing; // access to methods

async function createFileProtectedData({
    file,
  }: {
    file: File;
  }) {
  
    const fileAsArrayBuffer = await createArrayBufferFromFile(file);
    
    return dataProtectorCore.protectData({
      data: { file: fileAsArrayBuffer },
      name: 'userData',
    });
}
  

export async function submitFile({
  file,
}: {
  file: File,
}){

        // 1 create protected data

        const {address} = await createFileProtectedData({
            file: file, // import our file
        });

        // 2 - Get or create collection
        const collectionsResult = await dataProtectorSharing.createCollection({});
        const id = collectionsResult.collectionId;
        
        // 3 - Add to collection
        await dataProtectorSharing.addToCollection({
            protectedData: address,
            collectionId : id,
            addOnlyAppWhitelist: "0x256bcd881c33bdf9df952f2a0148f27d439f2e64",
            
          });
        // 4 - set to Rent
        await dataProtectorSharing.setProtectedDataToRenting({
            protectedData: address,
            price: 0,
            duration: 60 * 60 * 24 * 30,
        });
        
        const response = await fetch('http://localhost:8000/retrieve-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ address: address}),
        });
        
}