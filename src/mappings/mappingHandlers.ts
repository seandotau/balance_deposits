import {
  SubstrateEvent,
} from "@subql/types";
import { StarterEntity } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [account, balance],
    },
  } = event;
  //Retrieve the record by its ID
  let record = new StarterEntity(event.block.block.header.hash.toString());

  //const record = await StarterEntity.get(event.block.block.header.hash.toString()  );
  record.block = event.extrinsic.block.block.header.number.toNumber();
  
  record.address = account.toString();
  //Big integer type Balance of a transfer event
  record.balance = (balance as Balance).toBigInt();
  await record.save();
}

