import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { Wrap, Unwrap } from "../../generated/schema";

export function getOrCreateWrap(
  id: Address,
  fromAccount: Address,
  nft: BigInt,
  event: ethereum.Event
): Wrap {
  let wrap = Wrap.load(
    id
      .toHexString()
      .concat("-")
      .concat(event.logIndex.toString())
      .concat("-")
      .concat("WRAP")
  );

  if (!wrap) {
    wrap = new Wrap(
      id
        .toHexString()
        .concat("-")
        .concat(event.logIndex.toString())
        .concat("-")
        .concat("WRAP")
    );
  }
  wrap.from = fromAccount.toHexString();
  wrap.type = "WRAP";
  wrap.timestamp = event.block.timestamp;
  wrap.nft = nft.toString();
  wrap.blockNumber = event.block.number;
  wrap.blockHash = event.block.hash;
  wrap.txHash = event.transaction.hash;

  wrap.save();
  return wrap as Wrap;
}

export function getOrCreateUnWrap(
  id: Address,
  fromAccount: Address,
  toAccount: Address,
  nft: BigInt,
  event: ethereum.Event
): Unwrap {
  let unWrap = Unwrap.load(
    id
      .toHexString()
      .concat("-")
      .concat(event.logIndex.toString())
      .concat("-")
      .concat("UNWRAP")
  );

  if (!unWrap) {
    unWrap = new Unwrap(
      id
        .toHexString()
        .concat("-")
        .concat(event.logIndex.toString())
        .concat("-")
        .concat("UNWRAP")
    );
  }
  unWrap.from = fromAccount.toHexString();
  unWrap.to = toAccount.toHexString();
  unWrap.type = "UNWRAP";
  unWrap.timestamp = event.block.timestamp;
  unWrap.nft = nft.toString();
  unWrap.blockNumber = event.block.number;
  unWrap.blockHash = event.block.hash;
  unWrap.txHash = event.transaction.hash;

  unWrap.save();
  return unWrap as Unwrap;
}
