import { Injectable } from '@angular/core';
import {
  Ed25519Keypair,
  JsonRpcProvider,
  Network,
  RawSigner,
} from '@mysten/sui.js';

@Injectable({
  providedIn: 'root',
})
export class DigicarService {
  private provider: JsonRpcProvider;
  private signer: RawSigner;

  constructor() {
    this.provider = new JsonRpcProvider(Network.DEVNET);
    this.signer = this.getSigner();
  }

  private getSigner(): RawSigner {
    let privKeyArray: number[] = JSON.parse(
      '[16,76,59,151,27,51,38,74,135,59,87,75,87,113,119,156,189,196,143,2,249,140,93,119,37,139,152,238,122,234,114,232]'
    );

    const keypair = Ed25519Keypair.fromSeed(Uint8Array.from(privKeyArray));
    const signer = new RawSigner(keypair, this.provider);
    return signer;
  }

  public getOwnerAddress() {
    return this.signer.getAddress();
  }
  public writeServiceLog() {
    return this.signer.executeMoveCall({
      packageObjectId: '0x680126f3043122cab705c1534d4258ab50958943',
      module: 'phygicar',
      function: 'add_service_log',
      typeArguments: [],
      arguments: [
        '0xc4984d4b5441951e79a80811a52f20457a9193d4',
        '18/12/2022',
        'myMechanic',
        'yes',
        'yes',
      ],
      gasBudget: 30000,
    });
  }

  public readServiceLogs() {

  }

  public async writeKm() {
    const res = await this.readCarNft();
    let newKM = Number(res.km) + 210;
    return this.signer.executeMoveCall({
      packageObjectId: '0x680126f3043122cab705c1534d4258ab50958943',
      module: 'phygicar',
      function: 'mutate_km',
      typeArguments: [],
      arguments: ['0xc4984d4b5441951e79a80811a52f20457a9193d4', newKM],
      gasBudget: 30000,
    });
  }

  public writeLockPerm(unlockable = false) {
    return this.signer.executeMoveCall({
      packageObjectId: '0x680126f3043122cab705c1534d4258ab50958943',
      module: 'phygicar',
      function: 'set_unlockable',
      typeArguments: [],
      arguments: ['0xc4984d4b5441951e79a80811a52f20457a9193d4', unlockable],
      gasBudget: 30000,
    });
  }

  public async readLockPerm() {
    const res = await this.readCarNft();
    return res?.unlockable;
  }

  public createNFTcar() {
    return this.signer.executeMoveCall({
      packageObjectId: '0x680126f3043122cab705c1534d4258ab50958943',
      module: 'phygicar',
      function: 'register',
      typeArguments: [],
      arguments: [
        'Toyota',
        'Celica',
        1997,
        'SAJWJ0FF3F8321657',
        'Front',
        'Front',
        'https://i.imgur.com/8TNhJ3i.png',
        250,
        'Red',
        false,
      ],
      gasBudget: 30000,
    });
  }

  public async readCarNft(
    objectId = '0xc4984d4b5441951e79a80811a52f20457a9193d4'
  ) {
    const carDetails: any = await this.provider.getObject(objectId);
    console.log('dets', carDetails);
    return carDetails?.details?.data?.fields;
  }
}
