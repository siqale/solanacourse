import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
    LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import dotenv from "dotenv";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
dotenv.config({ path: '../../.env' });

const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

const LAMPORTS_TO_SEND = 1000000;

const publicKey = ""

console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

const toPubkey = new PublicKey(suppliedToPubkey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
);

const transaction = new Transaction();

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeypair,
]);

console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `,
);
console.log(`Transaction signature is ${signature}!`);

const balanceInLamports = await connection.getBalance(senderKeypair.publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`💸 Balance ${balanceInSOL}. `);

/*
How much SOL did the transfer take? 0.001107

What is this in USD ? 0.00107 *  217.67 = 0.24096

Can you find your transaction on https://explorer.solana.com? 

Yes on https://explorer.solana.com/address/9LX56rpUpbU6jxZszv1DuV1gq2VabXDu4BnMW3nQd2A?cluster=devnet


Remember we are using the devnet network.

How long does the transfer take? about 2 to 3 secs

What do you think "confirmed" means? That transfer was sucessfull 

*/