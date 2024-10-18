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
    
    return dataProtector.protectData({
      data: { file: fileAsArrayBuffer },
      name: file.name,
    });
}

async function getOrCreateCollection({
    ownerAddress,
  }: {
    ownerAddress: Address,
  }) {

  
    const collectionsResult =
      await dataProtector.dataProtectorSharing.getCollectionsByOwner({
        owner: ownerAddress,
      });
  
    if (collectionsResult.collections?.length > 0) {
      if (collectionsResult.collections?.length >= 2) {
        console.log(
          `It looks like you have more than one collection. The first one will be used. (id: ${collectionsResult.collections[0].id})`
        );
      }
      return collectionsResult.collections[0].id;
    }
    
      return collectionsResult.collections[0].id;
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
        const collectionId = await getOrCreateCollection({
            ownerAddress: window.ethereum,
        });
        
        // 3 - Add to collection
        await dataProtector.dataProtectorSharing.addToCollection({
            protectedData: address,
            collectionId,
            addOnlyAppWhitelist: "0x1cb7D4F3FFa203F211e57357D759321C6CE49921",
        });

        // 4 - set to Rent
        await dataProtector.dataProtectorSharing.setProtectedDataToRenting({
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
    
